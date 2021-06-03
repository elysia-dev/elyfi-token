import { BigNumber } from "@ethersproject/bignumber";
import { expect } from "chai";
import { ethers } from "hardhat";

const TOTAL_SUPPLY = '100000000'

describe("ELFI token", function () {
  it('Checks initial configuration', async () => {
    const [deployer] = await ethers.getSigners();
    const ElyfiToken = await ethers.getContractFactory("ElyfiToken");
    const elyfiToken = await ElyfiToken.deploy();

    await elyfiToken.deployed();
    expect(await elyfiToken.name()).to.be.eq('ELFI Token')
    expect(await elyfiToken.symbol()).to.eq('ELFI')

    const totalSupply = await elyfiToken.totalSupply() as BigNumber
    expect(totalSupply.eq(ethers.utils.parseEther(TOTAL_SUPPLY))).to.be.true

    const deployerBalance = await elyfiToken.balanceOf(deployer.address) as BigNumber
    expect(deployerBalance.eq(ethers.utils.parseEther(TOTAL_SUPPLY))).to.be.true
  });
});
