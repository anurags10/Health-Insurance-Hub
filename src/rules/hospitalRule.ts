export function applyHospitalRule(
  plans: any[],
  preference: 'any' | 'yes' | 'no'
) {
  if (preference === 'any') return plans;

  const expected = preference === 'yes';

  return plans
    .filter(plan => plan.supportsPrivateHospital === expected)
    .map(plan => ({
      ...plan,
      reasons: [
        ...plan.reasons,
        expected
          ? 'Supports private hospitals'
          : 'Suitable for government hospitals',
      ],
      score: plan.score + 15,
    }));
}
