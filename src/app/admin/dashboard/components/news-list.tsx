"use client";

import { NewsItem } from "./news-item";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Newspaper } from "lucide-react";
import { News } from "@prisma/client";

type Props = {
  news: News[];
};

export const NewsList: React.FC<Props> = ({ news }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Newspaper className="h-5 w-5" />
          News & Updates
        </CardTitle>
        <CardDescription>
          {news.length} {news.length === 1 ? "article" : "articles"} published
        </CardDescription>
      </CardHeader>
      <CardContent>
        {news.length === 0 ? (
          <div className="text-muted-foreground py-8 text-center">
            <Newspaper className="mx-auto mb-4 h-12 w-12 opacity-50" />
            <p>No news articles yet</p>
            <p className="text-sm">Create your first news article to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {news.map((article: News) => (
              <NewsItem key={article.id} news={article} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
