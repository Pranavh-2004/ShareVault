import Web3 from "web3";

const web3 = new Web3();

export function generateCommitment(
  data: string,
  randomness: string
): string {
  // Convert strings to their numeric representation
  const dataNum = BigInt("0x" + Buffer.from(data).toString("hex"));
  const randomNum = BigInt("0x" + Buffer.from(randomness).toString("hex"));

  // Use web3-based hash method
  return (web3.utils.soliditySha3(
    { t: "uint256", v: dataNum },
    { t: "uint256", v: randomNum }
  ) as string);
}
