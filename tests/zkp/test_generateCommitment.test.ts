import { generateCommitment } from "../../src/zkp/generateCommitment";
import { poseidon } from "@iden3/js-crypto";

jest.mock("@iden3/js-crypto", () => ({
  poseidon: {
    hash: jest.fn(),
  },
}));

describe("generateCommitment", () => {
  it("should correctly generate a commitment", () => {
    const mockHash = BigInt("123456789");
    (poseidon.hash as jest.Mock).mockReturnValue(mockHash);

    const data = "testData";
    const randomness = "randomValue";

    const expectedDataNum = BigInt("0x" + Buffer.from(data).toString("hex"));
    const expectedRandomNum = BigInt(
      "0x" + Buffer.from(randomness).toString("hex")
    );

    const result = generateCommitment(data, randomness);

    expect(poseidon.hash).toHaveBeenCalledWith([
      expectedDataNum,
      expectedRandomNum,
    ]);
    expect(result).toBe(mockHash);
  });

  it("should throw an error for invalid input", () => {
    expect(() => generateCommitment("", "randomValue")).toThrow();
    expect(() => generateCommitment("testData", "")).toThrow();
  });
});
