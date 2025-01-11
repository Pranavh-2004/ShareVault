const YourContract = artifacts.require("YourContract");

module.exports = async function (deployer) {
  // Deploy the contract to the specified network
  await deployer.deploy(YourContract);
};
