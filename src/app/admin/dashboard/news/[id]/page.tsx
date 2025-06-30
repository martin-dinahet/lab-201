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
    <div className="container mx-auto space-y-8 p-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit News Article</h1>
          <p className="text-muted-foreground">Update your news article details</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Article Preview */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Article Preview
              </CardTitle>
              <CardDescription>This is how your article currently appears</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Featured Image */}
              {news.imgUrl && (
                <div className="relative h-64 w-full overflow-hidden rounded-lg">
                  <Image
                    src={news.imgUrl || "/placeholder.svg"}
                    alt={news.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Article Header */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl leading-tight font-bold">{news.title}</h2>
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    Published on{" "}
                    {news.createdAt.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>

                {/* Article Content */}
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground leading-relaxed">{news.desc}</p>
                </div>
              </div>

              {/* Article Meta */}
              <div className="border-t pt-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Created:</span>
                    <p className="text-muted-foreground">
                      {news.createdAt.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Last Updated:</span>
                    <p className="text-muted-foreground">
                      {news.updatedAt.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <UpdateNewsForm news={news} />
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
