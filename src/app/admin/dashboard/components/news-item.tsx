"use client";

import { deleteNews } from "@/services/news";
import { useActionState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash2, Edit, Clock } from "lucide-react";
import { News } from "@prisma/client";

type Props = {
  news: News;
};

export const NewsItem: React.FC<Props> = ({ news }) => {
  const [_state, action, pending] = useActionState(deleteNews, undefined);

  return (
    <Card className="overflow-hidden p-6">
      <div className="flex flex-col sm:flex-row">
        <div className="relative h-32 w-full sm:h-auto sm:w-48">
          <Image
            src={news.imgUrl || "/placeholder.svg?height=128&width=192"}
            alt={news.title}
            fill
            unoptimized
            className="rounded-lg object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col">
          <CardHeader className="pb-3">
            <div className="space-y-2">
              <h3 className="line-clamp-2 text-lg leading-tight font-semibold">{news.title}</h3>
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                {news.createdAt.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex flex-1 flex-col justify-between pt-0">
            <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">{news.desc}</p>

            <div className="space-y-3">
              <Separator />
              <div className="flex gap-2">
                <form action={action} className="flex-1">
                  <input type="hidden" value={news.id} name="id" />
                  <Button
                    type="submit"
                    variant="destructive"
                    size="sm"
                    disabled={pending}
                    className="w-full"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    {pending ? "Deleting..." : "Delete"}
                  </Button>
                </form>

                <Button asChild variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Link href={`/admin/dashboard/news/${news.id}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
};
