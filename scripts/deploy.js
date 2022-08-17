const hre = require("hardhat");


const main = async () => {

    const nftContractFactory = await hre.ethers.getContractFactory('MyNFT')
    const nftContract = await nftContractFactory.deploy()
    await nftContract.deployed()

    console.log('Contract Deployed to: ', nftContract.address)

    // Call the function
    let txn = await nftContract.mintToken()
    // Wait for it to be mined
    await txn.wait()
    console.log("Minted NFT #1")

    // Mint another token for fun
    txn = await nftContract.mintToken()
    // Wait for it to be mined
    await txn.wait()
    console.log("Minted NFT #2")

}

const runMain = async () => {

    try {
        await main()
        process.exit(0)
    } catch(e) {
        console.log(e)
        process.exit(1)
    }

}

runMain()