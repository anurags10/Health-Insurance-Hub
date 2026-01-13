export async function sortPlanByScore(plans: any[]) {
  return [...plans].sort((a, b) => a.score - b.score);
}
