import { generateCommitment, generateProof } from "../../zkp-utils";
import fs from "fs";

export async function generateZKP(data: string, randomness: string) {
  try {
    console.log("Generating ZKP...");
    const commitment = generateCommitment(data, randomness);
    const input = { data, randomness, commitment: commitment.toString() };

    const proofResult = await generateProof(input);

    const outputPath = "./output/proof.json";
    fs.writeFileSync(outputPath, JSON.stringify(proofResult, null, 2));
    console.log(`Proof generated and saved to: ${outputPath}`);
  } catch (error) {
    console.error("Error generating ZKP:", error);
  }
}
