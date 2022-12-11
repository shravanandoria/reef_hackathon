import { createContext, useState } from "react";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { Provider, Signer } from "@reef-defi/evm-provider";
import { WsProvider } from "@polkadot/rpc-provider";
import ProjectFactory from "../contracts/ProjectFactory.json";
import { Contract } from "ethers";

const SignerContext = createContext();
const URL = "wss://rpc-testnet.reefscan.com/ws";

export const SignerProvider = ({ children }) => {
  const [address, setAddress] = useState("");
  const [signer, setSigner] = useState();
  const [conenctingWallet, setConnectingWallet] = useState(false);
  const factoryContractAddress = ProjectFactory.address;
  const FactoryAbi = ProjectFactory.abi;

  const checkExtension = async () => {
    setConnectingWallet(true);
    console.log("check extension called");
    let allInjected = await web3Enable("Reef");

    if (allInjected.length === 0) {
      return false;
    }

    let injected;
    if (allInjected[0] && allInjected[0].signer) {
      injected = allInjected[0].signer;
    }

    console.log({ shravan: allInjected[0].signer });

    const evmProvider = new Provider({
      provider: new WsProvider(URL),
    });

    evmProvider.api.on("ready", async () => {
      const allAccounts = await web3Accounts();

      // allAccounts[1] && allAccounts[1].address && setWalletConnected(true);

      setAddress(allAccounts[1].address);

      const wallet = new Signer(evmProvider, allAccounts[1].address, injected);
      console.log({ wallet });
      const evmAddress =
        await wallet.provider.api.query.evmAccounts.evmAddresses(
          wallet._substrateAddress
        );
      setSigner(wallet);
      console.log({ evmAddress });

      // Claim default account
      if (!(await wallet.isClaimed())) {
        console.log(
          "No claimed EVM account found -> claimed default EVM account: ",
          await wallet.getAddress()
        );
        await wallet.claimDefaultAccount();
      }

      setConnectingWallet(false);
    });
  };

  const factoryContract = new Contract(
    factoryContractAddress,
    FactoryAbi,
    signer
  );
  return (
    <SignerContext.Provider
      value={{
        signer,
        checkExtension,
        conenctingWallet,
        address,
        factoryContract,
      }}
    >
      {children}
    </SignerContext.Provider>
  );
};

export default SignerContext;
