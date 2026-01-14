import { NextResponse } from 'next/server';
import { recommendPlans } from '@/src/rules/recommendPlans';

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
    const result = await recommendPlans(
      age,
      gender,
      annualIncome,
      maxYearlyPremium,
      diseases,
      supportsPrivateHospital,
      maternityRequired
    );
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Something went wrong' },
      { status: 400 }
    );
  }
}
