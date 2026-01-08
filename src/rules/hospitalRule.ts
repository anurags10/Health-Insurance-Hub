type hospitalPreference = 'any' | 'no' | 'yes';

export function applyHospitalRule(
  plans: any[],
  supportPrivateHospitals: hospitalPreference
) {
  if (supportPrivateHospitals === 'any') {
    return plans;
  } else if (supportPrivateHospitals === 'no') {
    return plans.filter(plan => plan.supportsPrivateHospital === false);
  } else {
    return plans.filter(plan => plan.supportsPrivateHospital === true);
  }
}
