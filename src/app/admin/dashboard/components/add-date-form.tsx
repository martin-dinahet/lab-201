"use client";

import { newDate } from "@/services/dates";
import { useActionState } from "react";
import { Card } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { CardDescription } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Plus, CalendarPlus } from "lucide-react";

export const AddDateForm: React.FC = () => {
  const [_state, action, pending] = useActionState(newDate, undefined);

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarPlus className="h-5 w-5" />
          Add New Date
        </CardTitle>
        <CardDescription>Schedule a new event date with location details</CardDescription>
      </CardHeader>

      <CardContent>
        <form action={action} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="date">Event Date</Label>
              <Input type="date" id="date" name="date" required className="w-full" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input type="text" id="city" name="city" required placeholder="Enter city" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  type="text"
                  id="country"
                  name="country"
                  required
                  placeholder="Enter country"
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label className="text-base font-medium">Locations</Label>
            <p className="text-muted-foreground text-sm">Add up to 3 venue locations</p>
            <div className="space-y-2">
              <Input type="text" name="locations" placeholder="Primary venue" />
              <Input type="text" name="locations" placeholder="Secondary venue (optional)" />
              <Input type="text" name="locations" placeholder="Additional venue (optional)" />
            </div>
          </div>

          <Separator />

          <div className="flex items-center space-x-2">
            <Checkbox id="soldOut" name="soldOut" />
            <Label
              htmlFor="soldOut"
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Mark as sold out
            </Label>
          </div>

          <Button type="submit" disabled={pending} className="w-full" size="lg">
            <Plus className="mr-2 h-4 w-4" />
            {pending ? "Adding Date..." : "Add Event Date"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
