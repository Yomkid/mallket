"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const product_service_1 = __importDefault(require("../services/product.service"));
const getAllProducts = async (_req, res) => {
    const products = await product_service_1.default.getAllProducts();
    res.json(products);
};
exports.getAllProducts = getAllProducts;
const getProductById = async (req, res) => {
    const { id } = req.params;
    const product = await product_service_1.default.getProductById(id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
};
exports.getProductById = getProductById;
const createProduct = async (req, res) => {
    const newProduct = await product_service_1.default.createProduct(req.body);
    res.status(201).json(newProduct);
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updatedProduct = await product_service_1.default.updateProduct((id), req.body);
    res.json(updatedProduct);
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    await product_service_1.default.deleteProduct((id));
    res.status(204).send();
};
exports.deleteProduct = deleteProduct;
