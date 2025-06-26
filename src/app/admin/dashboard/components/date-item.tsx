"use client";

import { Date } from "@prisma/client";
import { deleteDate } from "@/services/dates";
import { useActionState } from "react";
import Link from "next/link";

type Props = {
  date: Date;
};

export const DateItem: React.FC<Props> = ({ date }) => {
  const [_state, action, pending] = useActionState(deleteDate, undefined);

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
          <p>Lieux</p>
          <ul className="list-disc px-4">
            {date.locations.map((loc: string, i: number) => (
              <li key={i}>{loc}</li>
            ))}
          </ul>
        </li>
        <li>
          <p>{date.soldOut ? "Sold Out" : "Places dispo"}</p>
        </li>
      </ul>

      <div className="mt-4 flex gap-2">
        <form action={action} className="w-full">
          <input type="hidden" value={date.id} name="id" id="id" />
          <button
            type="submit"
            disabled={pending}
            className="w-full border p-2 disabled:bg-gray-200"
          >
            Delete
          </button>
        </form>
        <Link href={`/admin/dashboard/date/${date.id}`} className="w-full border p-2 text-center">
          Update
        </Link>
      </div>
    </li>
  );
};
