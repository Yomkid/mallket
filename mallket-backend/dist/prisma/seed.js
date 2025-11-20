"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
const SALT_ROUNDS = 12;
async function main() {
    console.log('🌱 Starting database seeding...');
    // ⚠️ WARNING: Deletes existing records in proper order
    console.log('🧹 Cleaning existing data...');
    const deleteOrder = [
        'orderItem',
        'refund',
        'payment',
        'shipping',
        'order',
        'wishlistItem',
        'wishlist',
        'cartItem',
        'cart',
        'review',
        'inventoryLog',
        'productVariant',
        'productAttribute',
        'product',
        'attributeValue',
        'attribute',
        'category',
        'coupon',
        'address',
        'notification',
        'auditLog',
        'verificationToken',
        'session',
        'user',
        'routePermission',
        'permission',
        'role',
        'menuItem',
        'menu',
        'shippingMethod'
    ];
    for (const model of deleteOrder) {
        try {
            await prisma.$executeRawUnsafe(`DELETE FROM "${model}" CASCADE`);
            console.log(`✅ Deleted all ${model} records`);
        }
        catch (error) {
            console.error(`❌ Error deleting ${model}:`, error);
        }
    }
    // 1️⃣ Seed Roles & Permissions
    console.log('🔐 Creating roles & permissions...');
    const rolesData = [
        {
            name: 'ADMIN',
            permissions: ['MANAGE_USERS', 'MANAGE_PRODUCTS', 'MANAGE_ORDERS']
        },
        {
            name: 'SELLER',
            permissions: ['MANAGE_PRODUCTS', 'VIEW_ORDERS']
        },
        {
            name: 'CUSTOMER',
            permissions: ['VIEW_PRODUCTS', 'PLACE_ORDER']
        },
    ];
    // Create permissions first
    const allPermissions = Array.from(new Set(rolesData.flatMap(role => role.permissions)));
    for (const action of allPermissions) {
        await prisma.permission.create({
            data: { action }
        });
    }
    // Create roles with permissions
    const roles = {};
    for (const roleData of rolesData) {
        const role = await prisma.role.create({
            data: {
                name: roleData.name,
                permissions: {
                    connect: roleData.permissions.map(action => ({ action }))
                }
            }
        });
        roles[roleData.name] = role;
    }
    // 2️⃣ Create Shipping Methods
    console.log('🚚 Creating shipping methods...');
    const shippingMethods = await Promise.all([
        prisma.shippingMethod.create({
            data: {
                name: 'Standard Shipping',
                price: 4.99,
                minDays: 3,
                maxDays: 5
            }
        }),
        prisma.shippingMethod.create({
            data: {
                name: 'Express Shipping',
                price: 9.99,
                minDays: 1,
                maxDays: 2
            }
        })
    ]);
    // 3️⃣ Create Users with Assigned Roles
    console.log('👥 Creating users...');
    const hashedPassword = await bcryptjs_1.default.hash('1234567', SALT_ROUNDS);
    const users = await Promise.all([
        prisma.user.create({
            data: {
                firstName: 'Admin',
                lastName: 'User',
                email: 'admin@example.com',
                password: hashedPassword,
                emailVerified: true,
                roleId: roles['ADMIN'].id,
            }
        }),
        prisma.user.create({
            data: {
                firstName: 'Seller',
                lastName: 'User',
                email: 'seller@example.com',
                password: hashedPassword,
                emailVerified: true,
                roleId: roles['SELLER'].id,
            }
        }),
        prisma.user.create({
            data: {
                firstName: 'Customer',
                lastName: 'User',
                email: 'customer@example.com',
                password: hashedPassword,
                emailVerified: true,
                roleId: roles['CUSTOMER'].id,
            }
        })
    ]);
    const [adminUser, sellerUser, customerUser] = users;
    // 4️⃣ Create Categories
    console.log('🏷️ Creating categories...');
    const categories = await Promise.all([
        prisma.category.create({ data: { name: 'Electronics' } }),
        prisma.category.create({ data: { name: 'Clothing' } }),
        prisma.category.create({ data: { name: 'Home & Kitchen' } })
    ]);
    // 5️⃣ Create Products with Variants
    console.log('🛍️ Creating products...');
    const products = await Promise.all([
        prisma.product.create({
            data: {
                name: 'Premium Smartphone',
                basePrice: 799.99,
                images: ['/uploads/phone1.jpg'],
                categories: {
                    connect: { id: categories[0].id }
                },
                variants: {
                    create: [
                        { name: '128GB', price: 799.99, stock: 50 }
                    ]
                }
            }
        }),
        prisma.product.create({
            data: {
                name: 'Cotton T-Shirt',
                basePrice: 24.99,
                images: ['/uploads/tshirt1.jpg'],
                categories: {
                    connect: { id: categories[1].id }
                },
                variants: {
                    create: [
                        { name: 'Medium', price: 24.99, stock: 100 }
                    ]
                }
            }
        })
    ]);
    // 6️⃣ Create Carts
    console.log('🛒 Creating shopping carts...');
    const carts = await Promise.all([
        prisma.cart.create({ data: { userId: adminUser.id } }),
        prisma.cart.create({ data: { userId: sellerUser.id } }),
        prisma.cart.create({ data: { userId: customerUser.id } })
    ]);
    // 7️⃣ Add Items to Carts
    console.log('➕ Adding items to carts...');
    await prisma.cartItem.create({
        data: {
            quantity: 1,
            cartId: carts[2].id,
            productId: products[0].id,
            variantId: (await prisma.productVariant.findFirst({ where: { productId: products[0].id } })).id
        }
    });
    // 8️⃣ Create Orders
    console.log('📦 Creating orders...');
    await prisma.order.create({
        data: {
            userId: customerUser.id,
            status: 'PENDING',
            subtotal: 799.99, // Added required field
            tax: 79.99, // Added required field (10% of subtotal as example)
            total: 879.98, // subtotal + tax
            items: {
                create: {
                    productId: products[0].id,
                    variantId: (await prisma.productVariant.findFirst({
                        where: { productId: products[0].id }
                    })).id,
                    quantity: 1,
                    price: 799.99
                }
            }
        }
    });
    console.log('\n✅ Database seeded successfully!');
    console.log('📋 Sample credentials:');
    console.log('👑 Admin:', { email: 'admin@example.com', password: '1234567' });
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
