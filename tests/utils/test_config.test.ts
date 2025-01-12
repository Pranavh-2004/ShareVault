// tests/utils/config.test.ts
import { CONFIG } from "../../src/utils/config";

describe("CONFIG", () => {
  it("should load environment variables correctly", () => {
    process.env.ENCRYPTION_KEY = "test_encryption_key";
    process.env.POLYGON_RPC_URL = "https://polygon.rpc.url";

    expect(CONFIG.ENCRYPTION_KEY).toBe("test_encryption_key");
    expect(CONFIG.POLYGON_RPC_URL).toBe("https://polygon.rpc.url");
  });

  it("should use defaults if environment variables are not set", () => {
    delete process.env.ENCRYPTION_KEY;
    delete process.env.POLYGON_RPC_URL;

    expect(CONFIG.ENCRYPTION_KEY).toBe("");
    expect(CONFIG.POLYGON_RPC_URL).toBe("");
  });
});
