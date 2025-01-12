import { retrieve } from "../../src/cli/commands/retrieve";

describe("retrieve", () => {
  it("should retrieve data for a valid commitment", async () => {
    const consoleLogMock = jest.spyOn(console, "log").mockImplementation();

    await retrieve("commitment1");

    expect(consoleLogMock).toHaveBeenCalledWith("Retrieved Data:", "Some data");
    consoleLogMock.mockRestore();
  });

  it("should handle missing data gracefully", async () => {
    const consoleLogMock = jest.spyOn(console, "log").mockImplementation();

    await retrieve("unknownCommitment");

    expect(consoleLogMock).toHaveBeenCalledWith(
      "Retrieved Data:",
      "Data not found."
    );
    consoleLogMock.mockRestore();
  });
});
