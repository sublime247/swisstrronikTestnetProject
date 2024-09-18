import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const SwisstronikModule = buildModule("SwisstronikModule", (m) => {

  const swisstronik = m.contract("Swisstronik");

  return { swisstronik };
});

export default SwisstronikModule;
