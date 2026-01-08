export function validateInput(
  yearlyBudget: number,
  supportsPrivateHospital: 'any' | 'no' | 'yes'
) {
  if (!yearlyBudget || yearlyBudget <= 0) {
    throw new Error('Yearly budget must be greater than 0');
  }

  if (yearlyBudget < 1000) {
    throw new Error('Budget too low to recommend any plan');
  }

  if (
    supportsPrivateHospital === 'any' ||
    supportsPrivateHospital === 'no' ||
    supportsPrivateHospital === 'yes'
  ) {
    throw new Error('Hospital Preferance should be any , yes, no');
  }

  return true;
}
