import { getPlanByBudgets } from '@/src/rules/getPlanByBudgets';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { budget } = await req.json();
  const plans = await getPlanByBudgets(budget);
  return NextResponse.json(plans);
}
