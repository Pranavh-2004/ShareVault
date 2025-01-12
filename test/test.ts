const { artifacts, contract } = require('truffle');

contract('YourContract', (accounts) => {
  it('should deploy the contract', async () => {
    const chai = await import('chai');
    const { expect } = chai;
    const YourContract = artifacts.require('YourContract');
    const instance = await YourContract.deployed();
    expect(instance.address).to.not.be.empty;
  });

  it('should set the message', async () => {
    const chai = await import('chai');
    const { expect } = chai;
    const YourContract = artifacts.require('YourContract');
    const instance = await YourContract.deployed();
    await instance.setMessage("Hello, World!", { from: accounts[0] });
    const message = await instance.message();
    expect(message).to.equal("Hello, World!");
  });
});