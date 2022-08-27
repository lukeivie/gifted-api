import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function getAll(wishlistId: string) {
  return await prisma.wish.findMany({ where: { wishlistId } });
}

async function get(id?: string) {
  return await prisma.wish.findUnique({
    where: { id },
  });
}

async function update(id: string, input: Prisma.WishUpdateInput) {
  return await prisma.wish.update({
    where: { id },
    data: input,
  });
}

async function create(input: Prisma.WishCreateInput) {
  return await prisma.wish.create({ data: input });
}

async function remove(id: string) {
  return await prisma.wish.delete({
    where: { id },
  });
}

export { getAll, get, update, create, remove };
