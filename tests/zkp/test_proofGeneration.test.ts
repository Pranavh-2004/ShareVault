import { generateProof } from "../../src/zkp/proofGeneration";
import { groth16 } from "snarkjs";
import path from "path";

jest.mock("snarkjs", () => ({
  groth16: {
    fullProve: jest.fn(),
  },
}));

describe("generateProof", () => {
  const mockInput = { a: 1, b: 2 };
  const mockProof = { proof: "mockProof" };
  const mockPublicSignals = ["mockSignal"];

  const wasmPath = path.join(
    __dirname,
    "../../src/zkp/circom/artifacts/main.wasm"
  );
  const zkeyPath = path.join(
    __dirname,
    "../../src/zkp/circom/artifacts/main_final.zkey"
  );

  beforeEach(() => {
    (groth16.fullProve as jest.Mock).mockResolvedValue({
      proof: mockProof,
      publicSignals: mockPublicSignals,
    });
  });

  it("should generate proof and public signals", async () => {
    const { proof, publicSignals } = await generateProof(mockInput);

    expect(groth16.fullProve).toHaveBeenCalledWith(
      mockInput,
      wasmPath,
      zkeyPath
    );
    expect(proof).toEqual(mockProof);
    expect(publicSignals).toEqual(mockPublicSignals);
  });

  it("should handle errors gracefully", async () => {
    (groth16.fullProve as jest.Mock).mockRejectedValue(new Error("Test Error"));
    await expect(generateProof(mockInput)).rejects.toThrow("Test Error");
  });
});
