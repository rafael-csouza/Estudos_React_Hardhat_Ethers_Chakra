# React_Hardhat_Ethers_Chakra

Using React, Chakra-UI, OpenZeppelin, Ethers and Hardhat.

Building a Simple Full Web3 Mint Website.

Using: 

File .env get keys:

REACT_APP_ALCHEMY_RINKEBY_URL -> https://auth.alchemyapi.io/

REACT_APP_ETHERSCAN_KEY -> https://etherscan.io/register

REACT_APP_PRIVATE_KEY -> https://iancoleman.io/bip39 / https://github.com/iancoleman/jsbip39

npm install / npm i

npx hardhat clean

npx hardhat compile

npx hardhat run scripts/deployRoboPunksNFT.js --network rinkeby

npx hardhat verify --network rinkeby "CONTRACT ADRESS"

npm run start
