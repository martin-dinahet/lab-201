import { prisma } from "@/lib/prisma";
import { DatesList } from "./components/dates-list";
import { AddDateForm } from "./components/add-date-form";

const DashboardPage: React.FC = async () => {
  const dates = await prisma.date.findMany();

  return (
    <div className="container mx-auto space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Manage your event dates and locations</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DatesList dates={dates} />
        </div>
        <div className="lg:col-span-1">
          <AddDateForm />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
