export function applyWaitingPeriodRule(plans: any[], hasDisease: boolean) {
  if (!hasDisease) {
    return plans;
  }
  return [...plans].sort((a, b) => a.waitingPeriodYears - b.waitingPeriodYears);
}
