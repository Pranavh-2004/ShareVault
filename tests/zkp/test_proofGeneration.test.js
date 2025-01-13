"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const proofGeneration_1 = require("../../src/zkp/proofGeneration");
const snarkjs_1 = require("snarkjs");
const path_1 = __importDefault(require("path"));
jest.mock("snarkjs", () => ({
    groth16: {
        fullProve: jest.fn(),
    },
}));
describe("generateProof", () => {
    const mockInput = { a: 1, b: 2 };
    const mockProof = { proof: "mockProof" };
    const mockPublicSignals = ["mockSignal"];
    const wasmPath = path_1.default.join(__dirname, "../../src/zkp/circom/artifacts/main.wasm");
    const zkeyPath = path_1.default.join(__dirname, "../../src/zkp/circom/artifacts/main_final.zkey");
    beforeEach(() => {
        snarkjs_1.groth16.fullProve.mockResolvedValue({
            proof: mockProof,
            publicSignals: mockPublicSignals,
        });
    });
    it("should generate proof and public signals", async () => {
        const { proof, publicSignals } = await (0, proofGeneration_1.generateProof)(mockInput);
        expect(snarkjs_1.groth16.fullProve).toHaveBeenCalledWith(mockInput, wasmPath, zkeyPath);
        expect(proof).toEqual(mockProof);
        expect(publicSignals).toEqual(mockPublicSignals);
    });
    it("should handle errors gracefully", async () => {
        snarkjs_1.groth16.fullProve.mockRejectedValue(new Error("Test Error"));
        await expect((0, proofGeneration_1.generateProof)(mockInput)).rejects.toThrow("Test Error");
    });
});
//# sourceMappingURL=test_proofGeneration.test.js.map