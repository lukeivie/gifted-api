import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

const user1CreateInput: Prisma.UserCreateInput = {
  externalId: "auth0|630291d99ddac50ccc98285c",
};

const user2CreateInput: Prisma.UserCreateInput = {
  externalId: "auth0|630331970a1cdbb3901ec008",
};

const wishlist1CreateInput: Prisma.WishlistCreateInput = {
  title: "Legos",
  user: { create: user1CreateInput },
};

const wishlist2CreateInput: Prisma.WishlistCreateInput = {
  title: "Music Production",
  user: { create: user2CreateInput },
};

const wishes: Prisma.WishCreateInput[] = [
  {
    name: "Kenobi's Starfighter",
    price: 30.25,
    brand: "Lego",
    wishlist: {
      create: wishlist1CreateInput,
    },
    images: {
      create: [
        {
          image: {
            create: {
              alt: "A Star Wars lego kit",
              url: "https://m.media-amazon.com/images/I/81dsPG1JP0L._AC_SX679_.jpg",
            },
          },
        },
      ],
    },
  },
  {
    name: "Neumann U87i",
    price: 3000,
    brand: "Neumann",
    wishlist: {
      create: wishlist2CreateInput,
    },
  },
];

async function main() {
  console.log(`🚀 Starting seeding...\n...`);
  console.log(`Creating wishes...`);
  for (const w of wishes) {
    const wish = await prisma.wish.create({ data: w });
    console.log(`✅ Wish added: ${wish.name}`);
  }
  console.log(`...\n🌱 Seeding complete!`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
