export async function sortPlanByPrice(plans: any[]) {
  return [...plans].sort((a, b) => a.yearlyPremium - b.yearlyPremium);
}
