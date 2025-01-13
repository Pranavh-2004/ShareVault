import Web3 from "web3";
import * as contractJSON from "../../build/contracts/YourContract.json"; // Adjust path as needed
import { ContractConfig } from "./types/contract";

/**
 * Creates a JSON-RPC provider using the provided RPC URL.
 * @param rpcUrl - The JSON-RPC URL for the Ethereum node.
 * @returns A Web3 instance.
 */
const createProvider = (rpcUrl: string): Web3 => {
  try {
    return new Web3(new Web3.providers.HttpProvider(rpcUrl));
  } catch (error) {
    console.error("Failed to create provider:", error);
    throw error;
  }
};

/**
 * Creates a wallet signer using a private key and connects it to the specified provider.
 * @param privateKey - The private key for the wallet.
 * @param web3 - The Web3 instance.
 * @returns A Wallet instance connected to the provider.
 */
const createSigner = (privateKey: string, web3: Web3) => {
  try {
    web3.eth.accounts.wallet.add(privateKey);
    return web3.eth.accounts.wallet[0];
  } catch (error) {
    console.error("Failed to create signer:", error);
    throw error;
  }
};

export class ContractManager {
  private web3: Web3;
  private signer: any;
  private contract: any;

  constructor(config: ContractConfig) {
    // Ensure the config object is valid
    if (!config.rpcUrl || !config.privateKey || !config.contractAddress) {
      throw new Error("Contract configuration is incomplete");
    }

    // Initialize provider and signer
    this.web3 = createProvider(config.rpcUrl);
    this.signer = createSigner(config.privateKey, this.web3);

    // Use the compiled contract JSON to initialize the contract
    this.contract = new this.web3.eth.Contract(
      contractJSON.abi, // Use the ABI from the compiled contract JSON
      config.contractAddress
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

      const isValid = await this.contract.methods
        .verifyProof(proof.a, proof.b, proof.c, proof.inputs)
        .call();
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
  async storeCommitment(commitment: string) {
    try {
      if (!commitment) {
        throw new Error("Commitment hash is required");
      }

      const tx = await this.contract.methods.storeCommitment(commitment).send({
        from: this.signer.address,
      });
      return tx;
    } catch (error) {
      console.error("Error storing commitment:", error);
      throw error;
    }
  }
}
