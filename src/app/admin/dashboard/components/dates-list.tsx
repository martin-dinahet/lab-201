"use client";

import { Date } from "@prisma/client";
import { DateItem } from "./date-item";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { CardDescription } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

type Props = {
  dates: Date[];
};

export const DatesList: React.FC<Props> = ({ dates }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Event Dates
        </CardTitle>
        <CardDescription>
          {dates.length} {dates.length === 1 ? "date" : "dates"} scheduled
        </CardDescription>
      </CardHeader>
      <CardContent>
        {dates.length === 0 ? (
          <div className="text-muted-foreground py-8 text-center">
            <Calendar className="mx-auto mb-4 h-12 w-12 opacity-50" />
            <p>No dates scheduled yet</p>
            <p className="text-sm">Add your first event date to get started</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
            {dates.map((date: Date) => (
              <DateItem key={date.id} date={date} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
