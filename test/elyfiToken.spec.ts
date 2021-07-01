import { BigNumber } from "ethers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { ElyfiToken} from '../typechain'
import { access } from "fs";

const TOTAL_SUPPLY = '100000000'

describe("ELFI token", function () {
  context('Deployed', async () => {
    it('Checks initial configuration', async () => {
      const [deployer, account] = await ethers.getSigners();
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
  })

  context('Init migration', async () => {
    let elyfiToken: ElyfiToken
    let newElyfiToken: ElyfiToken
    const [deployer, account] = await ethers.getSigners();
    beforeEach('Deploy Elyfi token', async () => {
      const ElyfiToken = await ethers.getContractFactory("ElyfiToken");
      elyfiToken = (await ElyfiToken.deploy()) as ElyfiToken;

      newElyfiToken = (await ElyfiToken.deploy()) as ElyfiToken;
    })

    it('Reverts if non-admin account initialize migration', async () => {
      await expect(elyfiToken.connect(account).initMigration(newElyfiToken.address)).to.be.reverted
    })

    it('Updates the newElyfiToken address', async () => {
      await elyfiToken.connect(deployer).initMigration(newElyfiToken.address)
      expect(await elyfiToken.newElyfiToken()).to.be.equal(newElyfiToken.address)
    })

    it('Reverts after the newElyfiToken has been updated', async () => {
      await elyfiToken.connect(deployer).initMigration(newElyfiToken.address)
      expect(await elyfiToken.connect(deployer).initMigration(newElyfiToken.address)).to.be.reverted
    })
  })

  context('Migrate', async () => {
    let elyfiToken: ElyfiToken
    let newElyfiToken: ElyfiToken
    const [deployer, account] = await ethers.getSigners();

    beforeEach('Deploy Elyfi token and init migration', async () => {
      const ElyfiToken = await ethers.getContractFactory("ElyfiToken");
      elyfiToken = (await ElyfiToken.deploy()) as ElyfiToken;
      newElyfiToken = (await ElyfiToken.deploy()) as ElyfiToken;
      await elyfiToken.connect(deployer).initMigration(newElyfiToken.address)
    })

    it('Reverts if the user balance is 0', async () => {
      await expect(elyfiToken.connect(account).migrate()).to.be.reverted
    })

    it('Transfer the new elyfi tokens and burn old elyfi tokens', async () => {
      await elyfiToken.connect(deployer).transfer(account.address, ethers.utils.parseEther("100"))
      await elyfiToken.connect(account).migrate()
      expect(await newElyfiToken.balanceOf(account.address)).to.be.equal(ethers.utils.parseEther("100"))
      expect(await elyfiToken.balanceOf(account.address)).to.be.equal(0)
    })
  })
});
