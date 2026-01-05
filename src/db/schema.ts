import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const insurancePlans = pgTable('insurance_plans', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  yearlyPremium: integer('yearly_premium').notNull(),
  supportsPrivateHospital: boolean('support_private_hospital')
    .notNull()
    .default(false),
  claimSettlementRatio: integer('claim_settlement_ratio').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const planFeatures = pgTable('plan_features', {
  id: serial('id').primaryKey(),
  planId: integer('plan_id')
    .references(() => insurancePlans.id)
    .notNull(),
  preExistingDiseaseCovered: boolean('pre_existing_disease_covered')
    .notNull()
    .default(false),
  waitingPeriodYears: integer('waiting_period_years').notNull(),
  maternityCovered: boolean('maternity_covered').notNull().default(false),
});

export const userQueries = pgTable('user_queries', {
  id: serial('id').primaryKey(),
  age: integer('age').notNull(),
  gender: varchar('gender', { length: 20 }),
  annualIncome: integer('annual_income').notNull(),
  maxYearlyPremium: integer('max_yearly_premium'),
  diseases: varchar('diseases', { length: 255 }).array(),
  hospitalPreferences: varchar('hospital_preferences', {
    length: 20,
  }).notNull(),
  maternityRequired: boolean('maternity_required').default(false),
  createdAt: timestamp('createdAt').defaultNow(),
});

export const recommendations = pgTable('recommendations', {
  id: serial('id').primaryKey(),
  userQueryId: integer('usery_query_id').references(() => userQueries.id),
  planId: integer('plan_id').references(() => insurancePlans.id),
  score: integer('score').notNull(),
  aiExplanation: varchar('ai_explantion', { length: 20000 }),
  createdAt: timestamp('created_at').defaultNow(),
});

// Table Relations

export const insurancePlanRelation = relations(insurancePlans, ({ many }) => ({
  features: many(planFeatures),
}));

export const planFeaturesRelation = relations(planFeatures, ({ one }) => ({
  plan: one(insurancePlans, {
    fields: [planFeatures.planId],
    references: [insurancePlans.id],
  }),
}));
