// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract YourContract {
    // Structure to store a ZKP and its metadata
    struct ZKP {
        string proof; // The zero-knowledge proof (e.g., in JSON format)
        string metadata; // Metadata for the proof (e.g., circuit name, timestamp, etc.)
        address owner; // The address of the user who submitted the proof
    }

    // Mapping to store ZKPs by an ID
    mapping(uint256 => ZKP) private zkpStore;

    // Counter for ZKP IDs
    uint256 private zkpCounter;

    // Event to emit when a ZKP is added
    event ZKPAdded(uint256 zkpId, address indexed owner, string metadata);

    constructor() {
        zkpCounter = 0; // Initialize the counter
    }

    /**
     * @dev Adds a new ZKP to the contract
     * @param proof The zero-knowledge proof
     * @param metadata The metadata associated with the proof
     * @return The ID of the newly added ZKP
     */
    function addZKP(string memory proof, string memory metadata) public returns (uint256) {
        zkpCounter += 1; // Increment the counter for the new ZKP

        // Store the ZKP
        zkpStore[zkpCounter] = ZKP({
            proof: proof,
            metadata: metadata,
            owner: msg.sender
        });

        // Emit an event for the new ZKP
        emit ZKPAdded(zkpCounter, msg.sender, metadata);

        return zkpCounter; // Return the ID of the new ZKP
    }

    /**
     * @dev Retrieves a ZKP by its ID
     * @param zkpId The ID of the ZKP
     * @return The zero-knowledge proof, metadata, and owner
     */
    function getZKP(uint256 zkpId) public view returns (string memory, string memory, address) {
        require(zkpId > 0 && zkpId <= zkpCounter, "ZKP ID does not exist");
        ZKP memory zkp = zkpStore[zkpId];
        return (zkp.proof, zkp.metadata, zkp.owner);
    }

    /**
     * @dev Returns the total number of ZKPs stored
     * @return The count of ZKPs
     */
    function getZKPCount() public view returns (uint256) {
        return zkpCounter;
    }
}