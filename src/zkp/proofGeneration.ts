import { groth16 } from 'snarkjs';
import fs from 'fs';
import path from 'path';

const CIRCUIT_DIR = path.join(__dirname, 'circom', 'artifacts');

export async function generateProof(input: any) {
  const wasmPath = path.join(CIRCUIT_DIR, 'main.wasm');
  const zkeyPath = path.join(CIRCUIT_DIR, 'main_final.zkey');

  const { proof, publicSignals } = await groth16.fullProve(input, wasmPath, zkeyPath);
  
  return { proof, publicSignals };
}
