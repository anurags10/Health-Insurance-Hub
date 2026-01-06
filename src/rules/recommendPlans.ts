import { sortPlanByPrice } from './sortPlanByPrice';
import { validateInput } from './validateInput';

export async function recommendPlans(yearlyBudget: number) {
  validateInput(yearlyBudget);
  const plans = await sortPlanByPrice(yearlyBudget);

  if (plans.length === 0) {
    return {
      message: 'No plans found within your budget',
      plans: [],
    };
  }

  return {
    message: 'Recommended plans based on your budget',
    plans,
  };
}
