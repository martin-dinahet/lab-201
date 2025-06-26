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
  date: z.coerce.date().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  locations: z.array(z.string()).optional(),
  soldOut: z.boolean().optional(),
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

export const updateDate = async (formData: FormData) => {
  const result = updateDateSchema.safeParse({
    id: formData.get("id"),
    date: formData.get("date"),
    city: formData.get("city"),
    country: formData.get("country"),
    locations: formData.get("locations"),
    soldOut: formData.get("soldOut"),
  });
  if (!result.success) return { success: false, errors: result.error.flatten().fieldErrors };
  try {
    const { id, ...updateFields } = result.data;
    const updatedDate = await prisma.date.update({
      where: { id: result.data.id },
      data: updateFields,
    });
    revalidatePath("/admin/dashboard");
    return { success: true, data: updatedDate };
  } catch (error) {
    return { success: false, errors: { prisma: ["Failed to update date"] } };
  }
};

export const deleteDate = async (id: string) => {
  try {
    await prisma.date.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    return { success: false, errors: { prisma: ["Failed to delete date"] } };
  }
};
