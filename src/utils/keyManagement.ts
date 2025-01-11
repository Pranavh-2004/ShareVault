// src/utils/keyManagement.ts
import * as crypto from 'crypto';

export const generateKeyPair = (): { publicKey: string, privateKey: string } => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
  });
  return {
    publicKey: publicKey.export({ type: 'pkcs1', format: 'pem' }).toString(),
    privateKey: privateKey.export({ type: 'pkcs1', format: 'pem' }).toString(),
  };
};
