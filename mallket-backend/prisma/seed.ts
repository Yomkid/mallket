import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const SALT_ROUNDS = 12;

async function main() {
    console.log('🌱 Starting database seeding...');

    // ⚠️ WARNING: Deletes existing records
    console.log('🧹 Cleaning existing data...');
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.address.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();
    await prisma.role.deleteMany();
    await prisma.permission.deleteMany();

    // 1️⃣ **Seed Roles & Permissions (NEW)**
    console.log('🔐 Creating roles & permissions...');
    const rolesData = [
        { name: "ADMIN", permissions: ["MANAGE_USERS", "CREATE_PRODUCT", "DELETE_PRODUCT"] },
        { name: "SELLER", permissions: ["CREATE_PRODUCT", "VIEW_ORDERS"] },
        { name: "CUSTOMER", permissions: ["VIEW_PRODUCTS", "PLACE_ORDER"] }
    ];

    // Define the role type
    type RoleType = {
        id: string;
        name: string;  // Add this if you need to access the name
    };

    // Initialize with proper typing
    const roles: { [key: string]: RoleType } = {};

    // Now the role creation works with full type safety
    for (const role of rolesData) {
        const createdRole = await prisma.role.create({
            data: { name: role.name }
        });

        roles[role.name] = createdRole; // No more TypeScript error

        for (const action of role.permissions) {
            const existingPermission = await prisma.permission.findUnique({
                where: { action },
            });

            if (!existingPermission) {
                await prisma.permission.create({
                    data: { action },
                });
            }

            // Connect the permission to the role
            await prisma.role.update({
                where: { id: createdRole.id },
                data: {
                    permissions: {
                        connect: { action },
                    },
                },
            });
        }


    }

    // 2️⃣ **Hash Passwords**
    const hashedPassword = await bcrypt.hash('1234567', SALT_ROUNDS);

    // 3️⃣ **Create Users with Assigned Roles (UPDATED)**
    console.log('👥 Creating users...');
    const [adminUser, sellerUser, customerUser] = await Promise.all([
        prisma.user.create({
            data: {
                firstName: 'Mayomi',
                lastName: 'Odewaye',
                email: 'odewayemayomi@gmail.com',
                password: hashedPassword,
                roleId: roles["ADMIN"].id,
            },
        }),
        prisma.user.create({
            data: {
                firstName: 'John',
                lastName: 'Doe',
                email: 'seller@example.com',
                password: hashedPassword,
                roleId: roles["SELLER"].id,
            },
        }),
        prisma.user.create({
            data: {
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'customer@example.com',
                password: hashedPassword,
                roleId: roles["CUSTOMER"].id,
            },
        })
    ]);

    // 4️⃣ **Create Categories (FROM FIRST SCRIPT)**
    console.log('🏷️ Creating categories...');
    const [footwear, accessories] = await Promise.all([
        prisma.category.create({ data: { name: 'Footwear' } }),
        prisma.category.create({ data: { name: 'Accessories' } })
    ]);

    // 5️⃣ **Create Products (FROM FIRST SCRIPT)**
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

    // 6️⃣ **Create Carts (FROM FIRST SCRIPT - UPDATED FOR NEW USERS)**
    console.log('🛒 Creating shopping carts...');
    const [adminCart, sellerCart, customerCart] = await Promise.all([
        prisma.cart.create({ data: { userId: adminUser.id } }),
        prisma.cart.create({ data: { userId: sellerUser.id } }),
        prisma.cart.create({ data: { userId: customerUser.id } })
    ]);

    // 7️⃣ **Add Items to Carts (FROM FIRST SCRIPT - UPDATED)**
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
                cartId: customerCart.id,
                productId: backpack.id,
            },
        })
    ]);

    // 8️⃣ **Create Addresses (FROM FIRST SCRIPT - UPDATED)**
    console.log('🏠 Creating addresses...');
    await Promise.all([
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
                userId: customerUser.id,
                line1: '456 Avenue',
                line2: 'Suite 12',
                city: 'Abuja',
                state: 'FCT',
                postalCode: '900001',
                country: 'Nigeria',
            },
        })
    ]);

    console.log('\n✅ Database seeded successfully!');
    console.log('📋 Sample credentials:');
    console.log('👑 Admin:', { email: 'odewayemayomi@gmail.com', password: '1234567' });
    console.log('🛍️ Seller:', { email: 'seller@example.com', password: '1234567' });
    console.log('🛒 Customer:', { email: 'customer@example.com', password: '1234567' });
}

main()
    .catch((e) => {
        console.error('\n❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });