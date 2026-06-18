"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { requireUser } from "@/lib/auth";

export async function updateLeadAction(id: string, formData: FormData) {
  await requireUser();
  await prisma.lead.update({
    where: { id },
    data: {
      status: String(formData.get("status") || "NEW") as "NEW",
      notes: String(formData.get("notes") || ""),
    },
  });
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}
