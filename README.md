# Elyfi Token

Elyfi(ELFI) is an ERC-20 compatible token.
It implements governance-inspired features with openzeppelin's ERC20Snapshot.

## Setup

- Create an file named .env and fill the next enviroment variables

```
# Secret key for deploying contracts
ADMIN=

ETHERSCAN_API_KEY=

```

- Install dependencies with `yarn`

## Deployment

You can deploy ElyfiToken to the networks via the following command:

```
yarn hardhat --network [binanceTestnet | binanceMainnet] scripts/deploy.ts
```

You can alwo verify automatically via the command:

```
yarn hardhat verify --network [binanceTestnet | binanceMainnet] DEPLOYED_ADDRESS
```

## Test

```
yarn hardhat test test/elyfiToken.spec.ts
```
