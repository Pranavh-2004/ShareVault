"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fragmentation_1 = require("/home/sampriti/Self/iitkgp/KshitijKotaPES/src/storage/fragmentation");
describe("Fragmentation", () => {
    test("should split file into correct fragments", () => {
        const data = Buffer.alloc(5000); // 5KB file
        const fragments = (0, fragmentation_1.fragmentFile)(data, { chunkSize: 1024 });
        expect(fragments.length).toBe(Math.ceil(5000 / 1024));
        expect(fragments[0].length).toBe(1024);
        expect(fragments[fragments.length - 1].length).toBe(5000 % 1024);
    });
    test("should throw an error for invalid input", () => {
        expect(() => (0, fragmentation_1.fragmentFile)(Buffer.from(""), { chunkSize: 1024 })).toThrow("Input buffer is empty");
    });
});
//# sourceMappingURL=test_fragmentation.test.js.map