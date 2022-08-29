import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function getAll(userId: string) {
  return await prisma.recipient.findMany({ where: { userId } });
}

async function get(id?: string) {
  return await prisma.recipient.findUnique({
    where: { id },
  });
}

async function update(id: string, input: Prisma.RecipientUpdateInput) {
  return await prisma.recipient.update({
    where: { id },
    data: input,
  });
}

async function create(input: Prisma.RecipientCreateInput) {
  return await prisma.recipient.create({ data: input });
}

async function remove(id: string) {
  return await prisma.recipient.delete({
    where: { id },
  });
}

export { getAll, get, update, create, remove };
