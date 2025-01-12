# ShareVault

**"Airbnb for data storage: A decentralized platform for secure, encrypted data sharing using blockchain and zero-knowledge proofs."**

---

## 🚀 Overview

ShareVault is a decentralized data storage platform that allows users to securely share and retrieve data. By leveraging blockchain technology, encryption, and zero-knowledge proofs, ShareVault ensures:

- **Data Privacy**: Files are encrypted and fragmented for secure storage.
- **Data Integrity**: Zero-Knowledge Proofs (ZKPs) verify storage without exposing content.
- **Decentralization**: Data fragments are distributed across peer-to-peer storage nodes.
- **Fair Compensation**: Storage providers earn cryptocurrency for securely hosting data.

---

## 🌟 Features

- **Encrypted Fragmentation**: Files are split into encrypted fragments using erasure coding techniques.
- **Zero-Knowledge Proofs**: Ensure storage without revealing data content.
- **Blockchain Integration**: Payments and metadata storage powered by Ethereum/Polygon.
- **Decentralized Storage**: IPFS/Filecoin for distributed, resilient data storage.
- **Redundancy & Resilience**: Redundant data fragments ensure reliable retrieval.

---

## 🛠️ Technology Stack

- **Frontend**: React.js, Next.js
- **Backend**: Node.js
- **Blockchain**: Ethereum, Polygon, Solidity Smart Contracts
- **Storage Layer**: IPFS/Filecoin
- **Zero-Knowledge Proofs**: zk-SNARKs/zk-STARKs Libraries
- **Data Encoding**: Reed-Solomon Codes

---

## 🧩 How It Works

1. **Data Upload**:
   - Files are uploaded and split into encrypted fragments.
2. **Fragment Distribution**:
   - Fragments are distributed across decentralized storage nodes.
3. **Proof of Storage**:
   - Nodes use ZKPs to prove they securely store fragments.
4. **Data Retrieval**:
   - Users retrieve encrypted fragments, which are reassembled and decrypted.
5. **Payment Mechanism**:
   - Storage providers earn cryptocurrency for their contributions.

---

## ⚙️ Setup

### Prerequisites

- Node.js and npm/pnpm
- Truffle
- Ganache or a testnet (e.g., Polygon Mumbai)
- IPFS/Filecoin Node

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/sharevault.git
   cd sharevault
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Configure the Truffle project:

- Update truffle-config.js with your blockchain network details (e.g., Polygon Mumbai).

4. Deploy the smart contracts:

   ```bash
   truffle migrate --network <network_name>
   ```

5. Start the frontend: (WIP)
   ```bash
   npm run dev
   ```

### 🛡️ Security

ShareVault employs:

- **AES Encryption**: Protects data fragments, ensuring only authorized users can decrypt them.
- **zk-SNARKs**: Validates secure storage without revealing fragment contents.
- **Smart Contracts**: Ensures tamper-proof metadata management and payment processing.

---

### 📈 Future Enhancements

- **Scalability**: Integrate advanced zk-STARKs for improved performance on large datasets.
- **Mobile Support**: Develop cross-platform mobile applications for easier access.
- **Real-Time Monitoring**: Introduce enhanced redundancy and monitoring mechanisms to track data availability.

---

### 💻 Contributors

- [Pranav Hemanth](https://github.com/Pranavh-2004)
- [Pranavjeet Naidu](https://github.com/Pranavjeet-Naidu)
- [Sampriti Saha](https://github.com/Sampriti2803)
- [Kshitij Kota](https://github.com/kshitijkota)

---

### 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
