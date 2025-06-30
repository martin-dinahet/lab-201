"use client";

import Link from "next/link";
import { Date } from "@prisma/client";
import { deleteDate } from "@/services/dates";
import { useActionState } from "react";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, MapPin, Globe, Trash2, Edit, AlertCircle, CheckCircle } from "lucide-react";

type Props = {
  date: Date;
};

export const DateItem: React.FC<Props> = ({ date }) => {
  const [_state, action, pending] = useActionState(deleteDate, undefined);

  return (
    <Card className="relative">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <CalendarDays className="h-4 w-4" />
            {date.date.toLocaleDateString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </CardTitle>
          <Badge
            variant={date.soldOut ? "destructive" : "default"}
            className="flex items-center gap-1"
          >
            {date.soldOut ? (
              <>
                <AlertCircle className="h-3 w-3" />
                Sold Out
              </>
            ) : (
              <>
                <CheckCircle className="h-3 w-3" />
                Available
              </>
            )}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="text-muted-foreground h-4 w-4" />
            <span className="font-medium">{date.city}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Globe className="text-muted-foreground h-4 w-4" />
            <span className="font-medium">{date.country}</span>
          </div>

          {date.locations && date.locations.length > 0 && (
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm font-medium">Locations:</p>
              <div className="flex flex-wrap gap-1">
                {date.locations.map((location: string, i: number) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {location}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex gap-2">
          <form action={action} className="flex-1">
            <input type="hidden" value={date.id} name="id" />
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
            <Link href={`/admin/dashboard/date/${date.id}`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
