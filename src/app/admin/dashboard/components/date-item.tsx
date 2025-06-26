"use client";

import { Date } from "@prisma/client";
import { deleteDate } from "@/services/dates";
import { useActionState } from "react";

type Props = {
  date: Date;
};

export const DateItem: React.FC<Props> = ({ date }) => {
  const [state, action, pending] = useActionState(deleteDate, undefined);

  return (
    <li key={date.id} className="w-[20rem] border p-2">
      <ul className="list-disc px-4">
        <li>
          Date: <span className="font-semibold">{date.date.toLocaleDateString()}</span>
        </li>
        <li>
          Ville: <span className="font-semibold">{date.city}</span>
        </li>
        <li>
          Pays: <span className="font-semibold">{date.country}</span>
        </li>
        <li>
          <p>Lieu</p>
          <ul className="list-disc px-4">
            {date.locations.map((loc: string, i: number) => (
              <li key={i}>{loc}</li>
            ))}
          </ul>
        </li>
        <p>{date.soldOut}</p>
        <form action={action}>
          <input type="hidden" value={date.id} name="id" id="id" />
          <button
            type="submit"
            disabled={pending}
            className="w-full border p-2 disabled:bg-gray-200"
          >
            Delete
          </button>
        </form>
      </ul>
    </li>
  );
};
