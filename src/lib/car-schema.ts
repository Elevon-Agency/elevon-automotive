import { z } from "zod";

export const carSchema = z.object({
  brand: z.string().min(1),
  model: z.string().min(1),
  year: z.coerce.number().int().min(1900).max(2100),
  price: z.coerce.number().int().min(0),
  mileage: z.coerce.number().int().min(0),
  bodyStyle: z.enum(["COUPE", "CONVERTIBLE", "SEDAN", "SUV", "HYPERCAR"]),
  fuelType: z.enum(["PETROL", "HYBRID", "ELECTRIC"]),
  transmission: z.enum(["AUTOMATIC", "MANUAL", "DCT"]),
  horsepower: z.coerce.number().int().min(1),
  engine: z.string().min(1),
  torque: z.string().min(1),
  acceleration: z.string().min(1),
  topSpeed: z.string().min(1),
  drivetrain: z.string().min(1),
  weight: z.string().min(1),
  description: z.string().min(10),
  featured: z.coerce.boolean().default(false),
  status: z.enum(["AVAILABLE", "RESERVED", "SOLD", "DRAFT"]).default("AVAILABLE"),
  images: z.array(z.object({
    url: z.string().url(),
    publicId: z.string().optional(),
    alt: z.string().optional(),
  })).min(1),
});

export const leadSchema = z.object({
  carId: z.string().optional(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  message: z.string().min(5),
  source: z.string().default("website"),
});

export function slugifyCar(brand: string, model: string, year: number) {
  return `${brand}-${model}-${year}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
