import { notFound } from "next/navigation";
import { Trash2 } from "lucide-react";
import { prisma } from "@/lib/db";
import { CarForm } from "@/app/admin/(dashboard)/cars/car-form";
import { deleteCarAction, updateCarAction } from "@/app/admin/(dashboard)/cars/actions";
import { requireUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function EditCarPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await params;
  const car = await prisma.car.findUnique({
    where: { id },
    include: { images: { orderBy: [{ isPrimary: "desc" }, { sortOrder: "asc" }] } },
  });
  if (!car) notFound();

  const update = updateCarAction.bind(null, car.id);
  const remove = deleteCarAction.bind(null, car.id);

  return (
    <div className="max-w-5xl">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Inventory</p>
          <h1 className="text-display mt-3 text-4xl font-light">Edit {car.brand} {car.model}</h1>
        </div>
        {user.role === "ADMIN" && (
          <form action={remove}>
            <Button variant="outline">
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </form>
        )}
      </div>
      <div className="mt-8 border border-border p-6">
        <CarForm action={update} car={car} submitLabel="Save changes" />
      </div>
    </div>
  );
}
