// tests/utils/hashUtils.test.ts
import { sha256 } from "../../src/utils/hashUtils";

describe("sha256", () => {
  it("should return the correct SHA-256 hash for a given input", () => {
    const data = "hello world";
    const hash = sha256(data);

    expect(hash).toBe(
      "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9"
    );
  });
});
