module.exports = {
    networks: {
      besu: {
        host: "127.0.0.1", // Your Besu node host
        port: 8545,        // Your Besu node RPC port
        network_id: "*",   // Match any network ID
        gas: 4500000,      // Gas limit
        gasPrice: 0        // Gas price (0 for PoA networks like Besu)
      },
    },
    compilers: {
      solc: {
        version: "0.8.20", // Match the version of Solidity used in your contract
      },
    },
  };

  