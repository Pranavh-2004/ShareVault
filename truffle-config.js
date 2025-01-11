const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();

module.exports = {
  test_file_extensions_regexp: /.*\.(test|spec)\.(js|ts)$/,
  networks: {
    polygon: {
      provider: () =>
        new HDWalletProvider(
          process.env.PRIVATE_KEY,
          "https://polygon-rpc.com"
        ),
      network_id: 137, // Polygon Mainnet
      gasPrice: 20000000000, // 20 gwei
    },
    mumbai: {
      provider: () =>
        new HDWalletProvider(
          process.env.PRIVATE_KEY,
          "https://rpc-mumbai.maticvigil.com"
        ),
      network_id: 80001, // Polygon Mumbai Testnet
      gasPrice: 20000000000, // 20 gwei
    },
  },
  compilers: {
    solc: {
      version: "0.8.0", // Solidity version
    },
  },
};
