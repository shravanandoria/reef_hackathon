import { createContext, React, useContext, useState } from "react";
import Uik from "@reef-defi/ui-kit";
import "../styles/createproject.css";
import ProjectFactory from "../contracts/ProjectFactory.json";
import { Contract } from "ethers";

import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { Provider, Signer } from "@reef-defi/evm-provider";
import { WsProvider } from "@polkadot/rpc-provider";
import SignerContext from "../signerContext";
const CreateProject = () => {
  const [isWalletConnected, setWalletConnected] = useState(false);
  const [signer, setSigner] = useState();
  const FactoryAbi = ProjectFactory.abi;
  const factoryContractAddress = ProjectFactory.address;
  const [data, setData] = useState({ name: "", budget: "", desc: "" });

  const { signerState } = useContext(SignerContext);
  const URL = "wss://rpc-testnet.reefscan.com/ws";

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const checkExtension = async () => {
    console.log("check ex called");
    let allInjected = await web3Enable("Reef");

    if (allInjected.length === 0) {
      return false;
    }

    let injected;
    if (allInjected[0] && allInjected[0].signer) {
      injected = allInjected[0].signer;
    }

    const evmProvider = new Provider({
      provider: new WsProvider(URL),
    });

    evmProvider.api.on("ready", async () => {
      const allAccounts = await web3Accounts();

      allAccounts[0] && allAccounts[0].address && setWalletConnected(true);

      console.log(allAccounts);

      const wallet = new Signer(evmProvider, allAccounts[0].address, injected);

      // Claim default account
      if (!(await wallet.isClaimed())) {
        console.log(
          "No claimed EVM account found -> claimed default EVM account: ",
          await wallet.getAddress()
        );
        await wallet.claimDefaultAccount();
      }

      setSigner(wallet);
    });
  };

  const checkSigner = async () => {
    if (!signer) {
      await checkExtension();
    }
    return true;
  };

  const createProject = async () => {
    // await checkSigner();
    if (!signerState) return alert("Please Connect your wallet first");
    const contract = new Contract(
      factoryContractAddress,
      FactoryAbi,
      signerState
    );
    const result = await contract.createProject(
      data.name,
      data.desc,
      [""],
      "12312",
      { value: "2000000000000000000" }
    );
    console.log(result);
  };

  return (
    <div className="mainContainer">
      <div className="FormContainer">
        <Uik.Form>
          <Uik.Text
            className="fontCustom"
            text="Create Your Project Request"
            type="headline"
          />
          <Uik.Input onChange={onChange} name="name" label="Project Name" />
          <Uik.Container>
            <Uik.Input
              onChange={onChange}
              name="budget"
              label="Budget (In REEF)"
              placeholder="Eg : 10000"
            />
            <Uik.Input type="date" label="Deadline" />
          </Uik.Container>
          <Uik.Input
            onChange={onChange}
            name="desc"
            label="Project Description"
            textarea
          />
          <Uik.Input type="file" label="Related Files (optional)" />
          <Uik.Button text="Create" fill onClick={createProject} />
        </Uik.Form>
      </div>
    </div>
  );
};

export default CreateProject;
