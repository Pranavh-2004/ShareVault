declare module "polygon" {
  import { Contract } from "ethers";

  export interface PolygonClient {
    getContract(address: string, abi: any): Contract;
    getBalance(address: string): Promise<string>;
    sendTransaction(to: string, amount: string): Promise<any>;
  }

  export const Polygon: PolygonClient;
}
