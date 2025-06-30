"use client";

import type React from "react";

import { updateDate } from "@/services/dates";
import type { Date } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Save, Calendar, MapPin, Globe, AlertCircle } from "lucide-react";

type Props = {
  date: Date;
};

export const UpdateDateForm: React.FC<Props> = ({ date }) => {
  const [state, action, pending] = useActionState(updateDate, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/admin/dashboard");
    }
  }, [state, router]);

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
          Update Event Date
        </CardTitle>
        <CardDescription>Modify the details for this event date</CardDescription>
      </CardHeader>

      <CardContent>
        <form action={action} className="space-y-6">
          <input type="hidden" name="id" value={date.id} />

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

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Event Date
              </Label>
              <Input
                type="date"
                id="date"
                name="date"
                defaultValue={date.date.toISOString().split("T")[0]}
                required
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  City
                </Label>
                <Input
                  type="text"
                  id="city"
                  name="city"
                  defaultValue={date.city || ""}
                  required
                  placeholder="Enter city"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Country
                </Label>
                <Input
                  type="text"
                  id="country"
                  name="country"
                  defaultValue={date.country || ""}
                  required
                  placeholder="Enter country"
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label className="text-base font-medium">Venue Locations</Label>
            <p className="text-muted-foreground text-sm">Add up to 3 venue locations</p>
            <div className="space-y-2">
              <Input
                type="text"
                name="locations"
                defaultValue={date.locations?.[0] || ""}
                placeholder="Primary venue"
              />
              <Input
                type="text"
                name="locations"
                defaultValue={date.locations?.[1] || ""}
                placeholder="Secondary venue (optional)"
              />
              <Input
                type="text"
                name="locations"
                defaultValue={date.locations?.[2] || ""}
                placeholder="Additional venue (optional)"
              />
            </div>
          </div>

          <Separator />

          <div className="flex items-center space-x-2">
            <Checkbox id="soldOut" name="soldOut" defaultChecked={date.soldOut || false} />
            <Label
              htmlFor="soldOut"
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Mark as sold out
            </Label>
          </div>

          <Button type="submit" disabled={pending} className="w-full" size="lg">
            <Save className="mr-2 h-4 w-4" />
            {pending ? "Updating..." : "Update Event Date"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
