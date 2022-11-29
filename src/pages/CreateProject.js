import { React, useState } from "react";
import Uik from "@reef-defi/ui-kit";
import "../styles/createproject.css";
import ProjectFactory from "../contracts/ProjectFactory.json";
import { Contract } from "ethers";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { Provider, Signer } from "@reef-defi/evm-provider";
import { WsProvider } from "@polkadot/rpc-provider";
import SignerContext from "../signerContext";
import { useContext } from "react";

const CreateProject = () => {
  const [signer, setSigner] = useState();
  const FactoryAbi = ProjectFactory.abi;
  const factoryContractAddress = ProjectFactory.address;
  const [isWalletConnected, setWalletConnected] = useState(false);
  const { signerState } = useContext(SignerContext);

  const [data, setData] = useState({
    name: "",
    budget: "",
    deadline: "123",
    desc: "",
    files: [""],
  });

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const createProject = async () => {
    // await checkSigner();
    const factoryContract = new Contract(
      factoryContractAddress,
      FactoryAbi,
      signerState
    );
    const createProject = await factoryContract.createProject(
      data.name,
      data.desc,
      data.files,
      data.deadline,
      { value: "1000000000000000000" }
    );
    console.log({ project: createProject });
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
            <Uik.Input
              // onChange={onChange}
              name="deadline"
              type="date"
              label="Deadline"
            />
          </Uik.Container>
          <Uik.Input
            onChange={onChange}
            name="desc"
            label="Project Description"
            textarea
          />
          <Uik.Input
            onChange={onChange}
            type="file"
            label="Related Files (optional)"
          />
          <Uik.Button text="Create" fill onClick={createProject} />
        </Uik.Form>
      </div>
    </div>
  );
};

export default CreateProject;
