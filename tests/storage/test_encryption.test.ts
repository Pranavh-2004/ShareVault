import * as dotenv from "dotenv";
import { EncryptionService } from "/home/sampriti/Self/iitkgp/KshitijKotaPES/src/storage/encryption.ts";

// Load environment variables from .env file
dotenv.config();

describe("EncryptionService", () => {
  // Use the encryption key from the environment variables
  const encryptionKey = process.env.ENCRYPTION_KEY;

  // Check if the encryption key is missing in the environment variable
  if (!encryptionKey || encryptionKey.length !== 64) {
    throw new Error("Missing or invalid ENCRYPTION_KEY in environment variables.");
  }

  const service = new EncryptionService();

  test("should encrypt and decrypt data correctly", async () => {
    const data = Buffer.from("Hello, World!");
    const encryptedData = await service.encrypt(data);
    const decryptedData = service.decrypt(encryptedData);

    expect(decryptedData.toString()).toBe(data.toString());
  });

  test("should throw an error for invalid key", () => {
    const originalKey = process.env.ENCRYPTION_KEY; // Save the original key

    // Temporarily set an invalid key for the test
    process.env.ENCRYPTION_KEY = "invalid-key";

    // Expect the EncryptionService constructor to throw an error
    expect(() => new EncryptionService()).toThrow("Invalid encryption key");

    // Reset the original key
    process.env.ENCRYPTION_KEY = originalKey;
  });
});
