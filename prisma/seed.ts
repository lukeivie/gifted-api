import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

const userCreateInput: Prisma.UserCreateInput = {
  firstName: "James",
  lastName: "Blake",
  email: "james.blake@example.com",
};

const wishlistCreateInput: Prisma.WishlistCreateInput = {
  title: "Legos",
  author: { create: userCreateInput },
};

const wishes: Prisma.WishCreateInput[] = [
  {
    name: "Kenobi's Starfighter",
    price: 30.25,
    brand: "Lego",
    wishlist: {
      create: wishlistCreateInput,
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
