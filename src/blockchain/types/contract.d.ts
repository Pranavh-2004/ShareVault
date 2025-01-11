// types/contract.ts

export interface ContractConfig {
  rpcUrl: string; // The RPC URL of the Ethereum-like network
  privateKey: string; // The private key of the wallet to interact with the contract
  contractAddress: string; // The address of the smart contract
}
