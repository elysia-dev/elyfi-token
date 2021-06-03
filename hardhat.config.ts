import 'dotenv/config';
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";

import { HardhatUserConfig } from "hardhat/types";

const config: HardhatUserConfig = {
  solidity: '0.8.4',
  networks: {
    binanceTestnet: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [process.env.ADMIN || ''],
    },
    binanceMainnet: {
      url: 'https://bsc-dataseed.binance.org/',
      chainId: 56,
      gasPrice: 20000000000,
      accounts: [process.env.ADMIN || ''],
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || '',
  }
};

export default config;