import {generateCommitment} from "/home/grass/projects/hackathon/KshitijKotaPES/src/zkp/generateCommitment";
import {generateProof} from "/home/grass/projects/hackathon/KshitijKotaPES/src/zkp/proofGeneration"
import * as fs from "fs";
export async function generateZKP(data: string, randomness: string) {
  try {
    console.log("Generating ZKP...");
    const dataNum = Number(data);
    const randomnessNum = Number(randomness);
    
    if (isNaN(dataNum) || isNaN(randomnessNum)) {
      throw new Error("Both data and randomness must be valid numbers");
    }
    
    const input = { 
      data: dataNum,
      randomness: randomnessNum
    };
    
    // Add this logging
    console.log("Input being sent to proof generation:", JSON.stringify(input, null, 2));
    
    const proofResult = await generateProof(input);
    const outputPath = "./output/proof.json";
    fs.writeFileSync(outputPath, JSON.stringify(proofResult, null, 2));
    console.log(`Proof generated and saved to: ${outputPath}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error generating ZKP:", error.message);
      console.error("Stack trace:", error.stack);
    } else {
      console.error("Error generating ZKP:", error);
    }
  }
}