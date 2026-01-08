export function applyWaitingPeriodRule(plans: any[]) {
  return plans.filter(plan => plan.waitingPeriodYears <= 3);
}
