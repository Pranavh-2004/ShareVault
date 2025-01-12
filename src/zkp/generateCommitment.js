"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCommitment = generateCommitment;
var js_crypto_1 = require("@iden3/js-crypto");
function generateCommitment(data, randomness) {
    // Convert strings to their numeric representation
    var dataNum = BigInt("0x" + Buffer.from(data).toString("hex"));
    var randomNum = BigInt("0x" + Buffer.from(randomness).toString("hex"));
    // Use static hash method
    return js_crypto_1.poseidon.hash([dataNum, randomNum]);
}
