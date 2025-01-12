const Web3 = require("web3");
const YourContract = artifacts.require("YourContract");

module.exports = async function (deployer, network, accounts) {
  // Create a new Web3 instance from the deployer’s provider
  const web3Instance = new Web3(deployer.provider);

  const account = accounts[0];
  const nonce = await web3Instance.eth.getTransactionCount(account);

  // Deploy the contract to the specified network with the nonce
  await deployer.deploy(YourContract, { nonce });
};