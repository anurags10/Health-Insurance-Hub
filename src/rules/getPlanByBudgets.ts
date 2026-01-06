import { db } from '@/src/db';
import { insurancePlans, planFeatures } from '../db/schema';
import { eq, lte } from 'drizzle-orm';

export async function getPlanByBudgets(yearlyBudget: number) {
  return await db
    .select()
    .from(insurancePlans)
    .innerJoin(planFeatures, eq(insurancePlans.id, planFeatures.planId))
    .where(lte(insurancePlans.yearlyPremium, yearlyBudget));
}
