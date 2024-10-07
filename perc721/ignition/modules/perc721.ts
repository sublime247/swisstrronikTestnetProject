// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const PERC721Module = buildModule("PERC721Module", (m) => {


  const perc721 = m.contract("PERC721Sample");

  return { perc721 };
});

export default PERC721Module;
