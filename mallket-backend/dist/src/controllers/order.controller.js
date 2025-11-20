"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = exports.createOrder = void 0;
const order_service_1 = __importDefault(require("../services/order.service"));
const createOrder = (req, res) => order_service_1.default.createOrder(req, res);
exports.createOrder = createOrder;
const getOrders = (req, res) => order_service_1.default.getOrders(req, res);
exports.getOrders = getOrders;
