"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateCommitment_1 = require("../../src/zkp/generateCommitment");
const js_crypto_1 = require("@iden3/js-crypto");
jest.mock("@iden3/js-crypto", () => ({
    poseidon: {
        hash: jest.fn(),
    },
}));
describe("generateCommitment", () => {
    it("should correctly generate a commitment", () => {
        const mockHash = BigInt("123456789");
        js_crypto_1.poseidon.hash.mockReturnValue(mockHash);
        const data = "testData";
        const randomness = "randomValue";
        const expectedDataNum = BigInt("0x" + Buffer.from(data).toString("hex"));
        const expectedRandomNum = BigInt("0x" + Buffer.from(randomness).toString("hex"));
        const result = (0, generateCommitment_1.generateCommitment)(data, randomness);
        expect(js_crypto_1.poseidon.hash).toHaveBeenCalledWith([
            expectedDataNum,
            expectedRandomNum,
        ]);
        expect(result).toBe(mockHash);
    });
    it("should throw an error for invalid input", () => {
        expect(() => (0, generateCommitment_1.generateCommitment)("", "randomValue")).toThrow();
        expect(() => (0, generateCommitment_1.generateCommitment)("testData", "")).toThrow();
    });
});
//# sourceMappingURL=test_generateCommitment.test.js.map