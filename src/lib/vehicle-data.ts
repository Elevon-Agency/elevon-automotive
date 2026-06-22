import { supabase } from "@/lib/supabase";
import type { Vehicle } from "@/lib/types/vehicle";

type DbCar = {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  body_style: string;
  fuel_type: string;
  transmission: string;
  horsepower: number;
  engine: string;
  torque: string;
  acceleration: string;
  top_speed: string;
  drivetrain: string;
  weight: string;
  description: string;
  featured: boolean;
  car_images: { image_url: string }[];
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
    bodyStyle: titleEnum(car.body_style) as Vehicle["bodyStyle"],
    fuelType: titleEnum(car.fuel_type) as Vehicle["fuelType"],
    transmission,
    horsepower: Number(car.horsepower) || 0,
    engine: car.engine,
    torque: car.torque,
    acceleration: car.acceleration,
    topSpeed: car.top_speed,
    description: car.description,
    featured: car.featured,
    images: car.car_images?.map((image) => image.image_url) ?? [],
    specs: {
  Power: `${Number(car.horsepower).toLocaleString()} HP`,
  Torque: car.torque,
  "0-100 km/h": car.acceleration,
  "Top Speed": car.top_speed,
  Drivetrain: car.drivetrain,
  Weight: car.weight,
  Transmission: transmission,
},
  };
}

export async function getInventoryVehicles(): Promise<Vehicle[]> {
  try {
    const { data, error } = await supabase
      .from("cars")
      .select(
        `
  *,
  car_images (
    image_url
  )
`,
      )

      .order("featured", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("SUPABASE ERROR:", error);
      return [];
    }

    console.log("SUPABASE DATA:", data);

    if (!data?.length) {
      console.log("No cars returned");
      return [];
    }

    return data.map((car) => {
  console.log("MAPPING CAR:", car);

  const mapped = mapCarToVehicle(car as DbCar);

  console.log("MAPPED VEHICLE:", mapped);

  return mapped;
});
  } catch {
    return [];
  }
}

export async function getInventoryVehicleBySlug(
  slug: string,
): Promise<Vehicle | undefined> {
  try {
    const { data, error } = await supabase
      .from("cars")
      .select(
        `
  *,
  car_images (
    image_url
  )
`,
      )
      .eq("slug", slug)

      .single();

    if (error) {
      console.error("SLUG ERROR:", error);
      return undefined;
    }

    console.log("SLUG DATA:", data);

    if (!data) {
      return undefined;
    }

    return mapCarToVehicle(data as DbCar);
  } catch {
    return undefined;
  }
}

export async function getFeaturedInventoryVehicles(): Promise<Vehicle[]> {
  const vehicles = await getInventoryVehicles();
  return vehicles.filter((vehicle) => vehicle.featured);
}
