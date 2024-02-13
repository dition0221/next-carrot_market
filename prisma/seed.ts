import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

async function main() {
  [...Array.from(Array(500).keys())].forEach(async (item) => {
    const stream = await prismaClient.stream.create({
      data: {
        name: String(item),
        description: String(item),
        price: item,
        user: {
          connect: {
            id: 11,
          },
        },
      },
    });
    console.log(`${item}/500`);
  });
}

try {
  main();
} catch (error) {
  console.log(error);
} finally {
  () => prismaClient.$disconnect();
}
