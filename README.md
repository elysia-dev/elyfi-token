# Elyfi Token

Elyfi(ELFI) is an ERC-20 compatible token.
It implements governance-inspired features with openzeppelin's ERC20Snapshot.

## Deployed Contracts
| Network  | Address                                                                                                                  |
|----------|--------------------------------------------------------------------------------------------------------------------------|
| Ethereum | [0x4da34f8264cb33a5c9f17081b9ef5ff6091116f4](https://etherscan.io/token/0x4da34f8264cb33a5c9f17081b9ef5ff6091116f4)      |
| BSC      | [0x6C619006043EaB742355395690c7b42d3411E8c0](https://bscscan.com/address/0x6C619006043EaB742355395690c7b42d3411E8c0)     |
| Klaytn   | [0x946f0926a4406714cbA0Fd2b8b9FFECC51ef05f9](https://klaytnscope.com/account/0x946f0926a4406714cbA0Fd2b8b9FFECC51ef05f9) |


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
yarn deploy:mainnet
yarn deploy:testnet
```

You can alwo verify automatically via the command:

```
yarn verify:mainnet
yarn verify:testnet
```

## Test

```
yarn hardhat test test/elyfiToken.spec.ts
```
