export function applyWaitingPeriodRule(plans: any[], hasDisease: boolean) {
  if (!hasDisease) return plans;

  return plans
    .filter(plan => plan.waitingPeriodYears <= 3)
    .map(plan => ({
      ...plan,
      reasons: [
        ...plan.reasons,
        'Lower waiting period suitable for pre-existing disease',
      ],
    }));
}
