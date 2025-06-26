"use server";

import { prisma } from "@/lib/prisma";
import { DatesList } from "./components/dates-list";
import { AddDateForm } from "./components/add-date-form";

const DashboardPage: React.FC = async () => {
  const dates = await prisma.date.findMany();

  return (
    <div className="m-4 min-h-screen w-screen">
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
      <section className="space-y-2">
        <article className="w-fit border p-2">
          <h2>Liste des dates</h2>
          <DatesList dates={dates} />
        </article>
        <article className="border p-2">
          <h2>Ajouter une date</h2>
          <AddDateForm />
        </article>
      </section>
    </div>
  );
};

export default DashboardPage;
