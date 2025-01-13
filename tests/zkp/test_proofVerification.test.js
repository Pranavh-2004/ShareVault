"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const proofVerification_1 = require("../../src/zkp/proofVerification");
const snarkjs_1 = require("snarkjs");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
jest.mock("snarkjs", () => ({
    groth16: {
        verify: jest.fn(),
    },
}));
jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));
describe("verifyProof", () => {
    const mockProof = { mock: "proof" };
    const mockPublicSignals = ["mockSignal"];
    const mockVKey = { mock: "verificationKey" };
    const vkeyPath = path_1.default.join(__dirname, "../../src/zkp/circom/artifacts/verification_key.json");
    beforeEach(() => {
        fs_1.default.readFileSync.mockReturnValue(JSON.stringify(mockVKey));
        snarkjs_1.groth16.verify.mockResolvedValue(true);
    });
    it("should verify proof successfully", async () => {
        const result = await (0, proofVerification_1.verifyProof)(mockProof, mockPublicSignals);
        expect(fs_1.default.readFileSync).toHaveBeenCalledWith(vkeyPath, "utf8");
        expect(snarkjs_1.groth16.verify).toHaveBeenCalledWith(mockVKey, mockPublicSignals, mockProof);
        expect(result).toBe(true);
    });
    it("should return false for invalid proof", async () => {
        snarkjs_1.groth16.verify.mockResolvedValue(false);
        const result = await (0, proofVerification_1.verifyProof)(mockProof, mockPublicSignals);
        expect(result).toBe(false);
    });
    it("should throw an error if verification fails", async () => {
        snarkjs_1.groth16.verify.mockRejectedValue(new Error("Verification failed"));
        await expect((0, proofVerification_1.verifyProof)(mockProof, mockPublicSignals)).rejects.toThrow("Verification failed");
    });
});
//# sourceMappingURL=test_proofVerification.test.js.map