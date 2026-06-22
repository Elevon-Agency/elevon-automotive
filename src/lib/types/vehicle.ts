export type BodyStyle = "Coupe" | "Convertible" | "Sedan" | "SUV" | "Hypercar";

export type FuelType = "Petrol" | "Hybrid" | "Electric";

export type Transmission = "Automatic" | "Manual" | "DCT";

export interface Vehicle {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;

  bodyStyle: BodyStyle;
  fuelType: FuelType;
  transmission: Transmission;

  horsepower: number;
  engine: string;
  torque: string;
  acceleration: string;
  topSpeed: string;

  description: string;
  featured: boolean;

  images: string[];

  specs: Record<string, string>;
}
export const brands = [
  "BMW",
  "Mercedes",
  "Porsche",
  "Ferrari",
  "Lamborghini",
  "McLaren",
  "Audi",
  "Aston Martin",
  "Bentley",
  "Bugatti",
  "Koenigsegg",
] as const;