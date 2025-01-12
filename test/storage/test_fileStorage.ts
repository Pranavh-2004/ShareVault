import * as fs from "fs/promises";
import { FileStore } from "../src/storage/fileStorage";

describe("FileStore", () => {
  const fileStore = new FileStore(".test-storage");

  beforeAll(async () => {
    await fileStore.initialize();
  });

  afterAll(async () => {
    await fs.rm(".test-storage", { recursive: true, force: true });
  });

  test("should save and retrieve fragments correctly", async () => {
    const fragment = {
      id: "test-file-id",
      data: Buffer.from("fragment-data"),
      index: 0,
      totalFragments: 1,
      originalFileName: "test.txt",
      timestamp: Date.now(),
    };

    await fileStore.saveFragment(fragment.id, fragment);

    const retrieved = await fileStore.getFragment(fragment.id, fragment.index);

    expect(retrieved.data.toString()).toBe(fragment.data.toString());
    expect(retrieved.originalFileName).toBe(fragment.originalFileName);
  });
});
