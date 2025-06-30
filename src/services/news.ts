"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const newNewsSchema = z.object({
  title: z.string(),
  desc: z.string(),
  imgUrl: z.string(),
});

const updateNewsSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  desc: z.string().optional(),
  imgUrl: z.string().optional(),
});

const deleteNewsSchema = z.object({
  id: z.string(),
});

export const newNews = async (_prevState: unknown, formData: FormData) => {
  const result = newNewsSchema.safeParse({
    title: formData.get("title"),
    desc: formData.get("desc"),
    imgUrl: formData.get("imgUrl"),
  });
  if (!result.success) return { success: false, errors: result.error.flatten().fieldErrors };
  try {
    const news = await prisma.news.create({ data: result.data });
    console.log(news);
    revalidatePath("/admin/dashboard");
    return { success: true, data: news };
  } catch (error) {
    return { success: false, errors: { prisma: ["Failed to create news"] } };
  }
};

export const updateNews = async (_prevState: unknown, formData: FormData) => {
  const result = updateNewsSchema.safeParse({
    id: formData.get("id"),
    title: formData.get("title") || undefined,
    desc: formData.get("desc") || undefined,
    imgUrl: formData.get("imgUrl") || undefined,
  });
  if (!result.success) return { success: false, errors: result.error.flatten().fieldErrors };
  try {
    const { id, ...updateFields } = result.data;
    const cleanUpdateFields = Object.fromEntries(
      Object.entries(updateFields).filter(([_, value]) => value !== undefined),
    );
    const updatedNews = await prisma.news.update({
      where: { id },
      data: cleanUpdateFields,
    });
    revalidatePath("/admin/dashboard");
    return { success: true, data: updatedNews };
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, errors: { prisma: ["Failed to update news:"] } };
  }
};

export const deleteNews = async (_prevState: unknown, formData: FormData) => {
  const result = deleteNewsSchema.safeParse({ id: formData.get("id") });
  if (!result.success) return { success: false, errors: result.error.flatten().fieldErrors };
  try {
    await prisma.news.delete({ where: { id: result.data.id } });
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    return { success: false, errors: { prisma: ["Failed to delete news"] } };
  }
};
