import axios from "axios";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();
// import * as dotenv from "dotenv";

// dotenv.config();

async function get(token: string | undefined, externalId: string) {
  if (!token) {
    throw "Unauthorized";
  }

  const user = await prisma.user.findUnique({
    where: { externalId: externalId },
  });

  return await axios
    .get(`${process.env.AUTH0_MANAGEMENT_API_BASE_URL!}/users/${user?.externalId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res?.data)
    .catch((e) => {
      throw e;
    });
}

export { get };
