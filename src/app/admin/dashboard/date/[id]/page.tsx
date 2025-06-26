"use server";

import { prisma } from "@/lib/prisma";
import { UpdateDateForm } from "./components/update-date-form";

type Props = {
  params: Promise<{ id: string }>;
};

const UpdateDatePage: React.FC<Props> = async ({ params }) => {
  const { id } = await params;
  const date = await prisma.date.findUnique({ where: { id } });

  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      <UpdateDateForm date={date} />
    </div>
  );
};

export default UpdateDatePage;
