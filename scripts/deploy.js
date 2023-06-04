//imports
const { verifyMessage } = require("ethers/lib/utils")
const { ethers, run, network } = require("hardhat")

// async function
async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("deploying contract ....")
    const SimpleStorage = await SimpleStorageFactory.deploy()
    await SimpleStorage.deployed()
    console.log(`Deplyed contract on address : ${SimpleStorage.address}`)

    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        await SimpleStorage.deployTransaction.wait(2)
        await verifyContract(SimpleStorage.address, [])
    }
    const currentValue = await SimpleStorage.retrive()
    console.log(`current fav no ${currentValue}`)
    const transcantionResponse = await SimpleStorage.store("61")
    await transcantionResponse.wait(1)
    const updatedValue = await SimpleStorage.retrive()
    console.log(`updated fav no ${updatedValue}`)
}

async function verifyContract(contractAddress, args) {
    console.log("verifying contract ...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArgs: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("contract already verified")
        } else {
            console.log(e)
        }
    }
}

//main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
