"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../src/utils/logger"));
const winston_1 = __importDefault(require("winston"));
describe("logger", () => {
    let mockTransport;
    beforeEach(() => {
        // Create a mock transport
        mockTransport = {
            write: jest.fn()
        };
        // Replace the console transport with our mock
        const consoleTransport = logger_1.default.transports.find((t) => t instanceof winston_1.default.transports.Console);
        if (consoleTransport) {
            logger_1.default.remove(consoleTransport);
        }
        logger_1.default.add(mockTransport);
    });
    afterEach(() => {
        // Clean up
        logger_1.default.remove(mockTransport);
    });
    it("should log info messages", () => {
        logger_1.default.info("Test info message");
        expect(mockTransport.write).toHaveBeenCalledWith(expect.stringContaining("Test info message"));
    });
    it("should log error messages", () => {
        logger_1.default.error("Test error message");
        expect(mockTransport.write).toHaveBeenCalledWith(expect.stringContaining("Test error message"));
    });
});
//# sourceMappingURL=test_logger.test.js.map