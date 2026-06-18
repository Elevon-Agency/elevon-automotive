"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { setSession, verifyPassword } from "@/lib/auth";

export async function loginAction(_: unknown, formData: FormData) {
  const email = String(formData.get("email") || "").toLowerCase().trim();
  const password = String(formData.get("password") || "");

  const user = await prisma.user.findFirst({ where: { email, isActive: true } });
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return { error: "Invalid email or password." };
  }

  await setSession({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });

  redirect("/admin");
}
