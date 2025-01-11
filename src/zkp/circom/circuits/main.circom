pragma circom 2.0.0;

template PedersenHash(n) {
  signal input in[n];
  signal output out;
  
  component pedersen = Pedersen(n);
  
  for (var i = 0; i < n; i++) {
    pedersen.in[i] <== in[i];
  }
  
  out <== pedersen.out;
}

component main = PedersenHash(2);
