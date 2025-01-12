import { generateZKP } from "../../src/cli/commands/generate-zkp";
import * as fs from "fs";

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

    await generateZKP("testData", "testRandomness");

    expect(writeFileSyncMock).toHaveBeenCalledWith(
      "./output/proof.json",
      JSON.stringify({ proof: "mockProof", publicSignals: [] }, null, 2)
    );
    writeFileSyncMock.mockRestore();
  });

  it("should handle errors gracefully", async () => {
    const consoleErrorMock = jest.spyOn(console, "error").mockImplementation();
    jest.spyOn(fs, "writeFileSync").mockImplementation(() => {
      throw new Error("File write error");
    });

    await generateZKP("testData", "testRandomness");

    expect(consoleErrorMock).toHaveBeenCalledWith(
      "Error generating ZKP:",
      expect.any(Error)
    );
    consoleErrorMock.mockRestore();
  });
});
