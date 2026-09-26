// const { PrismaClient } = require('@prisma/client');
// const bcrypt = require('bcryptjs');

// const prisma = new PrismaClient();

// const seedAdmin = async () => {
//   try {
//     const adminEmail = 'admin@kritiprintpack.com';
//     const adminPassword = 'admin123'; // The plain text password
//     const hashedPassword = await bcrypt.hash(adminPassword, 10);

//     const existingAdmin = await prisma.adminUser.findUnique({
//       where: { email: adminEmail },
//     });

//     if (existingAdmin) {
//       console.log('Admin already exists.');
//       return;
//     }

//     await prisma.adminUser.create({
//       data: {
//         email: adminEmail,
//         password: hashedPassword,
//         name: 'Admin',
//       },
//     });

//     console.log(
//       `Admin user created successfully with email: ${adminEmail} and password: ${adminPassword}`
//     );
//   } catch (error) {
//     console.error('Error seeding admin user:', error);
//   } finally {
//     await prisma.$disconnect();
//   }
// };

// seedAdmin();