import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const seed = async () => {
  // USERS
  await prisma.user.create({
    data: {
      username: "johnwick69",
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u", // twixrox
    },
  });
};

seed();
