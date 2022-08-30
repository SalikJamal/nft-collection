require('@nomicfoundation/hardhat-toolbox')
require("dotenv").config({ path: ".env" })

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    rinkeby: {
      url: process.env.QUICKNODE_API_KEY_URL,
      accounts: [process.env.RINKEBY_PRIVATE_KEY]
    }
  },
  solidity: "0.8.9",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}