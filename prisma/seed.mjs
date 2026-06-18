import { PrismaClient } from "@prisma/client";
import { randomBytes, scryptSync } from "node:crypto";

const prisma = new PrismaClient();

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

const cars = [
  ["apex-aurora-gt", "Apex", "Aurora GT", 2025, 2840000, 120, "HYPERCAR", "HYBRID", "DCT", 1380, "5.0L V8 Twin-Turbo + Electric", "1,180 Nm", "2.4s", "378 km/h", "AWD", "1,420 kg", true, "The Aurora GT represents the pinnacle of Apex engineering - a hybrid hypercar where aerospace-grade carbon meets relentless performance.", ["https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80", "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80"]],
  ["mclaren-750s", "McLaren", "750S", 2024, 324500, 2400, "COUPE", "PETROL", "DCT", 740, "4.0L V8 Twin-Turbo", "800 Nm", "2.8s", "332 km/h", "RWD", "1,277 kg", true, "Lightweight supercar engineering distilled into its purest form. The 750S delivers McLaren's signature driving purity.", ["https://images.unsplash.com/photo-1621135802923-133df0311763?w=1920&q=80", "https://images.unsplash.com/photo-1583121274602-3e2820c87582?w=1920&q=80"]],
  ["porsche-911-gt3-rs", "Porsche", "911 GT3 RS", 2024, 241000, 890, "COUPE", "PETROL", "DCT", 518, "4.0L Flat-Six", "465 Nm", "3.2s", "296 km/h", "RWD", "1,450 kg", true, "Track-bred precision meets road-going refinement. The GT3 RS is motorsport philosophy made tangible.", ["https://images.unsplash.com/photo-1614162692290-7b32a100e343?w=1920&q=80", "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&q=80"]],
  ["ferrari-sf90-stradale", "Ferrari", "SF90 Stradale", 2023, 625000, 3100, "COUPE", "HYBRID", "DCT", 986, "4.0L V8 Twin-Turbo + Electric", "800 Nm", "2.5s", "340 km/h", "AWD", "1,570 kg", false, "Ferrari's first series-production PHEV. The SF90 Stradale redefines what a supercar can be.", ["https://images.unsplash.com/photo-1583121274602-3e2820c87582?w=1920&q=80", "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=1920&q=80"]],
  ["lamborghini-revuelto", "Lamborghini", "Revuelto", 2024, 608000, 450, "COUPE", "HYBRID", "DCT", 1001, "6.5L V12 + Electric", "725 Nm", "2.5s", "350 km/h", "AWD", "1,770 kg", false, "The first HPEV from Sant'Agata. Twelve cylinders and three electric motors in perfect harmony.", ["https://images.unsplash.com/photo-1544829099-24b1c4a0b0e5?w=1920&q=80", "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80"]],
];

for (const car of cars) {
  const [slug, brand, model, year, price, mileage, bodyStyle, fuelType, transmission, horsepower, engine, torque, acceleration, topSpeed, drivetrain, weight, featured, description, images] = car;
  await prisma.car.upsert({
    where: { slug },
    update: {},
    create: {
      slug,
      brand,
      model,
      year,
      price,
      mileage,
      bodyStyle,
      fuelType,
      transmission,
      horsepower,
      engine,
      torque,
      acceleration,
      topSpeed,
      drivetrain,
      weight,
      featured,
      description,
      images: {
        create: images.map((url, index) => ({
          url,
          sortOrder: index,
          isPrimary: index === 0,
          alt: `${brand} ${model} image ${index + 1}`,
        })),
      },
    },
  });
}

await prisma.user.upsert({
  where: { email: "admin@apex.local" },
  update: {},
  create: {
    name: "Showroom Admin",
    email: "admin@apex.local",
    role: "ADMIN",
    passwordHash: hashPassword("ChangeMe123!"),
  },
});

await prisma.$disconnect();
