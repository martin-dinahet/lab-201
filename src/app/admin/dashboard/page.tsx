import type React from "react";
import { prisma } from "@/lib/prisma";
import { DatesList } from "./components/dates-list";
import { NewsList } from "./components/news-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogOut, Calendar, Newspaper, Plus } from "lucide-react";
import { logout } from "@/lib/auth";
import Link from "next/link";

const DashboardPage: React.FC = async () => {
  const dates = await prisma.date.findMany();
  const news = await prisma.news.findMany();

  return (
    <div className="from-background to-muted/20 min-h-screen bg-gradient-to-br">
      {/* Header */}
      <header className="bg-background/80 sticky top-0 z-50 border-b backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <h1 className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-2xl font-bold tracking-tight text-transparent">
            VALD Admin Dashboard
          </h1>
          <form action={logout}>
            <Button
              variant="outline"
              size="sm"
              type="submit"
              className="hover:bg-destructive hover:text-destructive-foreground bg-transparent transition-colors"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        <Tabs defaultValue="dates" className="space-y-6">
          <TabsList className="grid h-12 w-full grid-cols-2">
            <TabsTrigger value="dates" className="flex items-center gap-2 text-sm font-medium">
              <Calendar className="h-4 w-4" />
              Event Dates
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center gap-2 text-sm font-medium">
              <Newspaper className="h-4 w-4" />
              News & Updates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dates" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 rounded-lg p-2">
                      <Calendar className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Event Dates</h3>
                      <p className="text-muted-foreground text-sm">
                        {dates.length} scheduled events
                      </p>
                    </div>
                  </div>
                  <Link href="/admin/dashboard/date">
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Date
                    </Button>
                  </Link>
                </div>
                <div className="[&_img]:mx-auto [&_img]:my-4 [&_img]:max-w-full [&_img]:rounded-lg [&_img]:shadow-sm">
                  <DatesList dates={dates} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news" className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 rounded-lg p-2">
                      <Newspaper className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">News & Updates</h3>
                      <p className="text-muted-foreground text-sm">
                        {news.length} published articles
                      </p>
                    </div>
                  </div>
                  <Link href="/admin/dashboard/news">
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Article
                    </Button>
                  </Link>
                </div>
                <div className="[&_img]:mx-auto [&_img]:my-4 [&_img]:max-w-full [&_img]:rounded-lg [&_img]:shadow-sm">
                  <NewsList news={news} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default DashboardPage;
