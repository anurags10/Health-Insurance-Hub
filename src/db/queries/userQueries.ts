import { db } from '@/src/db/index';
import { userQueries } from '../schema';

export async function saveUserQueries(input: {
  age: number;
  gender: string;
  annualIncome: number;
  maxYearlyPremium: number;
  diseases: string[];
  hospitalPreferences: string;
  maternityRequired: boolean;
}) {
  const [saved] = await db
    .insert(userQueries)
    .values({
      age: input.age,
      gender: input.gender,
      annualIncome: input.annualIncome ?? input.maxYearlyPremium * 10,
      maxYearlyPremium: input.maxYearlyPremium,
      diseases: input.diseases,
      hospitalPreferences: input.hospitalPreferences,
      maternityRequired: input.maternityRequired,
    })
    .returning({ id: userQueries.id });

  return saved.id;
}
