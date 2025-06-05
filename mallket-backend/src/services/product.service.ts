import prisma from '../config/prisma';

const getAllProducts = async () => {
  return await prisma.product.findMany();
};

const getProductById = async (id: number) => {
  return await prisma.product.findUnique({ where: { id } });
};


const createProduct = async (data: {
  name: string;
  price: number;
  stock: number;
  description?: string;
  images: string[];
  categoryId?: string; // Ensure it's optional if needed
}) => {
  return await prisma.product.create({ data });
};


const updateProduct = async (id: number, data: Partial<{
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}>) => {
  return await prisma.product.update({
    where: { id },
    data,
  });
};

const deleteProduct = async (id: number) => {
  return await prisma.product.delete({ where: { id } });
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
