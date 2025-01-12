import logger from "../../src/utils/logger";
import winston from "winston";

describe("logger", () => {
  let mockTransport: any;

  beforeEach(() => {
    // Create a mock transport
    mockTransport = {
      write: jest.fn()
    };

    // Replace the console transport with our mock
    const consoleTransport = logger.transports.find(
      (t: any) => t instanceof winston.transports.Console
    );
    if (consoleTransport) {
      logger.remove(consoleTransport);
    }
    logger.add(mockTransport);
  });

  afterEach(() => {
    // Clean up
    logger.remove(mockTransport);
  });

  it("should log info messages", () => {
    logger.info("Test info message");

    expect(mockTransport.write).toHaveBeenCalledWith(
      expect.stringContaining("Test info message")
    );
  });

  it("should log error messages", () => {
    logger.error("Test error message");

    expect(mockTransport.write).toHaveBeenCalledWith(
      expect.stringContaining("Test error message")
    );
  });
});