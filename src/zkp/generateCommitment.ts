import { pedersenHash } from '@iden3/js-crypto';
import { BigNumber } from 'ethers';

export function generateCommitment(data: string, randomness: string): BigNumber {
  const dataHash = BigNumber.from(pedersenHash(Buffer.from(data)));
  const randomHash = BigNumber.from(pedersenHash(Buffer.from(randomness)));
  
  // Commitment = dataHash + randomHash
  return dataHash.add(randomHash);
}
