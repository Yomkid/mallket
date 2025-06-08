import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const SALT_ROUNDS = 12;

async function main() {
  console.log('🌱 Starting database seeding...');

  // ⚠️ WARNING: Deletes existing records in proper order to avoid foreign key constraints
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
    'rolePermission',
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
    } catch (error) {
      console.error(`❌ Error deleting ${model}:`, error);
    }
  }

  // 1️⃣ Seed Roles & Permissions
  console.log('🔐 Creating roles & permissions...');
  const rolesData = [
    { 
      name: 'ADMIN', 
      description: 'Administrator with full access',
      permissions: [
        'MANAGE_USERS', 'MANAGE_PRODUCTS', 'MANAGE_ORDERS',
        'MANAGE_CATEGORIES', 'MANAGE_COUPONS', 'VIEW_REPORTS'
      ] 
    },
    { 
      name: 'SELLER', 
      description: 'Seller who can manage their products',
      permissions: [
        'MANAGE_PRODUCTS', 'VIEW_ORDERS', 'MANAGE_INVENTORY'
      ] 
    },
    { 
      name: 'CUSTOMER', 
      description: 'Regular customer',
      permissions: [
        'VIEW_PRODUCTS', 'PLACE_ORDER', 'MANAGE_CART',
        'MANAGE_WISHLIST', 'WRITE_REVIEWS'
      ] 
    },
  ];

  // Create permissions first
  const allPermissions = Array.from(new Set(rolesData.flatMap(role => role.permissions)));
  for (const action of allPermissions) {
    await prisma.permission.create({
      data: { 
        action,
        description: `${action.replace(/_/g, ' ').toLowerCase()} permission`
      }
    });
  }

  // Create roles with permissions
  const roles: Record<string, any> = {};
  for (const roleData of rolesData) {
    const role = await prisma.role.create({
      data: {
        name: roleData.name,
        description: roleData.description,
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
        description: '3-5 business days',
        price: 4.99,
        minDays: 3,
        maxDays: 5
      }
    }),
    prisma.shippingMethod.create({
      data: {
        name: 'Express Shipping',
        description: '1-2 business days',
        price: 9.99,
        minDays: 1,
        maxDays: 2
      }
    })
  ]);

  // 3️⃣ Create Users with Assigned Roles
  console.log('👥 Creating users...');
  const hashedPassword = await bcrypt.hash('1234567', SALT_ROUNDS);
  
  const users = await Promise.all([
    prisma.user.create({
      data: {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        password: hashedPassword,
        emailVerified: true,
        roleId: roles['ADMIN'].id,
        addresses: {
          create: {
            firstName: 'Admin',
            lastName: 'User',
            line1: '123 Admin Street',
            city: 'Tech City',
            state: 'Digital State',
            postalCode: '10001',
            country: 'Techland',
            isDefault: true
          }
        }
      },
      include: { addresses: true }
    }),
    prisma.user.create({
      data: {
        firstName: 'Seller',
        lastName: 'User',
        email: 'seller@example.com',
        password: hashedPassword,
        emailVerified: true,
        roleId: roles['SELLER'].id,
        addresses: {
          create: {
            firstName: 'Seller',
            lastName: 'User',
            line1: '456 Seller Ave',
            city: 'Commerce City',
            state: 'Trade State',
            postalCode: '20002',
            country: 'Marketland'
          }
        }
      },
      include: { addresses: true }
    }),
    prisma.user.create({
      data: {
        firstName: 'Customer',
        lastName: 'User',
        email: 'customer@example.com',
        password: hashedPassword,
        emailVerified: true,
        roleId: roles['CUSTOMER'].id,
        addresses: {
          create: [{
            firstName: 'Customer',
            lastName: 'User',
            line1: '789 Customer Lane',
            line2: 'Apt 101',
            city: 'Buyer Town',
            state: 'Purchase State',
            postalCode: '30003',
            country: 'Consumerland',
            isDefault: true
          }, {
            firstName: 'Customer',
            lastName: 'User',
            line1: '321 Shipping Address',
            city: 'Delivery City',
            state: 'Receive State',
            postalCode: '40004',
            country: 'Consumerland'
          }]
        }
      },
      include: { addresses: true }
    })
  ]);

  const [adminUser, sellerUser, customerUser] = users;

  // 4️⃣ Create Categories
  console.log('🏷️ Creating categories...');
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Electronics',
        description: 'Electronic devices and accessories'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Clothing',
        description: 'Apparel and fashion items'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Home & Kitchen',
        description: 'Home appliances and kitchenware'
      }
    })
  ]);

  // 5️⃣ Create Attributes
  console.log('🔧 Creating attributes...');
  const attributes = await Promise.all([
    prisma.attribute.create({
      data: {
        name: 'Color',
        values: {
          create: [
            { value: 'Red' },
            { value: 'Blue' },
            { value: 'Green' },
            { value: 'Black' }
          ]
        }
      },
      include: { values: true }
    }),
    prisma.attribute.create({
      data: {
        name: 'Size',
        values: {
          create: [
            { value: 'S' },
            { value: 'M' },
            { value: 'L' },
            { value: 'XL' }
          ]
        }
      },
      include: { values: true }
    })
  ]);

  // 6️⃣ Create Products with Variants
  console.log('🛍️ Creating products...');
  const products = await Promise.all([
    // Smartphone
    prisma.product.create({
      data: {
        name: 'Premium Smartphone',
        description: 'Latest model with advanced features',
        basePrice: 799.99,
        images: ['/uploads/phone1.jpg', '/uploads/phone2.jpg'],
        categories: {
          connect: { id: categories[0].id }
        },
        variants: {
          create: [
            {
              name: '128GB Black',
              price: 799.99,
              stock: 50,
              images: ['/uploads/phone_black.jpg']
            },
            {
              name: '256GB Blue',
              price: 899.99,
              stock: 30,
              images: ['/uploads/phone_blue.jpg']
            }
          ]
        },
        attributes: {
          create: [
            {
              attributeId: attributes[0].id,
              attributeValueId: attributes[0].values.find((v: { value: string; }) => v.value === 'Black')!.id
            },
            {
              attributeId: attributes[0].id,
              attributeValueId: attributes[0].values.find((v: { value: string; }) => v.value === 'Blue')!.id
            }
          ]
        }
      },
      include: { variants: true, attributes: true }
    }),
    // T-Shirt
    prisma.product.create({
      data: {
        name: 'Cotton T-Shirt',
        description: 'Comfortable 100% cotton t-shirt',
        basePrice: 24.99,
        images: ['/uploads/tshirt1.jpg'],
        categories: {
          connect: { id: categories[1].id }
        },
        variants: {
          create: [
            {
              name: 'Red - S',
              price: 24.99,
              stock: 100,
              images: ['/uploads/tshirt_red.jpg']
            },
            {
              name: 'Blue - M',
              price: 24.99,
              stock: 80,
              images: ['/uploads/tshirt_blue.jpg']
            }
          ]
        },
        attributes: {
          create: [
            {
              attributeId: attributes[0].id,
              attributeValueId: attributes[0].values.find((v: { value: string; }) => v.value === 'Red')!.id
            },
            {
              attributeId: attributes[0].id,
              attributeValueId: attributes[0].values.find((v: { value: string; }) => v.value === 'Blue')!.id
            },
            {
              attributeId: attributes[1].id,
              attributeValueId: attributes[1].values.find((v: { value: string; }) => v.value === 'S')!.id
            },
            {
              attributeId: attributes[1].id,
              attributeValueId: attributes[1].values.find((v: { value: string; }) => v.value === 'M')!.id
            }
          ]
        }
      },
      include: { variants: true, attributes: true }
    })
  ]);

  const [smartphone, tshirt] = products;

  // 7️⃣ Create Carts
  console.log('🛒 Creating shopping carts...');
  const carts = await Promise.all([
    prisma.cart.create({ data: { userId: adminUser.id } }),
    prisma.cart.create({ data: { userId: sellerUser.id } }),
    prisma.cart.create({ data: { userId: customerUser.id } })
  ]);

  // 8️⃣ Add Items to Carts
  console.log('➕ Adding items to carts...');
  await Promise.all([
    prisma.cartItem.create({
      data: {
        quantity: 1,
        cartId: carts[2].id, // Customer cart
        productId: smartphone.id,
        variantId: smartphone.variants[0].id
      }
    }),
    prisma.cartItem.create({
      data: {
        quantity: 2,
        cartId: carts[2].id, // Customer cart
        productId: tshirt.id,
        variantId: tshirt.variants[1].id
      }
    })
  ]);

  // 9️⃣ Create Coupons
  console.log('🎟️ Creating coupons...');
  const coupons = await Promise.all([
    prisma.coupon.create({
      data: {
        code: 'WELCOME10',
        description: '10% off for new customers',
        discountType: 'PERCENTAGE',
        value: 10,
        minOrder: 50,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        maxUses: 100,
        isActive: true
      }
    }),
    prisma.coupon.create({
      data: {
        code: 'FREESHIP',
        description: 'Free standard shipping',
        discountType: 'FIXED',
        value: shippingMethods[0].price,
        minOrder: 75,
        startDate: new Date(),
        endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
        isActive: true
      }
    })
  ]);

  // 🔟 Create Orders
  console.log('📦 Creating orders...');
  const orders = await Promise.all([
    // Completed order
    prisma.order.create({
      data: {
        userId: customerUser.id,
        status: 'DELIVERED',
        subtotal: 849.98, // 799.99 + 49.99
        tax: 84.99, // 10% tax
        total: 934.97,
        addressId: customerUser.addresses[0].id,
        shipping: {
          create: {
            trackingCode: 'TRK123456',
            status: 'delivered',
            cost: shippingMethods[0].price,
            estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            shippedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
            deliveredAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            methodId: shippingMethods[0].id,
            addressId: customerUser.addresses[0].id
          }
        },
        payment: {
          create: {
            method: 'Credit Card',
            amount: 934.97,
            transaction: 'PAY123456',
            status: 'COMPLETED',
            userId: customerUser.id
          }
        },
        items: {
          create: [
            {
              productId: smartphone.id,
              variantId: smartphone.variants[0].id,
              quantity: 1,
              price: 799.99
            },
            {
              productId: tshirt.id,
              variantId: tshirt.variants[1].id,
              quantity: 2,
              price: 24.99
            }
          ]
        }
      }
    }),
    // Pending order
    prisma.order.create({
      data: {
        userId: customerUser.id,
        status: 'PENDING',
        subtotal: 899.99,
        tax: 90.00,
        total: 989.99,
        couponId: coupons[0].id,
        addressId: customerUser.addresses[1].id,
        items: {
          create: [
            {
              productId: smartphone.id,
              variantId: smartphone.variants[1].id,
              quantity: 1,
              price: 899.99
            }
          ]
        }
      }
    })
  ]);

  // 1️⃣1️⃣ Create Reviews
  console.log('⭐ Creating reviews...');
  await Promise.all([
    prisma.review.create({
      data: {
        rating: 5,
        title: 'Great smartphone!',
        comment: 'Love the camera quality and battery life',
        isApproved: true,
        productId: smartphone.id,
        userId: customerUser.id
      }
    }),
    prisma.review.create({
      data: {
        rating: 4,
        title: 'Nice t-shirt',
        comment: 'Comfortable but color faded after wash',
        isApproved: true,
        productId: tshirt.id,
        userId: customerUser.id
      }
    })
  ]);

  // 1️⃣2️⃣ Create Notifications
  console.log('🔔 Creating notifications...');
  await prisma.notification.create({
    data: {
      type: 'ORDER',
      title: 'Order Delivered',
      message: 'Your order #12345 has been delivered',
      isRead: false,
      userId: customerUser.id,
      link: '/orders/12345'
    }
  });

  // 1️⃣3️⃣ Create Menu
  console.log('🍔 Creating navigation menu...');
  await prisma.menu.create({
    data: {
      name: 'MainNav',
      description: 'Main navigation menu',
      items: {
        create: [
          {
            label: 'Home',
            url: '/',
            order: 1
          },
          {
            label: 'Shop',
            url: '/products',
            order: 2,
            children: {
              create: [
                {
                  label: 'Electronics',
                  url: '/products/electronics',
                  order: 1
                },
                {
                  label: 'Clothing',
                  url: '/products/clothing',
                  order: 2
                }
              ]
            }
          },
          {
            label: 'Account',
            url: '/account',
            order: 3,
            permission: 'MANAGE_ACCOUNT'
          }
        ]
      }
    }
  });

  console.log('\n✅ Database seeded successfully!');
  console.log('📋 Sample credentials:');
  console.log('👑 Admin:', { email: 'admin@example.com', password: '1234567' });
  console.log('🛍️ Seller:', { email: 'seller@example.com', password: '1234567' });
  console.log('🛒 Customer:', { email: 'customer@example.com', password: '1234567' });
  console.log('🎟️ Coupon Code:', 'WELCOME10 (10% off)');
}

main()
  .catch((e) => {
    console.error('\n❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });