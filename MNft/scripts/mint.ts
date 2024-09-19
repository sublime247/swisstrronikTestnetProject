// Import necessary modules from Hardhat and SwisstronikJS
import hre from "hardhat";
import { SwisstronikPlugin } from "@swisstronik/web3-plugin-swisstronik";
import Web3 from "web3";

// Extend HardhatRuntimeEnvironment to include web3
declare module "hardhat/types/runtime" {
    interface HardhatRuntimeEnvironment {
        web3: Web3;
    }
}

// Initialize web3 and register the plugin
hre.web3 = new Web3(hre.network.provider);
hre.web3.registerPlugin(new SwisstronikPlugin("https://json-rpc.testnet.swisstronik.com/"));

async function main() {
    const replace_contractAddress = "0x4F8a3f71A797Cc8dE02542Ab9951a79c9EFCE33c";
    const [from] = await hre.web3.eth.getAccounts();
    const contractFactory = await hre.ethers.getContractFactory("SwsNft");
    const ABI = JSON.parse(contractFactory.interface.formatJson());
    const contract = new hre.web3.eth.Contract(ABI, replace_contractAddress);
    const replace_functionArgs = "0xB5ADB29C608CFbfA5D6BB216cCC80eCBd76A45F1"; // Recipient address
    console.log("Minting 1 token...");
    try {
        const transaction = await contract.methods.safeMint(replace_functionArgs).send({ from });
        console.log("Transaction submitted! Transaction details:", transaction);
        // Display success message with recipient address
        console.log(`Transaction completed successfully! ✅ Non-Fungible Token minted to ${replace_functionArgs}`);
        console.log("Transaction hash:", transaction.transactionHash);
    } catch (error) {
        console.error(`Transaction failed! Could not mint NFT.`);
        console.error(error);
    }
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});