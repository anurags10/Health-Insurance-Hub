import { z } from 'zod';

export const userQuerySchema = z.object({
  age: z.number(),
  gender: z.enum(['male', 'female', 'other']),
  annualIncome: z.number().min(10000, 'Income is too low'),
  maxYearlyPremium: z.number().min(3000, 'Budget is too low'),
  diseases: z.array(z.string()).optional(),
  hospitalPreferences: z.enum(['yes', 'no', 'any']),
  maternityRequired: z.boolean(),
});

export type UserQueryFormData = z.infer<typeof userQuerySchema>;
