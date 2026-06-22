import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateLeadAction } from "@/app/admin/(dashboard)/leads/actions";
type LeadWithCar = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  notes: string | null;
  createdAt: Date;
  car: {
    brand: string;
    model: string;
    year: number;
  } | null;
};

const statuses = ["NEW", "CONTACTED", "QUALIFIED", "CLOSED", "LOST"];

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const leads: LeadWithCar[] = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    include: { car: { select: { brand: true, model: true, year: true } } },
  });

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Customers</p>
      <h1 className="text-display mt-3 text-4xl font-light">Leads</h1>

      <div className="mt-8 space-y-4">
        {leads.map((lead) => {
          const action = updateLeadAction.bind(null, lead.id);
          return (
            <div key={lead.id} className="border border-border p-5">
              <div className="grid gap-5 lg:grid-cols-[1fr_260px]">
                <div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <h2 className="text-xl font-medium">{lead.name}</h2>
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">{lead.status}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {lead.email} · {lead.phone}
                  </p>
                  <p className="mt-2 text-sm">
                    {lead.car ? `${lead.car.year} ${lead.car.brand} ${lead.car.model}` : "General enquiry"}
                  </p>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{lead.message}</p>
                </div>
                <form action={action} className="space-y-3">
                  <select name="status" defaultValue={lead.status} className="h-11 w-full border-b border-border bg-background text-sm">
                    {statuses.map((status) => <option key={status}>{status}</option>)}
                  </select>
                  <Textarea name="notes" defaultValue={lead.notes || ""} placeholder="Internal notes" />
                  <Button variant="outline" className="w-full">Update</Button>
                </form>
              </div>
            </div>
          );
        })}
        {leads.length === 0 && (
          <div className="border border-border p-8 text-center text-muted-foreground">
            No customer leads yet.
          </div>
        )}
      </div>
    </div>
  );
}
