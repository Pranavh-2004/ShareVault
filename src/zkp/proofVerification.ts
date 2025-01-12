import { groth16 } from "snarkjs";
import * as fs from "fs";
import * as path from "path";

export async function verifyProof(
  proof: any,
  publicSignals: any
): Promise<boolean> {
  const vkeyPath = path.join(
    __dirname,
    "circom",
    "artifacts",
    "verification_key.json"
  );
  const vkey = JSON.parse(fs.readFileSync(vkeyPath, "utf8"));

  return await groth16.verify(vkey, publicSignals, proof);
}
