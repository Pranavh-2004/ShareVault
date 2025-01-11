// src/storage/encryption.ts
import * as crypto from 'crypto';
import { promisify } from 'util';

const randomBytes = promisify(crypto.randomBytes);

export class EncryptionService {
  private readonly keyBuffer: Buffer;

  constructor(encryptionKey: string) {
    if (!encryptionKey || encryptionKey === 'your-encryption-key-here') {
      throw new Error('Invalid encryption key. Please provide a secure key.');
    }
    this.keyBuffer = Buffer.from(encryptionKey, 'hex');
  }

  async encrypt(data: Buffer): Promise<Buffer> {
    const iv = await randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', this.keyBuffer, iv);
    const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
    return Buffer.concat([iv, encrypted]);
  }

  decrypt(encryptedData: Buffer): Buffer {
    const iv = encryptedData.slice(0, 16);
    const data = encryptedData.slice(16);
    const decipher = crypto.createDecipheriv('aes-256-cbc', this.keyBuffer, iv);
    return Buffer.concat([decipher.update(data), decipher.final()]);
  }
}