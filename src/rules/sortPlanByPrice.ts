import { db } from '@/src/db';
import { insurancePlans } from '../db/schema';
import { lte, asc } from 'drizzle-orm';

export async function sortPlanByPrice(yearlyBudget: number) {
  return db.query.insurancePlans.findMany({
    where: lte(insurancePlans.yearlyPremium, yearlyBudget),
    orderBy: [asc(insurancePlans.yearlyPremium)],
    with: {
      features: true,
    },
  });
}
