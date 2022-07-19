const { expect } = require("chai");
const { ethers } = require("hardhat");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe("Snapshot Token contract Deployment", function () {
  let Token;
  let owner;
  let addr1;
  let addr2;
  let addrs;
  let SnapShotToken;

  beforeEach(async function() {
    Token = await ethers.getContractFactory("MyToken");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners() // ethers.getSigners() returns an array with 20 signers (these are fake ones)
    SnapShotToken = await Token.deploy()
  })

  describe("Deployment", async function() {
    it("Should set the right", async() => {
      expect(await SnapShotToken.owner()).to.equal(owner.address);
    })

    it("Should set the Total Supply of tokens to the owner", async() => {
      expect(await SnapShotToken.balanceOf(owner.address)).to.equal(10000000000000000000000n)
    })
  })

  describe("Transaction", async() => {
    it("Should be able to transfer tokens between accounts", async function(){
      await SnapShotToken.transfer(addr1.address, 100)
      expect(await SnapShotToken.balanceOf(addr1.address)).to.equal(100)

      await SnapShotToken.connect(addr1).transfer(addr2.address, 50)
      expect(await SnapShotToken.balanceOf(addr2.address)).to.equal(50)
      expect(await SnapShotToken.balanceOf(addr1.address)).to.equal(50)
    })

  })
});
