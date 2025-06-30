import type React from "react";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { UpdateNewsForm } from "./components/update-news-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const NewsDetailPage: React.FC<Props> = async ({ params }) => {
  const { id } = await params;
  const news = await prisma.news.findUnique({
    where: { id },
  });

  if (!news) {
    notFound();
  }

  return (
    <div className="grid min-h-screen w-screen place-items-center">
      <UpdateNewsForm news={news} />
    </div>
  );
};

export default NewsDetailPage;
