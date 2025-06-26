"use client";

import { newDate } from "@/services/dates";
import { useActionState } from "react";

export const AddDateForm: React.FC = () => {
  const [_state, action, pending] = useActionState(newDate, undefined);

  return (
    <form action={action} className="w-[20rem] space-y-2 border p-2">
      <div className="flex flex-col gap-1">
        <label htmlFor="date" className="text-sm">
          Date
        </label>
        <input type="date" id="date" name="date" required className="border p-1" />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="city" className="text-sm">
          City
        </label>
        <input type="text" id="city" name="city" required className="border p-1" />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="country" className="text-sm">
          Country
        </label>
        <input type="text" id="country" name="country" required className="border p-1" />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="country" className="text-sm">
          locations
        </label>
        <input type="text" name="locations" className="border p-1" />
        <input type="text" name="locations" className="border p-1" />
        <input type="text" name="locations" className="border p-1" />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="soldOut" className="text-sm">
          Sold out ?
        </label>
        <input type="checkbox" id="soldOut" name="soldOut" />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="mt-2 w-full border p-2 disabled:bg-gray-200"
      >
        Submit
      </button>
    </form>
  );
};
