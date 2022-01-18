import { users } from './seeds/users';

import prisma from '../lib/prisma';

async function main() {
  await prisma.user.createMany({
    data: users
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
