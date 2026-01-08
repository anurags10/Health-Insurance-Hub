export function applyMaternityRule(plans: any[], maternityRequired: boolean) {
  if (!maternityRequired) {
    return plans;
  }
  return plans.filter(plan => plan.maternityCovered === true);
}
