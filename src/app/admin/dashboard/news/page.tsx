import type React from "react";
import { AddNewsForm } from "../components/add-news-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const AddNewsPage: React.FC = () => {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">Add News Article</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6">
            <h2 className="text-3xl font-bold tracking-tight">Add News & Updates</h2>
            <p className="text-muted-foreground">
              Create a new news article or update for your audience
            </p>
          </div>

          <AddNewsForm />
        </div>
      </main>
    </div>
  );
};

export default AddNewsPage;
