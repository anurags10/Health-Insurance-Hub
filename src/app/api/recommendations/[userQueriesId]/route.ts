import { NextResponse } from 'next/server';
import { db } from '@/src/db';
import { recommendations } from '@/src/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(
  req: Request,
  { params }: { params: { userQueryId: string } }
) {
  const userQueryId = Number(params.userQueryId);

  if (isNaN(userQueryId)) {
    return NextResponse.json({ error: 'Invalid userQueryId' }, { status: 400 });
  }

  const result = await db.query.recommendations.findMany({
    where: eq(recommendations.userQueryId, userQueryId),
    orderBy: [desc(recommendations.score)],
  });

  return NextResponse.json({
    userQueryId,
    total: result.length,
    recommendations: result,
  });
}
