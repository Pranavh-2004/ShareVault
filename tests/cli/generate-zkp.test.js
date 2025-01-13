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
const generate_zkp_1 = require("../../src/cli/commands/generate-zkp");
const fs = __importStar(require("fs"));
// Mock dependencies
jest.mock("fs");
jest.mock("../../src/zkp/generateCommitment.ts", () => ({
    generateCommitment: jest.fn(() => "mockCommitment"),
}));
jest.mock("../../src/zkp/proofGeneration.ts", () => ({
    generateProof: jest.fn(async () => ({
        proof: "mockProof",
        publicSignals: [],
    })),
}));
describe("generateZKP", () => {
    it("should generate and save ZKP successfully", async () => {
        const writeFileSyncMock = jest
            .spyOn(fs, "writeFileSync")
            .mockImplementation();
        await (0, generate_zkp_1.generateZKP)("testData", "testRandomness");
        expect(writeFileSyncMock).toHaveBeenCalledWith("./output/proof.json", JSON.stringify({ proof: "mockProof", publicSignals: [] }, null, 2));
        writeFileSyncMock.mockRestore();
    });
    it("should handle errors gracefully", async () => {
        const consoleErrorMock = jest.spyOn(console, "error").mockImplementation();
        jest.spyOn(fs, "writeFileSync").mockImplementation(() => {
            throw new Error("File write error");
        });
        await (0, generate_zkp_1.generateZKP)("testData", "testRandomness");
        expect(consoleErrorMock).toHaveBeenCalledWith("Error generating ZKP:", expect.any(Error));
        consoleErrorMock.mockRestore();
    });
});
//# sourceMappingURL=generate-zkp.test.js.map