import { JsonRpcProvider, Wallet } from "ethers";

/**
 * Creates a JSON-RPC provider for the Polygon network.
 * @param rpcUrl - The Polygon RPC URL.
 * @returns A JsonRpcProvider instance.
 */
export const createPolygonProvider = (rpcUrl: string): JsonRpcProvider => {
  return new JsonRpcProvider(rpcUrl);
};

/**
 * Creates a signer wallet for transactions.
 * @param privateKey - The private key of the wallet.
 * @param provider - The JSON-RPC provider.
 * @returns A Wallet instance connected to the provider.
 */
export const createPolygonWallet = (
  privateKey: string,
  provider: JsonRpcProvider
): Wallet => {
  return new Wallet(privateKey, provider);
};
