const { task } = require("hardhat/config")

task("block-number", "getting network block number").setAction(
    async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Block Number of current chain is ${blockNumber}`)
    }
)
module.exports = {}
