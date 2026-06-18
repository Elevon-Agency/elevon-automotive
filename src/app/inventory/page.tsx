import type { Metadata } from "next";
import { InventoryContent } from "@/components/inventory/inventory-content";
import { getInventoryVehicles } from "@/lib/vehicle-data";

export const metadata: Metadata = {
  title: "Inventory",
  description:
    "Browse our curated collection of luxury hypercars and supercars. Filter by brand, price, performance, and more.",
};

export default async function InventoryPage() {
  const vehicles = await getInventoryVehicles();
  return <InventoryContent vehicles={vehicles} />;
}
