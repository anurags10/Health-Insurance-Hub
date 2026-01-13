export function applyWaitingPeriodRule(plans: any[], hasDisease: boolean) {
  if (!hasDisease) {
    return plans;
  }
  return [...plans]
    .sort((a, b) => a.waitingPeriodYears - b.waitingPeriodYears)
    .map(plan => ({
      ...plan,
      reasons: [
        ...plan.reasons,
        'Lower waiting period suitable for pre-existing disease',
      ],
    }));
}
