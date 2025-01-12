import { verifyProof } from "../../src/zkp/proofVerification";
import { groth16 } from "snarkjs";
import fs from "fs";
import path from "path";

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
  const vkeyPath = path.join(
    __dirname,
    "../../src/zkp/circom/artifacts/verification_key.json"
  );

  beforeEach(() => {
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockVKey));
    (groth16.verify as jest.Mock).mockResolvedValue(true);
  });

  it("should verify proof successfully", async () => {
    const result = await verifyProof(mockProof, mockPublicSignals);

    expect(fs.readFileSync).toHaveBeenCalledWith(vkeyPath, "utf8");
    expect(groth16.verify).toHaveBeenCalledWith(
      mockVKey,
      mockPublicSignals,
      mockProof
    );
    expect(result).toBe(true);
  });

  it("should return false for invalid proof", async () => {
    (groth16.verify as jest.Mock).mockResolvedValue(false);
    const result = await verifyProof(mockProof, mockPublicSignals);

    expect(result).toBe(false);
  });

  it("should throw an error if verification fails", async () => {
    (groth16.verify as jest.Mock).mockRejectedValue(
      new Error("Verification failed")
    );
    await expect(verifyProof(mockProof, mockPublicSignals)).rejects.toThrow(
      "Verification failed"
    );
  });
});
