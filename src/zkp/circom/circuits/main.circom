pragma circom 2.2.1;

include "/home/sampriti/Self/iitkgp/KshitijKotaPES/node_modules/circomlib/circuits/poseidon.circom";

template PoseidonHash() {
    signal input data;
    signal input randomness;
    signal output commitment;
    
    // Instantiate Poseidon Hash component
    component poseidon = Poseidon(2);
    
    // Connect inputs to Poseidon hash component
    poseidon.inputs[0] <== data;
    poseidon.inputs[1] <== randomness;
    
    // Set output
    commitment <== poseidon.out;
}

component main = PoseidonHash();