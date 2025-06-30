import type React from "react";

import { prisma } from "@/lib/prisma";
import { DatesList } from "./components/dates-list";
import { AddDateForm } from "./components/add-date-form";
import { NewsList } from "./components/news-list";
import { AddNewsForm } from "./components/add-news-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DashboardPage: React.FC = async () => {
  const dates = await prisma.date.findMany();
  const news = await prisma.news.findMany();

  return (
    <div className="container mx-auto space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Manage your events, dates, and news</p>
        </div>
      </div>

      <Tabs defaultValue="dates" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dates">Event Dates</TabsTrigger>
          <TabsTrigger value="news">News & Updates</TabsTrigger>
        </TabsList>

        <TabsContent value="dates" className="space-y-6">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <DatesList dates={dates} />
            </div>
            <div className="lg:col-span-1">
              <AddDateForm />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="news" className="space-y-6">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <NewsList news={news} />
            </div>
            <div className="lg:col-span-1">
              <AddNewsForm />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
