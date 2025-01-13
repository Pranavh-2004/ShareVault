"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const upload_1 = require("../../src/cli/commands/upload");
const fs = __importStar(require("fs"));
jest.mock("fs");
describe("upload", () => {
    it("should upload a file successfully", async () => {
        const consoleLogMock = jest.spyOn(console, "log").mockImplementation();
        jest.spyOn(fs, "existsSync").mockReturnValue(true);
        await (0, upload_1.upload)("/path/to/file.txt");
        expect(consoleLogMock).toHaveBeenCalledWith("Uploading file: /path/to/file.txt");
        expect(consoleLogMock).toHaveBeenCalledWith("File file.txt successfully uploaded.");
        consoleLogMock.mockRestore();
    });
    it("should handle non-existing file", async () => {
        const consoleErrorMock = jest.spyOn(console, "error").mockImplementation();
        jest.spyOn(fs, "existsSync").mockReturnValue(false);
        await (0, upload_1.upload)("/path/to/nonexistent.txt");
        expect(consoleErrorMock).toHaveBeenCalledWith("File does not exist:", "/path/to/nonexistent.txt");
        consoleErrorMock.mockRestore();
    });
});
//# sourceMappingURL=upload.test.js.map