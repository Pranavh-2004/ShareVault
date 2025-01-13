"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCommitment = generateCommitment;
var web3_1 = require("web3");
var web3 = new web3_1.default();
function generateCommitment(data, randomness) {
    // Convert strings to their numeric representation
    var dataNum = BigInt("0x" + Buffer.from(data).toString("hex"));
    var randomNum = BigInt("0x" + Buffer.from(randomness).toString("hex"));
    // Use web3-based hash method
    return web3.utils.soliditySha3({ t: "uint256", v: dataNum }, { t: "uint256", v: randomNum });
}
