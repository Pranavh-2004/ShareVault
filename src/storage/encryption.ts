import * as crypto from 'crypto';
import { promisify } from 'util';
import dotenv from "dotenv";

dotenv.config();

const randomBytes = promisify(crypto.randomBytes);

// Load encryption key from environment variables
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 64) {
  throw new Error(
    "Invalid or missing ENCRYPTION_KEY in environment variables. Please provide a 256-bit key (64 hexadecimal characters)."
  );
}

export class EncryptionService {
  private readonly keyBuffer: Buffer;

  constructor() {
    // Ensure the encryption key is valid when instantiating the service
    if (!process.env.ENCRYPTION_KEY || process.env.ENCRYPTION_KEY.length !== 64) {
      throw new Error('Invalid encryption key.');
    }

    // Convert the encryption key from hex to a Buffer
    this.keyBuffer = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');
  }

  async encrypt(data: Buffer): Promise<Buffer> {
    const iv = await randomBytes(16); // Generate a random initialization vector
    const cipher = crypto.createCipheriv('aes-256-cbc', this.keyBuffer, iv);
    const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
    return Buffer.concat([iv, encrypted]); // Prepend the IV to the encrypted data
  }

  decrypt(encryptedData: Buffer): Buffer {
    const iv = encryptedData.slice(0, 16); // Extract the initialization vector
    const data = encryptedData.slice(16); // Extract the encrypted data
    const decipher = crypto.createDecipheriv('aes-256-cbc', this.keyBuffer, iv);
    return Buffer.concat([decipher.update(data), decipher.final()]);
  }
}
