"use client";

import { Date } from "@prisma/client";
import { DateItem } from "./date-item";

type Props = {
  dates: Date[];
};

export const DatesList: React.FC<Props> = ({ dates }) => {
  return (
    <ul className="flex flex-wrap gap-2">
      {dates.map((date: Date) => (
        <DateItem key={date.id} date={date} />
      ))}
    </ul>
  );
};
