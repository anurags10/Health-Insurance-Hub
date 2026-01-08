import { getPlanByBudgets } from './getPlanByBudgets';
import { sortPlanByPrice } from './sortPlanByPrice';
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
  const plans = await getPlanByBudgets(yearlyBudget);
  if (diseases.length !== 0) {
    var diseaseFilteredPlan = applyWaitingPeriodRule(plans);
  } else {
    diseaseFilteredPlan = plans;
  }

  const maternityRuleFilteredPlan = applyMaternityRule(
    diseaseFilteredPlan,
    maternityRequired
  );
  const privateHospitalFilteredPlan = applyHospitalRule(
    maternityRuleFilteredPlan,
    supportsPrivateHospital
  );
  const sortedPlans = await sortPlanByPrice(privateHospitalFilteredPlan);

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
