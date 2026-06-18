"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { carSchema, slugifyCar } from "@/lib/car-schema";
import { requireUser } from "@/lib/auth";

function formToImages(formData: FormData) {
  const urls = String(formData.get("imageUrls") || "")
    .split(/\r?\n/)
    .map((url) => url.trim())
    .filter(Boolean);
  return urls.map((url) => ({ url }));
}

function formToPayload(formData: FormData) {
  return carSchema.parse({
    brand: formData.get("brand"),
    model: formData.get("model"),
    year: formData.get("year"),
    price: formData.get("price"),
    mileage: formData.get("mileage"),
    bodyStyle: formData.get("bodyStyle"),
    fuelType: formData.get("fuelType"),
    transmission: formData.get("transmission"),
    horsepower: formData.get("horsepower"),
    engine: formData.get("engine"),
    torque: formData.get("torque"),
    acceleration: formData.get("acceleration"),
    topSpeed: formData.get("topSpeed"),
    drivetrain: formData.get("drivetrain"),
    weight: formData.get("weight"),
    description: formData.get("description"),
    featured: formData.get("featured") === "on",
    status: formData.get("status"),
    images: formToImages(formData),
  });
}

function splitImages(data: ReturnType<typeof formToPayload>) {
  const { images, ...car } = data;
  return { car, images };
}

function revalidateInventory() {
  revalidatePath("/");
  revalidatePath("/inventory");
}

export async function createCarAction(_: unknown, formData: FormData) {
  await requireUser();
  const data = formToPayload(formData);
  const { car, images } = splitImages(data);
  const slug = slugifyCar(car.brand, car.model, car.year);
  const createdCar = await prisma.car.create({
    data: {
      ...car,
      slug,
      images: {
        create: images.map((image, index) => ({
          ...image,
          sortOrder: index,
          isPrimary: index === 0,
          alt: `${car.brand} ${car.model} image ${index + 1}`,
        })),
      },
    },
  });
  revalidateInventory();
  redirect(`/admin/cars/${createdCar.id}`);
}

export async function updateCarAction(id: string, _: unknown, formData: FormData) {
  await requireUser();
  const data = formToPayload(formData);
  const { car, images } = splitImages(data);
  await prisma.$transaction([
    prisma.carImage.deleteMany({ where: { carId: id } }),
    prisma.car.update({
      where: { id },
      data: {
        ...car,
        slug: slugifyCar(car.brand, car.model, car.year),
        images: {
          create: images.map((image, index) => ({
            ...image,
            sortOrder: index,
            isPrimary: index === 0,
            alt: `${car.brand} ${car.model} image ${index + 1}`,
          })),
        },
      },
    }),
  ]);
  revalidateInventory();
  redirect("/admin/cars");
}

export async function deleteCarAction(id: string) {
  await requireUser(["ADMIN"]);
  await prisma.car.delete({ where: { id } });
  revalidateInventory();
  redirect("/admin/cars");
}
