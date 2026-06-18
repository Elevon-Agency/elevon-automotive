import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { carSchema, slugifyCar } from "@/lib/car-schema";
import { requireUser } from "@/lib/auth";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  await requireUser();
  const { id } = await params;
  const car = await prisma.car.findUnique({
    where: { id },
    include: { images: { orderBy: [{ isPrimary: "desc" }, { sortOrder: "asc" }] } },
  });
  if (!car) return NextResponse.json({ error: "Car not found" }, { status: 404 });
  return NextResponse.json({ car });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await requireUser();
  const { id } = await params;
  const parsed = carSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const { images, ...car } = parsed.data;
  const updated = await prisma.$transaction(async (tx) => {
    await tx.carImage.deleteMany({ where: { carId: id } });
    return tx.car.update({
      where: { id },
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
  });
  return NextResponse.json({ car: updated });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  await requireUser(["ADMIN"]);
  const { id } = await params;
  await prisma.car.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
