import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

// Load environment variables from .env file
const provider = new ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL);

const signer = new ethers.Wallet(process.env.PRIVATE_KEY || "", provider);

export const getContract = (contractAddress: string, abi: any) => {
  return new ethers.Contract(contractAddress, abi, signer);
};

export const getBalance = async (address: string): Promise<string> => {
  const balance = await provider.getBalance(address);
  return ethers.formatEther(balance); // Updated
};

export const sendTransaction = async (to: string, amount: string) => {
  const tx = {
    to: to,
    value: ethers.parseEther(amount), // Updated
  };

  const transaction = await signer.sendTransaction(tx);
  return transaction;
};
