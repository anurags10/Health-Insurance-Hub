export function validateInput(yearlyBudget: number) {
  if (!yearlyBudget || yearlyBudget <= 0) {
    throw new Error('Yearly budget must be greater than 0');
  }

  if (yearlyBudget < 1000) {
    throw new Error('Budget too low to recommend any plan');
  }

  return true;
}
