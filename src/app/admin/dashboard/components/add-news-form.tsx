"use client";

import { newNews } from "@/services/news";
import { useActionState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Plus, PlusCircle, ImageIcon } from "lucide-react";

export const AddNewsForm: React.FC = () => {
  const [_state, action, pending] = useActionState(newNews, undefined);

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlusCircle className="h-5 w-5" />
          Add News Article
        </CardTitle>
        <CardDescription>Create a new news article or update</CardDescription>
      </CardHeader>

      <CardContent>
        <form action={action} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Article Title</Label>
              <Input
                type="text"
                id="title"
                name="title"
                required
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
                placeholder="Write a brief description or excerpt..."
                className="min-h-[100px] resize-none"
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="imgUrl" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Featured Image URL
            </Label>
            <Input
              type="url"
              id="imgUrl"
              name="imgUrl"
              placeholder="https://example.com/image.jpg"
              className="w-full"
            />
            <p className="text-muted-foreground text-xs">
              Enter a URL for the featured image (optional)
            </p>
          </div>

          <Button type="submit" disabled={pending} className="w-full" size="lg">
            <Plus className="mr-2 h-4 w-4" />
            {pending ? "Publishing..." : "Publish Article"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
