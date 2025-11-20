"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVar = getEnvVar;
// utils/env.ts (Optional utility file for config)
function getEnvVar(key, fallback) {
    const value = process.env[key];
    if (!value && fallback === undefined) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value || fallback;
}
