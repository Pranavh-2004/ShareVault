import Web3 from "web3";
import * as dotenv from "dotenv";
dotenv.config();

// Load environment variables from .env file
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.POLYGON_RPC_URL || ""));
web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY || "");
const signer = web3.eth.accounts.wallet[0];

export const getContract = (contractAddress: string, abi: any) => {
  return new web3.eth.Contract(abi, contractAddress);
};

export const getBalance = async (address: string): Promise<string> => {
  const balance = await web3.eth.getBalance(address);
  return web3.utils.fromWei(balance, "ether");
};

export const sendTransaction = async (to: string, amount: string) => {
  const tx = await web3.eth.sendTransaction({
    from: signer.address,
    to: to,
    value: web3.utils.toWei(amount, "ether"),
  });
  return tx;
};
