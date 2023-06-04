const { ethers } = require("hardhat")
const { expect, assert } = require("chai")
const {
    isCallTrace,
} = require("hardhat/internal/hardhat-network/stack-traces/message-trace")

describe("SimpleStorage", function () {
    let SimpleStorageFactory, SimpleStorage
    beforeEach(async function () {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        SimpleStorage = await SimpleStorageFactory.deploy()
    })

    it("should start with fav number 0", async function () {
        const expectedValue = "0"
        const currentValue = await SimpleStorage.retrive()

        assert.equal(currentValue.toString(), expectedValue)
        // expect(currentValue.toString()).to.equal(expectedValue)
    })
    //it.only can be used to run only that test
    it("should update the fav number", async function () {
        const updatedValue = "7"
        const updateCurrentValue = await SimpleStorage.store(updatedValue)
        await updateCurrentValue.wait(1)
        const currentUpdatedValue = await SimpleStorage.retrive()

        assert.equal(currentUpdatedValue.toString(), updatedValue)
    })
})
