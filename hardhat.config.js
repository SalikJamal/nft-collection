require('@nomicfoundation/hardhat-toolbox')
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config({ path: ".env" })

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    rinkeby: {
      url: process.env.QUICKNODE_API_KEY_URL,
      accounts: [process.env.RINKEBY_PRIVATE_KEY],
      chainId: 4
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  solidity: "0.8.9",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}