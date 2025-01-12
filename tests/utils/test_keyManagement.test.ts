// tests/utils/keyManagement.test.ts
import { generateKeyPair } from "../../src/utils/keyManagement";
import * as crypto from "crypto";

jest.mock("crypto", () => ({
  ...jest.requireActual("crypto"),
  generateKeyPairSync: jest.fn(() => ({
    publicKey: {
      export: jest.fn(() => "mocked_public_key"),
    },
    privateKey: {
      export: jest.fn(() => "mocked_private_key"),
    },
  })),
}));

describe("generateKeyPair", () => {
  it("should generate a public and private key pair", () => {
    const keys = generateKeyPair();

    expect(keys.publicKey).toBe("mocked_public_key");
    expect(keys.privateKey).toBe("mocked_private_key");
    expect(crypto.generateKeyPairSync).toHaveBeenCalledWith("rsa", {
      modulusLength: 2048,
    });
  });
});
