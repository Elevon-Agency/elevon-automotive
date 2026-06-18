import { prisma } from "@/lib/db";
import { vehicles as fallbackVehicles, type Vehicle } from "@/lib/vehicles";

type DbCar = {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  bodyStyle: string;
  fuelType: string;
  transmission: string;
  horsepower: number;
  engine: string;
  torque: string;
  acceleration: string;
  topSpeed: string;
  drivetrain: string;
  weight: string;
  description: string;
  featured: boolean;
  images: { url: string }[];
};

function titleEnum(value: string) {
  if (value === "DCT") return "DCT";
  return value.charAt(0) + value.slice(1).toLowerCase();
}

export function mapCarToVehicle(car: DbCar): Vehicle {
  const transmission = titleEnum(car.transmission) as Vehicle["transmission"];
  return {
    id: car.id,
    slug: car.slug,
    brand: car.brand,
    model: car.model,
    year: car.year,
    price: car.price,
    mileage: car.mileage,
    bodyStyle: titleEnum(car.bodyStyle) as Vehicle["bodyStyle"],
    fuelType: titleEnum(car.fuelType) as Vehicle["fuelType"],
    transmission,
    horsepower: car.horsepower,
    engine: car.engine,
    torque: car.torque,
    acceleration: car.acceleration,
    topSpeed: car.topSpeed,
    description: car.description,
    featured: car.featured,
    images: car.images.map((image) => image.url),
    specs: {
      Power: `${car.horsepower.toLocaleString()} HP`,
      Torque: car.torque,
      "0-100 km/h": car.acceleration,
      "Top Speed": car.topSpeed,
      Drivetrain: car.drivetrain,
      Weight: car.weight,
      Transmission: transmission,
    },
  };
}

const includeImages = {
  images: {
    orderBy: [{ isPrimary: "desc" as const }, { sortOrder: "asc" as const }],
    select: { url: true },
  },
};

export async function getInventoryVehicles(): Promise<Vehicle[]> {
  if (!process.env.DATABASE_URL) return fallbackVehicles;
  try {
    const cars = await prisma.car.findMany({
      where: { status: { not: "DRAFT" } },
      orderBy: [{ featured: "desc" }, { updatedAt: "desc" }],
      include: includeImages,
    });
    return cars.length ? cars.map(mapCarToVehicle) : fallbackVehicles;
  } catch {
    return fallbackVehicles;
  }
}

export async function getInventoryVehicleBySlug(slug: string): Promise<Vehicle | undefined> {
  if (!process.env.DATABASE_URL) return fallbackVehicles.find((car) => car.slug === slug);
  try {
    const car = await prisma.car.findFirst({
      where: { slug, status: { not: "DRAFT" } },
      include: includeImages,
    });
    return car ? mapCarToVehicle(car) : undefined;
  } catch {
    return fallbackVehicles.find((item) => item.slug === slug);
  }
}

export async function getFeaturedInventoryVehicles(): Promise<Vehicle[]> {
  const vehicles = await getInventoryVehicles();
  return vehicles.filter((vehicle) => vehicle.featured);
}
