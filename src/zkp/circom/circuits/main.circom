pragma circom 2.2.1;

include "node_modules/circomlib/circuits/pedersen.circom";

// Template for Pedersen Hash
template PedersenHash() {
    // Define two input signals (data and randomness)
    signal input data;
    signal input randomness;
    
    // Output signal for the commitment
    signal output commitment;

    // Instantiate the Pedersen hash component
    component pedersen = Pedersen(2);

    // Connect inputs to the Pedersen hash component
    pedersen.in[0] <== data;
    pedersen.in[1] <== randomness;

    // Set the output to the Pedersen hash result
    commitment <== pedersen.out;
}

// Instantiate the main circuit
component main = PedersenHash();
