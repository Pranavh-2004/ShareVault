import { verifyZKP } from "../../src/cli/commands/verify-zkp";
import * as fs from "fs";

jest.mock("fs");
jest.mock("../../src/zkp/proofVerification.ts", () => ({
  verifyProof: jest.fn(async () => true),
}));

describe("verifyZKP", () => {
  it("should verify ZKP successfully", async () => {
    jest.spyOn(fs, "existsSync").mockReturnValue(true);
    jest.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify({}));

    const consoleLogMock = jest.spyOn(console, "log").mockImplementation();

    await verifyZKP("/path/to/proof.json", "/path/to/publicSignals.json");

    expect(consoleLogMock).toHaveBeenCalledWith(
      "ZKP verification result: Valid"
    );
    consoleLogMock.mockRestore();
  });

  it("should handle missing files", async () => {
    jest.spyOn(fs, "existsSync").mockReturnValue(false);

    const consoleErrorMock = jest.spyOn(console, "error").mockImplementation();

    await verifyZKP(
      "/path/to/missingProof.json",
      "/path/to/missingSignals.json"
    );

    expect(consoleErrorMock).toHaveBeenCalledWith(
      "Proof or public signals file not found."
    );
    consoleErrorMock.mockRestore();
  });
});
