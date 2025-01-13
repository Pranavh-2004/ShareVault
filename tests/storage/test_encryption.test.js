"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const encryption_ts_1 = require("/home/sampriti/Self/iitkgp/KshitijKotaPES/src/storage/encryption.ts");
// Load environment variables from .env file
dotenv.config();
describe("EncryptionService", () => {
    // Use the encryption key from the environment variables
    const encryptionKey = process.env.ENCRYPTION_KEY;
    // Check if the encryption key is missing in the environment variable
    if (!encryptionKey || encryptionKey.length !== 64) {
        throw new Error("Missing or invalid ENCRYPTION_KEY in environment variables.");
    }
    const service = new encryption_ts_1.EncryptionService();
    test("should encrypt and decrypt data correctly", async () => {
        const data = Buffer.from("Hello, World!");
        const encryptedData = await service.encrypt(data);
        const decryptedData = service.decrypt(encryptedData);
        expect(decryptedData.toString()).toBe(data.toString());
    });
    test("should throw an error for invalid key", () => {
        const originalKey = process.env.ENCRYPTION_KEY; // Save the original key
        // Temporarily set an invalid key for the test
        process.env.ENCRYPTION_KEY = "invalid-key";
        // Expect the EncryptionService constructor to throw an error
        expect(() => new encryption_ts_1.EncryptionService()).toThrow("Invalid encryption key");
        // Reset the original key
        process.env.ENCRYPTION_KEY = originalKey;
    });
});
//# sourceMappingURL=test_encryption.test.js.map