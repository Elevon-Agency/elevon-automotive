import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VehicleDetail } from "@/components/inventory/vehicle-detail";
import { getInventoryVehicleBySlug } from "@/lib/vehicle-data";

interface VehiclePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: VehiclePageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getInventoryVehicleBySlug(slug);
  if (!vehicle) return { title: "Vehicle Not Found" };

  return {
    title: `${vehicle.brand} ${vehicle.model}`,
    description: vehicle.description,
    openGraph: {
      title: `${vehicle.brand} ${vehicle.model} | Apex Motors`,
      description: vehicle.description,
      images: [{ url: vehicle.images[0] }],
    },
  };
}

export default async function VehiclePage({ params }: VehiclePageProps) {
  const { slug } = await params;
  const vehicle = await getInventoryVehicleBySlug(slug);

  if (!vehicle) notFound();

  return <VehicleDetail vehicle={vehicle} />;
}
