"use client";

import { useActionState } from "react";
import { login } from "@/lib/auth";

const LoginPage: React.FC = () => {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <form action={action} className="w-[20rem] space-y-2 border p-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input type="email" id="email" name="email" className="border p-1" />
          {state?.errors?.email && <p className="text-red-500">{state.errors.email}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm">
            Password
          </label>
          <input type="password" id="password" name="password" className="border p-1" />
          {state?.errors?.password && <p className="text-red-500">{state.errors.password}</p>}
        </div>
        <button
          type="submit"
          disabled={pending}
          className="mt-2 w-full border p-2 disabled:bg-gray-200"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
