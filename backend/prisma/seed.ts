import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const defaultCategories = [
  { id: "1", name: "Eletrônicos", parentId: null },
  { id: "2", name: "Celulares", parentId: "1" },
  { id: "3", name: "Computadores", parentId: "1" },
  { id: "4", name: "Roupas", parentId: null },
  { id: "5", name: "Camisetas", parentId: "4" },
];

async function seed() {
  const existingCategories = await prisma.category.findMany();

  if (existingCategories.length === 0) {
    for (const category of defaultCategories) {
      await prisma.category.create({
        data: {
          id: category.id,
          name: category.name,
          parent: category.parentId
            ? { connect: { id: category.parentId } }
            : undefined,
        },
      });
    }
    console.log("Categorias padrão criadas!");
  } else {
    console.log("Categorias padrão já existem.");
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
