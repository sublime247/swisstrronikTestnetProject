import { abi } from "../artifacts/contracts/myPERC20.sol/PERC20Sample.json";
import { Web3 } from "web3";
import hre, { network } from "hardhat";
import { SwisstronikPlugin } from "@swisstronik/web3-plugin-swisstronik";

async function main() {

  const web3 = new Web3(hre.network.provider); // Any RPC node you wanted to connect with
  web3.registerPlugin(new SwisstronikPlugin("https://json-rpc.testnet.swisstronik.com/unencrypted")); // Any RPC node you wanted to connect with

  // Address of the deployed contract
  const contractAddress = '0xF8c82Cd5017d618A652f99112717194a0569C3e7';

  // Get the signer (your account)
  const from = await hre.web3.eth.getAccounts();
  const acct = from[0];
  // const from = accounts[0];
  console.log("Minting 100 tokens using account", acct);

  // Create a contract instance using the provided ABI and contract address
  try {
    const contract = new hre.web3.eth.Contract(abi, contractAddress);
    console.log(contract);
    

    // Call the mint function and wait for the transaction receipt
    const mint100TokensTx = await contract.methods.mint();
  console.log("Minting 100 tokens...");
    console.log("Transaction Receipt: ", mint100TokensTx);
  }catch(error) { 
    console.log(error)
  }

}

// Using async/await pattern to handle errors properly
main().catch((error) => {
  console.error("Error in execution: ", error);
  process.exitCode = 1;
});
