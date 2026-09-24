const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');
  
  const product1 = await prisma.product.create({
    data: {
      name: 'Sample Business Card',
      description: 'Premium quality business card with matte finish',
      price: 25.50,
    },
  });
  console.log(`Created product with id: ${product1.id}`);

  const product2 = await prisma.product.create({
    data: {
      name: 'Custom Flyer',
      description: 'A5 size promotional flyer on glossy paper',
      price: 15.00,
    },
  });
  console.log(`Created product with id: ${product2.id}`);

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
