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
// tests/utils/keyManagement.test.ts
const keyManagement_1 = require("../../src/utils/keyManagement");
const crypto = __importStar(require("crypto"));
jest.mock("crypto", () => ({
    ...jest.requireActual("crypto"),
    generateKeyPairSync: jest.fn(() => ({
        publicKey: {
            export: jest.fn(() => "mocked_public_key"),
        },
        privateKey: {
            export: jest.fn(() => "mocked_private_key"),
        },
    })),
}));
describe("generateKeyPair", () => {
    it("should generate a public and private key pair", () => {
        const keys = (0, keyManagement_1.generateKeyPair)();
        expect(keys.publicKey).toBe("mocked_public_key");
        expect(keys.privateKey).toBe("mocked_private_key");
        expect(crypto.generateKeyPairSync).toHaveBeenCalledWith("rsa", {
            modulusLength: 2048,
        });
    });
});
//# sourceMappingURL=test_keyManagement.test.js.map