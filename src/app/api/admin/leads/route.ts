import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";

export async function GET() {
  await requireUser();
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    include: { car: { select: { brand: true, model: true, year: true } } },
  });
  return NextResponse.json({ leads });
}
