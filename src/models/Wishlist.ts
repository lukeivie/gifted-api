import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function getAll() {
  return await prisma.wishlist.findMany();
}

async function getById(id: string) {
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
  try {
    await prisma.wishlist.create({ data: input });
  } catch (e) {
    throw e;
  }
}

async function remove(id: string) {
  return await prisma.wishlist.delete({
    where: { id },
  });
}

export { getAll, getById, update, create, remove };
