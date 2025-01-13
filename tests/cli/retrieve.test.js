"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const retrieve_1 = require("../../src/cli/commands/retrieve");
describe("retrieve", () => {
    it("should retrieve data for a valid commitment", async () => {
        const consoleLogMock = jest.spyOn(console, "log").mockImplementation();
        await (0, retrieve_1.retrieve)("commitment1");
        expect(consoleLogMock).toHaveBeenCalledWith("Retrieved Data:", "Some data");
        consoleLogMock.mockRestore();
    });
    it("should handle missing data gracefully", async () => {
        const consoleLogMock = jest.spyOn(console, "log").mockImplementation();
        await (0, retrieve_1.retrieve)("unknownCommitment");
        expect(consoleLogMock).toHaveBeenCalledWith("Retrieved Data:", "Data not found.");
        consoleLogMock.mockRestore();
    });
});
//# sourceMappingURL=retrieve.test.js.map