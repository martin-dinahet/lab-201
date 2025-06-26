"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const newDateSchema = z.object({
  date: z.date(),
  city: z.string(),
  country: z.string(),
  locations: z.array(z.string()),
  soldOut: z.boolean(),
});

const updateDateSchema = z.object({
  id: z.string(),
  date: z
    .string()
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
  city: z.string().optional(),
  country: z.string().optional(),
  locations: z.array(z.string()).optional(),
  soldOut: z.boolean().optional(),
});

const deleteDateSchema = z.object({
  id: z.string(),
});

export const newDate = async (_prevState: unknown, formData: FormData) => {
  const result = newDateSchema.safeParse({
    date: formData.get("date") ? new Date(formData.get("date") as string) : undefined,
    city: formData.get("city"),
    country: formData.get("country"),
    locations: formData.getAll("locations").filter(Boolean) as string[],
    soldOut: formData.get("soldOut") === "on",
  });
  if (!result.success) return { success: false, errors: result.error.flatten().fieldErrors };
  try {
    const date = await prisma.date.create({ data: result.data });
    console.log(date);
    revalidatePath("/admin/dashboard");
    return { success: true, data: date };
  } catch (error) {
    return { success: false, errors: { prisma: ["Failed to create date"] } };
  }
};

export const updateDate = async (_prevState: unknown, formData: FormData) => {
  const result = updateDateSchema.safeParse({
    id: formData.get("id"),
    date: formData.get("date") || undefined,
    city: formData.get("city") || undefined,
    country: formData.get("country") || undefined,
    locations:
      formData.getAll("locations").length > 0
        ? formData.getAll("locations").map(String).filter(Boolean)
        : undefined,
    soldOut: formData.get("soldOut") === "on",
  });
  if (!result.success) {
    console.log("Validation errors:", result.error.flatten().fieldErrors);
    return { success: false, errors: result.error.flatten().fieldErrors };
  }
  try {
    const { id, ...updateFields } = result.data;
    const cleanUpdateFields = Object.fromEntries(
      Object.entries(updateFields).filter(([_, value]) => value !== undefined),
    );
    const updatedDate = await prisma.date.update({
      where: { id },
      data: cleanUpdateFields,
    });
    revalidatePath("/admin/dashboard");
    return { success: true, data: updatedDate };
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, errors: { prisma: ["Failed to update date"] } };
  }
};

export const deleteDate = async (_prevState: unknown, formData: FormData) => {
  const result = deleteDateSchema.safeParse({ id: formData.get("id") });
  if (!result.success) return { success: false, errors: result.error.flatten().fieldErrors };
  try {
    await prisma.date.delete({ where: { id: result.data.id } });
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    return { success: false, errors: { prisma: ["Failed to delete date"] } };
  }
};
