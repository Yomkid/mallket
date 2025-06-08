"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../config/prisma"));
const getAllProducts = async () => {
    return await prisma_1.default.product.findMany();
};
const getProductById = async (id) => {
    return await prisma_1.default.product.findUnique({ where: { id } });
};
const createProduct = async (data) => {
    const { categoryIds, ...productData } = data;
    return await prisma_1.default.product.create({
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
const updateProduct = async (id, data) => {
    const { categoryIds, ...productData } = data;
    return await prisma_1.default.product.update({
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
const deleteProduct = async (id) => {
    return await prisma_1.default.product.delete({ where: { id } });
};
exports.default = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
