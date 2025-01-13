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
const verify_zkp_1 = require("../../src/cli/commands/verify-zkp");
const fs = __importStar(require("fs"));
jest.mock("fs");
jest.mock("../../src/zkp/proofVerification.ts", () => ({
    verifyProof: jest.fn(async () => true),
}));
describe("verifyZKP", () => {
    it("should verify ZKP successfully", async () => {
        jest.spyOn(fs, "existsSync").mockReturnValue(true);
        jest.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify({}));
        const consoleLogMock = jest.spyOn(console, "log").mockImplementation();
        await (0, verify_zkp_1.verifyZKP)("/path/to/proof.json", "/path/to/publicSignals.json");
        expect(consoleLogMock).toHaveBeenCalledWith("ZKP verification result: Valid");
        consoleLogMock.mockRestore();
    });
    it("should handle missing files", async () => {
        jest.spyOn(fs, "existsSync").mockReturnValue(false);
        const consoleErrorMock = jest.spyOn(console, "error").mockImplementation();
        await (0, verify_zkp_1.verifyZKP)("/path/to/missingProof.json", "/path/to/missingSignals.json");
        expect(consoleErrorMock).toHaveBeenCalledWith("Proof or public signals file not found.");
        consoleErrorMock.mockRestore();
    });
});
//# sourceMappingURL=verify-zkp.test.js.map