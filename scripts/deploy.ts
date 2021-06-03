import { ethers } from "hardhat";

async function main() {
  const ElyfiToken = await ethers.getContractFactory("ElyfiToken");
  const elyfiToken = await ElyfiToken.deploy();

  console.log("ELFI deployed to:", elyfiToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });