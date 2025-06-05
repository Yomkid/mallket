import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const SALT_ROUNDS = 12;

async function main() {
  console.log('🌱 Starting database seeding...');

  // ⚠️ WARNING: This deletes all existing records
  console.log('🧹 Cleaning existing data...');
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.address.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Hash passwords
  const hashedPassword = await bcrypt.hash('1234567', SALT_ROUNDS);

  // 1. Create Users
  console.log('👥 Creating users...');
  const [adminUser, regularUser] = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Mayomi Odewaye',
        email: 'odewayemayomi@gmail.com',
        password: hashedPassword,
        isAdmin: true,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Morayo Odewaye',
        email: 'yomkidsblog@gmail.com',
        password: hashedPassword,
      },
    })
  ]);

  // 2. Create Categories
  console.log('🏷️ Creating categories...');
  const [footwear, accessories] = await Promise.all([
    prisma.category.create({ data: { name: 'Footwear' } }),
    prisma.category.create({ data: { name: 'Accessories' } })
  ]);

  // 3. Create Products
  console.log('🛍️ Creating products...');
  const [runningShoes, backpack] = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Running Shoes',
        description: 'High-performance running shoes',
        price: 99.99,
        stock: 50,
        images: ['/uploads/shoes1.jpg', '/uploads/shoes2.jpg'],
        categoryId: footwear.id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Backpack',
        description: 'Durable travel backpack',
        price: 49.99,
        stock: 30,
        images: ['/uploads/backpack1.jpg'],
        categoryId: accessories.id,
      },
    })
  ]);

  // 4. Create Carts
  console.log('🛒 Creating shopping carts...');
  const [adminCart, userCart] = await Promise.all([
    prisma.cart.create({ data: { userId: adminUser.id } }),
    prisma.cart.create({ data: { userId: regularUser.id } })
  ]);

  // 5. Add Items to Carts
  console.log('➕ Adding items to carts...');
  await Promise.all([
    prisma.cartItem.create({
      data: {
        quantity: 2,
        cartId: adminCart.id,
        productId: runningShoes.id,
      },
    }),
    prisma.cartItem.create({
      data: {
        quantity: 1,
        cartId: userCart.id,
        productId: backpack.id,
      },
    })
  ]);

  // 6. Create Addresses
  console.log('🏠 Creating addresses...');
  const [adminAddress, userAddress] = await Promise.all([
    prisma.address.create({
      data: {
        userId: adminUser.id,
        line1: '123 Street Name',
        city: 'Lagos',
        state: 'Lagos',
        postalCode: '100001',
        country: 'Nigeria',
      },
    }),
    prisma.address.create({
      data: {
        userId: regularUser.id,
        line1: '456 Avenue',
        line2: 'Suite 12',
        city: 'Abuja',
        state: 'FCT',
        postalCode: '900001',
        country: 'Nigeria',
      },
    })
  ]);

  // 7. Create Orders
  console.log('📦 Creating orders...');
  await Promise.all([
    prisma.order.create({
      data: {
        userId: adminUser.id,
        status: 'pending',
        total: 2 * runningShoes.price,
        items: {
          create: {
            productId: runningShoes.id,
            quantity: 2,
            price: runningShoes.price,
          },
        },
        addressId: adminAddress.id,
      },
    }),
    prisma.order.create({
      data: {
        userId: regularUser.id,
        status: 'pending',
        total: backpack.price,
        items: {
          create: {
            productId: backpack.id,
            quantity: 1,
            price: backpack.price,
          },
        },
        addressId: userAddress.id,
      },
    })
  ]);

  console.log('\n✅ Database seeded successfully!');
  console.log('📋 Sample credentials:');
  console.log('👑 Admin:', { 
    email: 'odewayemayomi@gmail.com', 
    password: '1234567' 
  });
  console.log('👤 User:', { 
    email: 'yomkidsblog@gmail.com', 
    password: '1234567' 
  });
}

main()
  .catch((e) => {
    console.error('\n❌ Error seeding database:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });