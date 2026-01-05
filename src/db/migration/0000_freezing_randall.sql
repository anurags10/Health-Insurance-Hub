CREATE TABLE "insurance_plans" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"yearly_premium" integer NOT NULL,
	"support_private_hospital" boolean DEFAULT false NOT NULL,
	"claim_settlement_ratio" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "plan_features" (
	"id" serial PRIMARY KEY NOT NULL,
	"plan_id" integer NOT NULL,
	"pre_existing_disease_covered" boolean DEFAULT false NOT NULL,
	"waiting_period_years" integer NOT NULL,
	"maternity_covered" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "recommendations" (
	"id" serial PRIMARY KEY NOT NULL,
	"usery_query_id" integer,
	"plan_id" integer,
	"score" integer NOT NULL,
	"ai_explantion" varchar(20000),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_queries" (
	"id" serial PRIMARY KEY NOT NULL,
	"age" integer NOT NULL,
	"gender" varchar(20),
	"annual_income" integer NOT NULL,
	"max_yearly_premium" integer,
	"diseases" varchar(255)[],
	"hospital_preferences" varchar(20) NOT NULL,
	"maternity_required" boolean DEFAULT false,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "plan_features" ADD CONSTRAINT "plan_features_plan_id_insurance_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."insurance_plans"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recommendations" ADD CONSTRAINT "recommendations_usery_query_id_user_queries_id_fk" FOREIGN KEY ("usery_query_id") REFERENCES "public"."user_queries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "recommendations" ADD CONSTRAINT "recommendations_plan_id_insurance_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."insurance_plans"("id") ON DELETE no action ON UPDATE no action;