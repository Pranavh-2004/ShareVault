import { poseidon } from "@iden3/js-crypto";
import { BigNumberish } from "ethers";

export function generateCommitment(
  data: string,
  randomness: string
): BigNumberish {
  // Convert strings to their numeric representation
  const dataNum = BigInt("0x" + Buffer.from(data).toString("hex"));
  const randomNum = BigInt("0x" + Buffer.from(randomness).toString("hex"));

  // Use static hash method
  return poseidon.hash([dataNum, randomNum]);
}
