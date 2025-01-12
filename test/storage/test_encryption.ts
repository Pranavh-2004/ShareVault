import { EncryptionService } from "../src/storage/encryption";

describe("EncryptionService", () => {
  const encryptionKey = "your-generated-key";
  const service = new EncryptionService(encryptionKey);

  test("should encrypt and decrypt data correctly", async () => {
    const data = Buffer.from("Hello, World!");
    const encryptedData = await service.encrypt(data);
    const decryptedData = service.decrypt(encryptedData);

    expect(decryptedData.toString()).toBe(data.toString());
  });

  test("should throw an error for invalid key", () => {
    expect(() => new EncryptionService("invalid-key")).toThrow(
      "Invalid encryption key"
    );
  });
});
