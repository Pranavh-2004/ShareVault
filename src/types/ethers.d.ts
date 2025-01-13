declare module 'ethers' {
    // Provider types
    export interface Provider {
      getBalance(address: string): Promise<bigint>;
      getTransactionCount(address: string): Promise<number>;
      getCode(address: string): Promise<string>;
      getStorageAt(address: string, position: number): Promise<string>;
      call(transaction: any): Promise<string>;
      estimateGas(transaction: any): Promise<bigint>;
      getBlock(block: number | string): Promise<any>;
      getTransaction(hash: string): Promise<any>;
      getTransactionReceipt(hash: string): Promise<any>;
    }
  
    // Signer types
    export interface Signer {
      getAddress(): Promise<string>;
      signMessage(message: string | Uint8Array): Promise<string>;
      signTransaction(transaction: any): Promise<string>;
      connect(provider: Provider): Signer;
    }
  
    // Contract types
    export class Contract {
      constructor(address: string, abi: any[], signerOrProvider: Signer | Provider);
      connect(signerOrProvider: Signer | Provider): Contract;
      attach(address: string): Contract;
    }
  
    // Wallet types
    export class Wallet implements Signer {
      constructor(privateKey: string, provider?: Provider);
      static createRandom(): Wallet;
      static fromMnemonic(mnemonic: string): Wallet;
      connect(provider: Provider): Wallet;
      getAddress(): Promise<string>;
      signMessage(message: string | Uint8Array): Promise<string>;
      signTransaction(transaction: any): Promise<string>;
    }
  
    // Utility functions
    export function getAddress(address: string): string;
    export function parseEther(value: string): bigint;
    export function formatEther(value: bigint): string;
    export function parseUnits(value: string, decimals: number): bigint;
    export function formatUnits(value: bigint, decimals: number): string;
    export function keccak256(data: string | Uint8Array): string;
  
    // Provider implementations
    export class JsonRpcProvider implements Provider {
      constructor(url?: string);
    }
  
    export class WebSocketProvider implements Provider {
      constructor(url: string);
    }
  }