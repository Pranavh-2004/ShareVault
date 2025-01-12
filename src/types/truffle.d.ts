// filepath: /home/grass/projects/hackathon/KshitijKotaPES/src/types/truffle.d.ts
declare module 'truffle' {
    import { Contract, ContractInstance } from 'web3-eth-contract';
  
    export const artifacts: {
      require: (name: string) => Contract;
    };
  
    export const contract: {
      (name: string, tests: (accounts: string[]) => void): void;
    };
  }