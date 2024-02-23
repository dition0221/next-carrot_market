import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

async function main() {
  [...Array.from(Array(20).keys())].forEach(async (item) => {
    await prismaClient.stream.create({
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
