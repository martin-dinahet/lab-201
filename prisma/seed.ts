import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const usersData: Array<Prisma.UserCreateInput> = [
  {
    username: "admin",
    email: "admin@mail.com",
    password: "password123",
  },
];

export const main = async () => {
  for (const u of usersData) {
    await prisma.user.create({ data: u });
  }
};

main();
