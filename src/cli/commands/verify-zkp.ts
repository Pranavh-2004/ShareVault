import { verifyProof } from "../../zkp-utils";
import fs from "fs";

export async function verifyZKP(
  proofFilePath: string,
  publicSignalsPath: string
) {
  try {
    console.log("Verifying ZKP...");

    if (!fs.existsSync(proofFilePath) || !fs.existsSync(publicSignalsPath)) {
      console.error("Proof or public signals file not found.");
      return;
    }

    const proof = JSON.parse(fs.readFileSync(proofFilePath, "utf8"));
    const publicSignals = JSON.parse(
      fs.readFileSync(publicSignalsPath, "utf8")
    );

    const isValid = await verifyProof(proof, publicSignals);
    console.log(`ZKP verification result: ${isValid ? "Valid" : "Invalid"}`);
  } catch (error) {
    console.error("Error verifying ZKP:", error);
  }
}
