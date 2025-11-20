import prisma from '../config/prisma';

const getAllProducts = async () => {
  return await prisma.product.findMany();
};

const getProductById = async (id: string) => {
  return await prisma.product.findUnique({ where: { id } });
};

const createProduct = async (data: {
  name: string;
  price: number;
  description?: string;
  images: string[];
  categoryIds?: string[]; // accept multiple categories by IDs
}) => {
  const { categoryIds, ...productData } = data;

  return await prisma.product.create({
    data: {
      ...productData,
      categories: categoryIds
        ? {
            connect: categoryIds.map(id => ({ id })),
          }
        : undefined,
    },
  });
};

const updateProduct = async (
  id: string,
  data: Partial<{
    name: string;
    price: number;
    description: string;
    images: string[];
    categoryIds: string[];
  }>
) => {
  const { categoryIds, ...productData } = data;

  return await prisma.product.update({
    where: { id },
    data: {
      ...productData,
      categories: categoryIds
        ? {
            set: categoryIds.map(id => ({ id })), // replace categories
          }
        : undefined,
    },
  });
};

const deleteProduct = async (id: string) => {
  return await prisma.product.delete({ where: { id } });
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
