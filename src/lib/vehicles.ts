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
  "Apex",
  "McLaren",
  "Porsche",
  "Ferrari",
  "Lamborghini",
  "Koenigsegg",
  "Bugatti",
  "Aston Martin",
] as const;

export const vehicles: Vehicle[] = [
  {
    id: "1",
    slug: "apex-aurora-gt",
    brand: "Apex",
    model: "Aurora GT",
    year: 2025,
    price: 2840000,
    mileage: 120,
    bodyStyle: "Hypercar",
    fuelType: "Hybrid",
    transmission: "DCT",
    horsepower: 1380,
    engine: "5.0L V8 Twin-Turbo + Electric",
    torque: "1,180 Nm",
    acceleration: "2.4s",
    topSpeed: "378 km/h",
    description:
      "The Aurora GT represents the pinnacle of Apex engineering — a hybrid hypercar where aerospace-grade carbon meets relentless performance.",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4114e?w=1920&q=80",
    ],
    specs: {
      Power: "1,380 HP",
      Torque: "1,180 Nm",
      "0–100 km/h": "2.4 seconds",
      "Top Speed": "378 km/h",
      Drivetrain: "AWD",
      Weight: "1,420 kg",
      Transmission: "7-Speed DCT",
    },
  },
  {
    id: "2",
    slug: "mclaren-750s",
    brand: "McLaren",
    model: "750S",
    year: 2024,
    price: 324500,
    mileage: 2400,
    bodyStyle: "Coupe",
    fuelType: "Petrol",
    transmission: "DCT",
    horsepower: 740,
    engine: "4.0L V8 Twin-Turbo",
    torque: "800 Nm",
    acceleration: "2.8s",
    topSpeed: "332 km/h",
    description:
      "Lightweight supercar engineering distilled into its purest form. The 750S delivers McLaren's signature driving purity.",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1621135802923-133df0311763?w=1920&q=80",
      "https://images.unsplash.com/photo-1583121274602-3e2820c87582?w=1920&q=80",
    ],
    specs: {
      Power: "740 HP",
      Torque: "800 Nm",
      "0–100 km/h": "2.8 seconds",
      "Top Speed": "332 km/h",
      Drivetrain: "RWD",
      Weight: "1,277 kg",
      Transmission: "7-Speed DCT",
    },
  },
  {
    id: "3",
    slug: "porsche-911-gt3-rs",
    brand: "Porsche",
    model: "911 GT3 RS",
    year: 2024,
    price: 241000,
    mileage: 890,
    bodyStyle: "Coupe",
    fuelType: "Petrol",
    transmission: "DCT",
    horsepower: 518,
    engine: "4.0L Flat-Six",
    torque: "465 Nm",
    acceleration: "3.2s",
    topSpeed: "296 km/h",
    description:
      "Track-bred precision meets road-going refinement. The GT3 RS is motorsport philosophy made tangible.",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1614162692290-7b32a100e343?w=1920&q=80",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&q=80",
    ],
    specs: {
      Power: "518 HP",
      Torque: "465 Nm",
      "0–100 km/h": "3.2 seconds",
      "Top Speed": "296 km/h",
      Drivetrain: "RWD",
      Weight: "1,450 kg",
      Transmission: "7-Speed PDK",
    },
  },
  {
    id: "4",
    slug: "ferrari-sf90-stradale",
    brand: "Ferrari",
    model: "SF90 Stradale",
    year: 2023,
    price: 625000,
    mileage: 3100,
    bodyStyle: "Coupe",
    fuelType: "Hybrid",
    transmission: "DCT",
    horsepower: 986,
    engine: "4.0L V8 Twin-Turbo + Electric",
    torque: "800 Nm",
    acceleration: "2.5s",
    topSpeed: "340 km/h",
    description:
      "Ferrari's first series-production PHEV. The SF90 Stradale redefines what a supercar can be.",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c87582?w=1920&q=80",
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=1920&q=80",
    ],
    specs: {
      Power: "986 HP",
      Torque: "800 Nm",
      "0–100 km/h": "2.5 seconds",
      "Top Speed": "340 km/h",
      Drivetrain: "AWD",
      Weight: "1,570 kg",
      Transmission: "8-Speed DCT",
    },
  },
  {
    id: "5",
    slug: "lamborghini-revuelto",
    brand: "Lamborghini",
    model: "Revuelto",
    year: 2024,
    price: 608000,
    mileage: 450,
    bodyStyle: "Coupe",
    fuelType: "Hybrid",
    transmission: "DCT",
    horsepower: 1001,
    engine: "6.5L V12 + Electric",
    torque: "725 Nm",
    acceleration: "2.5s",
    topSpeed: "350 km/h",
    description:
      "The first HPEV from Sant'Agata. Twelve cylinders and three electric motors in perfect harmony.",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1544829099-24b1c4a0b0e5?w=1920&q=80",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80",
    ],
    specs: {
      Power: "1,001 HP",
      Torque: "725 Nm",
      "0–100 km/h": "2.5 seconds",
      "Top Speed": "350 km/h",
      Drivetrain: "AWD",
      Weight: "1,770 kg",
      Transmission: "8-Speed DCT",
    },
  },
  {
    id: "6",
    slug: "koenigsegg-jesko",
    brand: "Koenigsegg",
    model: "Jesko",
    year: 2023,
    price: 3200000,
    mileage: 180,
    bodyStyle: "Hypercar",
    fuelType: "Petrol",
    transmission: "DCT",
    horsepower: 1600,
    engine: "5.0L V8 Twin-Turbo",
    torque: "1,500 Nm",
    acceleration: "2.5s",
    topSpeed: "483 km/h",
    description:
      "Swedish engineering at its most extreme. The Jesko is built to break boundaries, not conventions.",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1920&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80",
    ],
    specs: {
      Power: "1,600 HP",
      Torque: "1,500 Nm",
      "0–100 km/h": "2.5 seconds",
      "Top Speed": "483 km/h",
      Drivetrain: "RWD",
      Weight: "1,420 kg",
      Transmission: "9-Speed Light Speed",
    },
  },
  {
    id: "7",
    slug: "bugatti-chiron",
    brand: "Bugatti",
    model: "Chiron Super Sport",
    year: 2022,
    price: 3800000,
    mileage: 620,
    bodyStyle: "Hypercar",
    fuelType: "Petrol",
    transmission: "DCT",
    horsepower: 1578,
    engine: "8.0L W16 Quad-Turbo",
    torque: "1,600 Nm",
    acceleration: "2.4s",
    topSpeed: "440 km/h",
    description:
      "The definitive expression of automotive excess. Engineering without compromise.",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4114e?w=1920&q=80",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80",
    ],
    specs: {
      Power: "1,578 HP",
      Torque: "1,600 Nm",
      "0–100 km/h": "2.4 seconds",
      "Top Speed": "440 km/h",
      Drivetrain: "AWD",
      Weight: "1,995 kg",
      Transmission: "7-Speed DCT",
    },
  },
  {
    id: "8",
    slug: "aston-martin-valkyrie",
    brand: "Aston Martin",
    model: "Valkyrie",
    year: 2024,
    price: 3100000,
    mileage: 95,
    bodyStyle: "Hypercar",
    fuelType: "Hybrid",
    transmission: "DCT",
    horsepower: 1160,
    engine: "6.5L V12 + Electric",
    torque: "900 Nm",
    acceleration: "2.5s",
    topSpeed: "350 km/h",
    description:
      "Born from Formula 1 technology. The Valkyrie is Aston Martin's most ambitious creation.",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1920&q=80",
      "https://images.unsplash.com/photo-1583121274602-3e2820c87582?w=1920&q=80",
    ],
    specs: {
      Power: "1,160 HP",
      Torque: "900 Nm",
      "0–100 km/h": "2.5 seconds",
      "Top Speed": "350 km/h",
      Drivetrain: "RWD",
      Weight: "1,030 kg",
      Transmission: "7-Speed DCT",
    },
  },
  {
    id: "9",
    slug: "porsche-taycan-turbo-s",
    brand: "Porsche",
    model: "Taycan Turbo S",
    year: 2024,
    price: 187500,
    mileage: 5200,
    bodyStyle: "Sedan",
    fuelType: "Electric",
    transmission: "Automatic",
    horsepower: 750,
    engine: "Dual Electric Motors",
    torque: "950 Nm",
    acceleration: "2.8s",
    topSpeed: "260 km/h",
    description:
      "Electric performance without compromise. The Taycan Turbo S proves the future is exhilarating.",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1614162692290-7b32a100e343?w=1920&q=80",
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=1920&q=80",
    ],
    specs: {
      Power: "750 HP",
      Torque: "950 Nm",
      "0–100 km/h": "2.8 seconds",
      "Top Speed": "260 km/h",
      Drivetrain: "AWD",
      Weight: "2,295 kg",
      Transmission: "2-Speed Auto",
    },
  },
  {
    id: "10",
    slug: "mclaren-artura-spider",
    brand: "McLaren",
    model: "Artura Spider",
    year: 2025,
    price: 273000,
    mileage: 0,
    bodyStyle: "Convertible",
    fuelType: "Hybrid",
    transmission: "DCT",
    horsepower: 671,
    engine: "3.0L V6 Twin-Turbo + Electric",
    torque: "720 Nm",
    acceleration: "3.0s",
    topSpeed: "330 km/h",
    description:
      "Open-top hybrid supercar with McLaren's signature dihedral doors and retractable hardtop.",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1621135802923-133df0311763?w=1920&q=80",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&q=80",
    ],
    specs: {
      Power: "671 HP",
      Torque: "720 Nm",
      "0–100 km/h": "3.0 seconds",
      "Top Speed": "330 km/h",
      Drivetrain: "RWD",
      Weight: "1,530 kg",
      Transmission: "8-Speed DCT",
    },
  },
];

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return vehicles.find((v) => v.slug === slug);
}

export function getFeaturedVehicles(): Vehicle[] {
  return vehicles.filter((v) => v.featured);
}
