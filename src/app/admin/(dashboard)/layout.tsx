import Link from "next/link";
import { BarChart3, Car, Inbox, LogOut } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { logoutAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";

const nav = [
  { href: "/admin", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/cars", label: "Inventory", icon: Car },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
];

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();

  return (
    <div className="container-wide grid gap-8 py-32 lg:grid-cols-[260px_1fr]">
      <aside className="h-fit border border-border bg-background p-4 lg:sticky lg:top-28">
        <div className="border-b border-border pb-4">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Admin Panel</p>
          <p className="mt-2 font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.role.toLowerCase()}</p>
        </div>
        <nav className="mt-4 space-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 text-sm transition-colors hover:bg-secondary"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={logoutAction} className="mt-6">
          <Button variant="outline" className="w-full">
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </form>
      </aside>
      <section>{children}</section>
    </div>
  );
}
