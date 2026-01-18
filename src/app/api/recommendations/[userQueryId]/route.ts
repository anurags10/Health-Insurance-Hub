import { NextResponse } from 'next/server';
import { db } from '@/src/db';
import { insurancePlans, recommendations } from '@/src/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(
  req: Request,
  { params }: { params: { userQueryId: string } }
) {
  const userQueryId = Number(params.userQueryId);

  if (isNaN(userQueryId)) {
    return NextResponse.json({ error: 'Invalid userQueryId' }, { status: 400 });
  }

  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get('limit') ?? 5);
  const page = Number(searchParams.get('page') ?? 1);

  const safeLimit = Math.min(limit, 10); // hardcap for safety
  const offset = (page - 1) * safeLimit;

  // Total count
  const total = await db.query.recommendations.findMany({
    where: eq(recommendations.userQueryId, userQueryId),
  });

  // Pagination results
  const result = await db
    .select({
      recommendationId: recommendations.id,
      score: recommendations.score,
      reasons: recommendations.aiExplanation,
      planId: insurancePlans.id,
      planName: insurancePlans.name,
      yearlyPremium: insurancePlans.yearlyPremium,
      claimSettlementRatio: insurancePlans.claimSettlementRatio,
      supportPrivateHospital: insurancePlans.supportsPrivateHospital,
    })
    .from(recommendations)
    .innerJoin(insurancePlans, eq(recommendations.planId, insurancePlans.id))
    .where(eq(recommendations.userQueryId, userQueryId))
    .orderBy(desc(recommendations.score))
    .limit(safeLimit).offset;

  return NextResponse.json({
    userQueryId,
    pagination: {
      page,
      limit: safeLimit,
      total: total.length,
      totalPages: Math.ceil(total.length / safeLimit),
    },

    recommendations: result,
  });
}
