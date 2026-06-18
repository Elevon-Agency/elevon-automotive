import type { Metadata } from "next";
import { LoginForm } from "@/app/admin/login/login-form";

export const metadata: Metadata = { title: "Admin Login" };

export default function AdminLoginPage() {
  return (
    <div className="container-narrow flex min-h-screen items-center justify-center py-32">
      <div className="w-full max-w-md border border-border bg-background p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Apex Admin</p>
        <h1 className="text-display mt-4 text-4xl font-light">Sign in</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Manage showroom inventory, images, featured cars, and customer leads.
        </p>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
