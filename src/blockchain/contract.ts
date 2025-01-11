import { ethers, Contract, Wallet, JsonRpcProvider } from "ethers";
// Import the compiled contract ABI directly from the build folder
import * as contractJSON from "../../build/contracts/YourContract.json"; // Adjust path as needed
import { ContractConfig } from "./types/contract";

/**
 * Creates a JSON-RPC provider using the provided RPC URL.
 * @param rpcUrl - The JSON-RPC URL for the Ethereum node.
 * @returns A JsonRpcProvider instance.
 */
const createProvider = (rpcUrl: string): JsonRpcProvider => {
  try {
    return new ethers.JsonRpcProvider(rpcUrl);
  } catch (error) {
    console.error("Failed to create provider:", error);
    throw error;
  }
};

/**
 * Creates a wallet signer using a private key and connects it to the specified provider.
 * @param privateKey - The private key for the wallet.
 * @param provider - The JsonRpcProvider instance.
 * @returns A Wallet instance connected to the provider.
 */
const createSigner = (
  privateKey: string,
  provider: JsonRpcProvider
): Wallet => {
  try {
    return new ethers.Wallet(privateKey, provider);
  } catch (error) {
    console.error("Failed to create signer:", error);
    throw error;
  }
};

export class ContractManager {
  private provider: JsonRpcProvider;
  private signer: Wallet;
  private contract: Contract;

  constructor(config: ContractConfig) {
    // Ensure the config object is valid
    if (!config.rpcUrl || !config.privateKey || !config.contractAddress) {
      throw new Error("Contract configuration is incomplete");
    }

    // Initialize provider and signer
    this.provider = createProvider(config.rpcUrl);
    this.signer = createSigner(config.privateKey, this.provider);

    // Use the compiled contract JSON to initialize the contract
    this.contract = new ethers.Contract(
      config.contractAddress,
      contractJSON.abi, // Use the ABI from the compiled contract JSON
      this.signer
    );
  }

  /**
   * Verifies a ZKP (Zero-Knowledge Proof) on the blockchain.
   * @param proof - The proof object containing 'a', 'b', 'c', and 'inputs'.
   * @returns A promise resolving to true if the proof is valid, false otherwise.
   */
  async verifyProof(proof: {
    a: string;
    b: string[];
    c: string;
    inputs: string[];
  }): Promise<boolean> {
    try {
      if (!proof || !proof.a || !proof.b || !proof.c || !proof.inputs) {
        throw new Error("Invalid proof format");
      }

      const isValid = await this.contract.verifyProof(
        proof.a,
        proof.b,
        proof.c,
        proof.inputs
      );
      return isValid;
    } catch (error) {
      console.error("Error verifying proof:", error);
      throw error;
    }
  }

  /**
   * Stores a commitment hash on the blockchain.
   * @param commitment - The hash commitment string to be stored.
   * @returns A promise resolving to the transaction receipt.
   */
  async storeCommitment(
    commitment: string
  ): Promise<ethers.TransactionReceipt> {
    try {
      if (!commitment) {
        throw new Error("Commitment hash is required");
      }

      const tx = await this.contract.storeCommitment(commitment);
      const receipt = await tx.wait(); // Wait for transaction confirmation
      return receipt;
    } catch (error) {
      console.error("Error storing commitment:", error);
      throw error;
    }
  }
}
