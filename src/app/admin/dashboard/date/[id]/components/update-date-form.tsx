"use client";

import { updateDate } from "@/services/dates";
import { Date } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

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
    <form action={action} className="w-[20rem] space-y-2 border p-2">
      <input type="hidden" name="id" value={date.id} />
      {state && !state.success && (
        <div className="rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          <pre>{JSON.stringify(state.errors, null, 2)}</pre>
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label htmlFor="date" className="text-sm">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          defaultValue={date.date.toISOString().split("T")[0]}
          required
          className="border p-1"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="city" className="text-sm">
          City
        </label>
        <input
          type="text"
          id="city"
          name="city"
          defaultValue={date.city || ""}
          required
          className="border p-1"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="country" className="text-sm">
          Country
        </label>
        <input
          type="text"
          id="country"
          name="country"
          defaultValue={date.country || ""}
          required
          className="border p-1"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="locations" className="text-sm">
          Locations
        </label>
        <input
          type="text"
          name="locations"
          defaultValue={date.locations?.[0] || ""}
          className="border p-1"
        />
        <input
          type="text"
          name="locations"
          defaultValue={date.locations?.[1] || ""}
          className="border p-1"
        />
        <input
          type="text"
          name="locations"
          defaultValue={date.locations?.[2] || ""}
          className="border p-1"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="soldOut" className="text-sm">
          Sold out ?
        </label>
        <input type="checkbox" id="soldOut" name="soldOut" defaultChecked={date.soldOut || false} />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-2 w-full border p-2 disabled:bg-gray-200"
      >
        {pending ? "Updating..." : "Update"}
      </button>
    </form>
  );
};
