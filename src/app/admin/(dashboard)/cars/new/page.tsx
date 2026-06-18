import { CarForm } from "@/app/admin/(dashboard)/cars/car-form";
import { createCarAction } from "@/app/admin/(dashboard)/cars/actions";

export default function NewCarPage() {
  return (
    <div className="max-w-5xl">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Inventory</p>
      <h1 className="text-display mt-3 text-4xl font-light">Add car</h1>
      <div className="mt-8 border border-border p-6">
        <CarForm action={createCarAction} submitLabel="Create car" />
      </div>
    </div>
  );
}
