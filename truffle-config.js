const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();

module.exports = {
  test_file_extensions_regexp: /.*\.(test|spec)\.(js|ts)$/,
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,  // Default Ganache UI port
      network_id: "*"
    },
    polygon: {
      provider: () =>
        new HDWalletProvider(
          process.env.PRIVATE_KEY,
          "https://polygon-rpc.com"
        ),
      network_id: 137,
      gasPrice: 20000000000, // 20 gwei
      confirmations: 2,      // # of confirmations to wait between deployments
      timeoutBlocks: 200,    // # of blocks before a deployment times out
      skipDryRun: true       // Skip dry run before migrations
    },
    mumbai: {
      provider: () =>
        new HDWalletProvider(
          process.env.PRIVATE_KEY,
          "https://rpc-mumbai.maticvigil.com"
        ),
      network_id: 80001,
      gasPrice: 20000000000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: "0.8.0",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  },
  mocha: {
    timeout: 100000  // Increase test timeout if needed
  }
};

