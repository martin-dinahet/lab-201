"use client";

import type { News } from "@prisma/client";
import type { FC } from "react";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateNews } from "@/services/news";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Save, ImageIcon, AlertCircle, CheckCircle, Newspaper } from "lucide-react";

type Props = {
  news: News;
};

export const UpdateNewsForm: FC<Props> = ({ news }) => {
  const router = useRouter();
  const [state, action, pending] = useActionState(updateNews, undefined);

  useEffect(() => {
    if (state?.success) {
      router.push("/admin/dashboard");
    }
  }, [state?.success, router]);

  useEffect(() => {
    if (state && !state.success) {
      console.log("Form errors:", state.errors);
    }
  }, [state]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Save className="h-5 w-5" />
          Update News Article
        </CardTitle>
        <CardDescription>Make changes to your news article</CardDescription>
      </CardHeader>

      <CardContent>
        <form action={action} className="space-y-6">
          {/* Hidden ID field */}
          <input type="hidden" name="id" value={news.id} />

          {/* Success/Error Messages */}
          {state && !state.success && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <pre className="text-xs whitespace-pre-wrap">
                  {JSON.stringify(state.errors, null, 2)}
                </pre>
              </AlertDescription>
            </Alert>
          )}

          {state?.success && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                News article updated successfully!
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center gap-2">
                <Newspaper className="h-4 w-4" />
                Article Title
              </Label>
              <Input
                type="text"
                id="title"
                name="title"
                required
                defaultValue={news.title}
                placeholder="Enter article title"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="desc">Description</Label>
              <Textarea
                id="desc"
                name="desc"
                required
                defaultValue={news.desc}
                placeholder="Write a brief description or excerpt..."
                className="min-h-[120px] resize-none"
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="img" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Featured Image URL
            </Label>
            <Input
              type="url"
              id="img"
              name="img"
              defaultValue={news.imgUrl || ""}
              placeholder="https://example.com/image.jpg"
              className="w-full"
            />
            <p className="text-muted-foreground text-xs">
              Enter a URL for the featured image (optional)
            </p>
          </div>

          <Separator />

          <Button type="submit" disabled={pending} className="w-full" size="lg">
            <Save className="mr-2 h-4 w-4" />
            {pending ? "Updating..." : "Update Article"}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full bg-transparent"
            onClick={() => router.push("/dashboard")}
            disabled={pending}
          >
            Cancel
          </Button>

          {/* Article Info */}
          <div className="text-muted-foreground space-y-1 border-t pt-4 text-xs">
            <p>
              <span className="font-medium">Created:</span>{" "}
              {news.createdAt.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <p>
              <span className="font-medium">Last updated:</span>{" "}
              {news.updatedAt.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
