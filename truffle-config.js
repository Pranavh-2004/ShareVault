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
      gas: 5000000, // Adjust gas limit
      gasPrice: 50000000000, // Adjust gas price to 50 gwei
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
      gas: 5000000, // Adjust gas limit
      gasPrice: 50000000000, // Adjust gas price to 50 gwei
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    polygonAmoy: {
      provider: () =>
        new HDWalletProvider(
          process.env.PRIVATE_KEY,
          "https://rpc-amoy.polygon.technology/"
        ),
      network_id: 80002,
      gas: 5000000, // Adjust gas limit
      gasPrice: 50000000000, // Adjust gas price to 50 gwei
      confirmations: 2,      // # of confirmations to wait between deployments
      timeoutBlocks: 200,    // # of blocks before a deployment times out
      skipDryRun: true       // Skip dry run before migrations
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
    timeout: 1800000  // Increase test timeout to 30 minutes
  }
};