import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function getAll(userId: string) {
  return await prisma.giftlist.findMany({ where: { userId } });
}

async function get(id?: string) {
  return await prisma.giftlist.findUnique({
    where: { id },
  });
}

async function update(id: string, input: Prisma.GiftlistUpdateInput) {
  return await prisma.giftlist.update({
    where: { id },
    data: input,
  });
}

async function create(input: Prisma.GiftlistCreateInput) {
  return await prisma.giftlist.create({ data: input });
}

async function remove(id: string) {
  return await prisma.giftlist.delete({
    where: { id },
  });
}

export { getAll, get, update, create, remove };
