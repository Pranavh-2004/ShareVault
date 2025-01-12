// tests/utils/logger.test.ts
import logger from "../../src/utils/logger";

describe("logger", () => {
  it("should log info messages", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    logger.info("Test info message");

    expect(consoleSpy).toHaveBeenCalledWith("info: Test info message");
    consoleSpy.mockRestore();
  });

  it("should log error messages", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    logger.error("Test error message");

    expect(consoleSpy).toHaveBeenCalledWith("error: Test error message");
    consoleSpy.mockRestore();
  });
});
