import { getPlanByBudgets } from './getPlanByBudgets';
import { sortPlanByScore } from './sortPlanByPrice';
import { validateInput } from './validateInput';
import { applyMaternityRule } from './maternityRule';
import { applyHospitalRule } from './hospitalRule';
import { applyWaitingPeriodRule } from './waitingPeriodRule';

export async function recommendPlans(
  yearlyBudget: number,
  maternityRequired: boolean,
  supportsPrivateHospital: 'any' | 'no' | 'yes',
  diseases: string[]
) {
  validateInput(yearlyBudget, supportsPrivateHospital);
  const plans = (await getPlanByBudgets(yearlyBudget)).map(plan => ({
    ...plan,
    reasons: ['Fits within your yearly budget'],
    score: 35,
  }));

  const diseaseFilteredPlan = applyWaitingPeriodRule(
    plans,
    diseases.length > 0
  );

  const maternityRuleFilteredPlan = applyMaternityRule(
    diseaseFilteredPlan,
    maternityRequired
  );
  const privateHospitalFilteredPlan = applyHospitalRule(
    maternityRuleFilteredPlan,
    supportsPrivateHospital
  );
  const sortedPlans = await sortPlanByScore(privateHospitalFilteredPlan);

  if (sortedPlans.length === 0) {
    return {
      message: 'No plans found within your budget',
      plans: [],
    };
  }

  return {
    message: 'Recommended plans based on your budget',
    sortedPlans,
  };
}
