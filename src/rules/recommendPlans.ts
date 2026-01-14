import { getPlanByBudgets } from './getPlanByBudgets';
import { sortPlanByScore } from './sortPlanByPrice';
import { validateInput } from './validateInput';
import { applyMaternityRule } from './maternityRule';
import { applyHospitalRule } from './hospitalRule';
import { applyWaitingPeriodRule } from './waitingPeriodRule';
import { saveUserQueries } from '../db/queries/userQueries';
import { saveRecommendations } from '../db/queries/recommendations';

export async function recommendPlans(
  age: number,
  gender: string,
  annualIncome: number,
  maxYearlyPremium: number,
  diseases: string[],
  hospitalPreferences: any,
  maternityRequired: boolean
) {
  validateInput(annualIncome || maxYearlyPremium * 10, hospitalPreferences);

  const userQueriesId = await saveUserQueries({
    age,
    gender,
    annualIncome,
    maxYearlyPremium,
    diseases,
    hospitalPreferences,
    maternityRequired,
  });

  const plans = (
    await getPlanByBudgets(annualIncome || maxYearlyPremium * 10)
  ).map(plan => ({
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
    hospitalPreferences
  );
  const sortedPlans = sortPlanByScore(privateHospitalFilteredPlan);
  await saveRecommendations(userQueriesId, sortedPlans);

  if (sortedPlans.length === 0) {
    return {
      message: 'No plans found within your budget',
      plans: [],
    };
  }

  return {
    success: true,
    count: sortedPlans.length,
    plans: sortedPlans,
  };
}
