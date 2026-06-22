import { ContactPageContent } from "@/components/contact/contact-page-content";
import { getInventoryVehicles } from "@/lib/vehicle-data";

export default async function ContactPage() {
  const vehicles = await getInventoryVehicles();

  return <ContactPageContent vehicles={vehicles} />;
}