import { db } from '..';
import { recommendations } from '../schema';

export async function saveRecommendations(
  userQueryId: number,
  plans: {
    id: number;
    score: number;
    reasons: string[];
  }[]
) {
  if (plans.length === 0) return;

  await db.insert(recommendations).values(
    plans.map(plan => ({
      userQueryId,
      planId: plan.id,
      score: plan.score,
      aiExplanation: plan.reasons.join('. '),
    }))
  );
}
