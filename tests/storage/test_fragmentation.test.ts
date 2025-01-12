import { fragmentFile } from "/home/sampriti/Self/iitkgp/KshitijKotaPES/src/storage/fragmentation";

describe("Fragmentation", () => {
  test("should split file into correct fragments", () => {
    const data = Buffer.alloc(5000); // 5KB file
    const fragments = fragmentFile(data, { chunkSize: 1024 });

    expect(fragments.length).toBe(Math.ceil(5000 / 1024));
    expect(fragments[0].length).toBe(1024);
    expect(fragments[fragments.length - 1].length).toBe(5000 % 1024);
  });

  test("should throw an error for invalid input", () => {
    expect(() => fragmentFile(Buffer.from(""), { chunkSize: 1024 })).toThrow(
      "Input buffer is empty"
    );
  });
});
