import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function getAll(userId: string) {
  return await prisma.wishlist.findMany({ where: { userId } });
}

async function get(id?: string) {
  return await prisma.wishlist.findUnique({
    where: { id },
  });
}

async function update(id: string, input: Prisma.WishlistUpdateInput) {
  return await prisma.wishlist.update({
    where: { id },
    data: input,
  });
}

async function create(input: Prisma.WishlistCreateInput) {
  return await prisma.wishlist.create({ data: input });
}

async function remove(id: string) {
  return await prisma.wishlist.delete({
    where: { id },
  });
}

export { getAll, get, update, create, remove };
