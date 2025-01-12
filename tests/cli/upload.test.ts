import { upload } from "../../src/cli/commands/upload";
import * as fs from "fs";
import * as path from "path";

jest.mock("fs");

describe("upload", () => {
  it("should upload a file successfully", async () => {
    const consoleLogMock = jest.spyOn(console, "log").mockImplementation();
    jest.spyOn(fs, "existsSync").mockReturnValue(true);

    await upload("/path/to/file.txt");

    expect(consoleLogMock).toHaveBeenCalledWith(
      "Uploading file: /path/to/file.txt"
    );
    expect(consoleLogMock).toHaveBeenCalledWith(
      "File file.txt successfully uploaded."
    );
    consoleLogMock.mockRestore();
  });

  it("should handle non-existing file", async () => {
    const consoleErrorMock = jest.spyOn(console, "error").mockImplementation();
    jest.spyOn(fs, "existsSync").mockReturnValue(false);

    await upload("/path/to/nonexistent.txt");

    expect(consoleErrorMock).toHaveBeenCalledWith(
      "File does not exist:",
      "/path/to/nonexistent.txt"
    );
    consoleErrorMock.mockRestore();
  });
});
