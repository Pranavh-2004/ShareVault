// tests/utils/hashUtils.test.ts
import { sha256 } from "../../src/utils/hashUtils";

describe("sha256", () => {
  it("should return the correct SHA-256 hash for a given input", () => {
    const data = "hello world";
    const hash = sha256(data);

    expect(hash).toBe(
      "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e"
    );
  });
});
