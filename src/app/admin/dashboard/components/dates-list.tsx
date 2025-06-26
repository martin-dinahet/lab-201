"use client";

import { Date } from "@prisma/client";

type Props = {
  dates: Date[];
};

export const DatesList: React.FC<Props> = ({ dates }) => {
  return (
    <ul>
      {dates.map((date: Date) => (
        <li key={date.id}>
          <p>{date.date.toLocaleDateString()}</p>
          <p>{date.city}</p>
          <p>{date.country}</p>
          <ul>
            {date.locations.map((loc: string, i: number) => (
              <li key={i}>{loc}</li>
            ))}
          </ul>
          <p>{date.soldOut}</p>
        </li>
      ))}
    </ul>
  );
};
