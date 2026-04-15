import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DEFAULT_ADMIN_USERNAME = "admin";
const DEFAULT_ADMIN_PASSWORD = "ActaCodeML";

async function main(): Promise<void> {
  const username =
    process.env.SEED_ADMIN_USERNAME?.trim() || DEFAULT_ADMIN_USERNAME;
  const password = process.env.SEED_ADMIN_PASSWORD ?? DEFAULT_ADMIN_PASSWORD;

  const hash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { username },
    create: {
      username,
      password: hash,
      name: process.env.SEED_ADMIN_NAME ?? "Administrador",
      email: process.env.SEED_ADMIN_EMAIL ?? null,
    },
    update: {
      password: hash,
      ...(process.env.SEED_ADMIN_NAME
        ? { name: process.env.SEED_ADMIN_NAME }
        : {}),
      ...(process.env.SEED_ADMIN_EMAIL !== undefined
        ? { email: process.env.SEED_ADMIN_EMAIL || null }
        : {}),
    },
  });

  // eslint-disable-next-line no-console
  console.log(`Seed: usuário admin garantido (username: ${username}).`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
