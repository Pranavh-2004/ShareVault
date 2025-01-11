// filepath: /home/grass/projects/hackathon/KshitijKotaPES/test/test.ts
const { artifacts, contract } = require('truffle');

contract('YourContract', (accounts) => {
  it('should deploy the contract', async () => {
    const chai = await import('chai');
    const { expect } = chai;
    const YourContract = artifacts.require('YourContract');
    const instance = await YourContract.deployed();
    expect(instance.address).to.not.be.empty;
  });
});