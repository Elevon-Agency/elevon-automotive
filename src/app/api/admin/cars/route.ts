import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { carSchema, slugifyCar } from "@/lib/car-schema";
import { requireUser } from "@/lib/auth";

export async function GET(request: Request) {
  await requireUser();
  const { searchParams } = new URL(request.url);
  const page = Math.max(Number(searchParams.get("page") || 1), 1);
  const take = Math.min(Math.max(Number(searchParams.get("take") || 20), 1), 100);
  const q = searchParams.get("q")?.trim();
  const where = q
    ? {
        OR: [
          { brand: { contains: q, mode: "insensitive" as const } },
          { model: { contains: q, mode: "insensitive" as const } },
        ],
      }
    : {};

  const [cars, total] = await Promise.all([
    prisma.car.findMany({
      where,
      take,
      skip: (page - 1) * take,
      orderBy: { updatedAt: "desc" },
      include: { images: { orderBy: [{ isPrimary: "desc" }, { sortOrder: "asc" }] } },
    }),
    prisma.car.count({ where }),
  ]);

  return NextResponse.json({ cars, total, page, take });
}

export async function POST(request: Request) {
  await requireUser();
  const parsed = carSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const { images, ...car } = parsed.data;
  const created = await prisma.car.create({
    data: {
      ...car,
      slug: slugifyCar(car.brand, car.model, car.year),
      images: {
        create: images.map((image, index) => ({
          ...image,
          sortOrder: index,
          isPrimary: index === 0,
        })),
      },
    },
    include: { images: true },
  });
  return NextResponse.json({ car: created }, { status: 201 });
}
