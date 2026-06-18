import Link from "next/link";
import { Car, Star, Inbox, CircleDollarSign } from "lucide-react";
import { prisma } from "@/lib/db";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [cars, featured, leads, available, sold, recentLeads, totalValue] = await Promise.all([
    prisma.car.count(),
    prisma.car.count({ where: { featured: true } }),
    prisma.lead.count(),
    prisma.car.count({ where: { status: "AVAILABLE" } }),
    prisma.car.count({ where: { status: "SOLD" } }),
    prisma.lead.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { car: { select: { brand: true, model: true } } },
    }),
    prisma.car.aggregate({ _sum: { price: true }, where: { status: "AVAILABLE" } }),
  ]);

  const stats = [
    { label: "Cars", value: cars, icon: Car },
    { label: "Featured", value: featured, icon: Star },
    { label: "Leads", value: leads, icon: Inbox },
    { label: "Available value", value: formatPrice(totalValue._sum.price || 0), icon: CircleDollarSign },
  ];

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Overview</p>
          <h1 className="text-display mt-3 text-4xl font-light">Dashboard</h1>
        </div>
        <Link href="/admin/cars/new" className="inline-flex h-11 items-center justify-center bg-primary px-6 text-sm font-medium text-primary-foreground">
          Add car
        </Link>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-border p-5">
            <stat.icon className="h-5 w-5 text-muted-foreground" />
            <p className="mt-6 text-3xl font-light">{stat.value}</p>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_1.3fr]">
        <div className="border border-border p-6">
          <h2 className="font-medium">Inventory status</h2>
          <div className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between"><span>Available</span><span>{available}</span></div>
            <div className="flex justify-between"><span>Sold</span><span>{sold}</span></div>
            <div className="flex justify-between"><span>Needs attention</span><span>{Math.max(cars - available - sold, 0)}</span></div>
          </div>
        </div>
        <div className="border border-border p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Recent leads</h2>
            <Link href="/admin/leads" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">
              View all
            </Link>
          </div>
          <div className="mt-4 divide-y divide-border">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="py-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-medium">{lead.name}</p>
                  <span className="text-xs text-muted-foreground">{lead.status}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {lead.car ? `${lead.car.brand} ${lead.car.model}` : "General enquiry"} · {lead.email}
                </p>
              </div>
            ))}
            {recentLeads.length === 0 && <p className="py-8 text-sm text-muted-foreground">No leads yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
