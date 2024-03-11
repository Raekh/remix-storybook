import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const seed = async () => {
  // USERS
  const john = await prisma.user.create({
    data: {
      username: "johnwick69",
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u", // twixrox
    },
  });

  const viacoScope = await prisma.scope.create({
    data: {
      name: "Viaco",
    },
  });

  const back = await prisma.project.create({
    data: {
      name: "Back",
      scopeId: viacoScope.id,
    },
  });

  const front = await prisma.project.create({
    data: {
      name: "Front",
      scopeId: viacoScope.id,
    },
  });

  const backOffice = await prisma.project.create({
    data: {
      name: "Back Office",
      scopeId: viacoScope.id,
    },
  });
};

seed();
