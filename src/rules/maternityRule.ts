export function applyMaternityRule(plans: any[], maternityRequired: boolean) {
  if (!maternityRequired) {
    return plans;
  }
  return plans
    .filter(plan => plan.maternityCovered === true)
    .map(p => ({
      ...p,
      reasons: [...p.reasons, 'Covers maternity benefits'],
      score: p.score + 20,
    }));
}
