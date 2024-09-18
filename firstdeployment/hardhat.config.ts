import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "swisstronik",
  networks: {
    swisstronik: {
      url: process.env.SWISSTRONIK_RPC!,
      accounts: [`0x` + `${process.env.ACCOUNT_PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: `ANY_STRING_WILL_DO`,
    customChains: [
      {
        network: "swisstronik",
        chainId: 1291,
        urls: {
          apiURL: "https://explorer-evm.testnet.swisstronik.com/api",
          browserURL: "https://explorer-evm.testnet.swisstronik.com",
        },
      },
    ],
  },
};

export default config;
