import Link from "next/link";
import Image from "next/image";
import { Plus, Search } from "lucide-react";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice, formatNumber } from "@/lib/utils";
type CarWithImage = {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  horsepower: number;
  transmission: string;
  status: string;
  featured: boolean;
  images: {
    url: string;
  }[];
};

export const dynamic = "force-dynamic";

export default async function AdminCarsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string; status?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(Number(params.page || 1), 1);
  const take = 10;
  const q = params.q?.trim();
  const where = {
    ...(params.status && params.status !== "ALL" ? { status: params.status as "AVAILABLE" } : {}),
    ...(q
      ? {
          OR: [
            { brand: { contains: q, mode: "insensitive" as const } },
            { model: { contains: q, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };
  const [cars, total] = await Promise.all([
    prisma.car.findMany({
      where,
      take,
      skip: (page - 1) * take,
      orderBy: { updatedAt: "desc" },
      include: { images: { take: 1, orderBy: [{ isPrimary: "desc" }, { sortOrder: "asc" }] } },
    }),
    prisma.car.count({ where }),
  ]);
  const totalPages = Math.max(Math.ceil(total / take), 1);

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Inventory</p>
          <h1 className="text-display mt-3 text-4xl font-light">Cars</h1>
        </div>
        <Button asChild>
          <Link href="/admin/cars/new"><Plus className="h-4 w-4" /> Add car</Link>
        </Button>
      </div>

      <form className="mt-8 grid gap-4 md:grid-cols-[1fr_180px_auto]">
        <div className="relative">
          <Search className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input name="q" placeholder="Search brand or model" defaultValue={q} className="pl-7" />
        </div>
        <select name="status" defaultValue={params.status || "ALL"} className="h-12 border-b border-border bg-background text-sm">
          {["ALL", "AVAILABLE", "RESERVED", "SOLD", "DRAFT"].map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
        <Button variant="outline">Filter</Button>
      </form>

      <div className="mt-6 overflow-x-auto border border-border">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="bg-secondary text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="p-4">Car</th>
              <th className="p-4">Specs</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4">Featured</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {cars.map((car: CarWithImage) => (
              <tr key={car.id}>
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-24 bg-muted">
                      {car.images[0] && <Image src={car.images[0].url} alt={`${car.brand} ${car.model}`} fill className="object-cover" />}
                    </div>
                    <div>
                      <p className="font-medium">{car.brand} {car.model}</p>
                      <p className="text-xs text-muted-foreground">{car.year} · {formatNumber(car.mileage)} mi</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-muted-foreground">{car.horsepower} HP · {car.transmission}</td>
                <td className="p-4">{formatPrice(car.price)}</td>
                <td className="p-4">{car.status}</td>
                <td className="p-4">{car.featured ? "Yes" : "No"}</td>
                <td className="p-4 text-right">
                  <Link href={`/admin/cars/${car.id}`} className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {cars.length === 0 && (
              <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No cars found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Page {page} of {totalPages}</span>
        <div className="flex gap-2">
          {page > 1 && <Button variant="outline" asChild><Link href={`/admin/cars?page=${page - 1}`}>Previous</Link></Button>}
          {page < totalPages && <Button variant="outline" asChild><Link href={`/admin/cars?page=${page + 1}`}>Next</Link></Button>}
        </div>
      </div>
    </div>
  );
}
