import { NextResponse } from 'next/server';
import { recommendPlans } from '@/src/rules/recommendPlans';
import { saveUserQueries } from '@/src/db/queries/userQueries';
import { saveRecommendations } from '@/src/db/queries/recommendations';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      age,
      gender,
      annualIncome,
      maxYearlyPremium,
      diseases,
      supportsPrivateHospital,
      maternityRequired,
    } = body;
    const userQueriesId = await saveUserQueries({
      age,
      gender,
      annualIncome,
      maxYearlyPremium,
      diseases,
      supportsPrivateHospital,
      maternityRequired,
    });
    const result = await recommendPlans(
      annualIncome,
      maxYearlyPremium,
      diseases,
      supportsPrivateHospital,
      maternityRequired
    );
    await saveRecommendations(userQueriesId, result.plans);

    return NextResponse.json({
      success: true,
      userQueriesId: userQueriesId,
      count: result.plans.length,
      plans: result.plans,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Something went wrong' },
      { status: 400 }
    );
  }
}
