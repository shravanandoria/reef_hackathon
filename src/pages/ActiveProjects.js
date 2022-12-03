import React, { useEffect, useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import "../styles/activeprojects.css";
import reef from "../assets/reef.png";
import ethindia from "../assets/ethindia.png";
import dapp from "../assets/dapp.png";
import Uik from "@reef-defi/ui-kit";
import ProjectFactory from "../contracts/ProjectFactory.json";
import SignerContext from "../signerContext";
import { Contract } from "ethers";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { Provider, Signer } from "@reef-defi/evm-provider";
import { WsProvider } from "@polkadot/rpc-provider";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const ActiveProjects = () => {
  const [isWalletConnected, setWalletConnected] = useState(false);
  const [signer, setSigner] = useState();
  const FactoryAbi = ProjectFactory.abi;
  const factoryContractAddress = ProjectFactory.address;
  const { signerState } = useContext(SignerContext);
  const URL = "wss://rpc-testnet.reefscan.com/ws";

  const [data, setData] = useState([
    {
      title: "",
      description: "",
      deadline: "",
      budget: "",
      files: "",
      owner: "",
      date: "",
    },
  ]);

  const fetchProjects = async () => {
    const res = await axios({
      url: "http://localhost/project/getprojects",
      method: "get",
    });
    console.log(res.data);
    setData(res.data);
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

  const contract = new Contract(
    factoryContractAddress,
    FactoryAbi,
    signerState
  );

  useEffect(() => {
    fetchProjects();
  }, []);

  // const fetchProjects = async () =>{
  //     await checkSigner();
  // if (!signerState) return alert("Please Connect your wallet first");
  //     const projects = await contract.getDeployedProjects();
  //     console.log({ projects });
  // }

  return (
    <CardGroup className="cardDesign">
      {data.map((e, index) => {
        // console.log(e.files[0]);
        return (
          <>
            <Link to={`/project/${e._id}`}>
              <Card className="cardDiv" key={index}>
                <Card.Img
                  //   variant="top"
                  src={e.files[0]}
                  style={{ maxHeight: "320px", width: "auto" }}
                />
                <Card.Body>
                  <Card.Title>{e.title}</Card.Title>
                  <Card.Text>{e.description}</Card.Text>
                  <Link to={"/project"} style={{ textDecoration: "none" }}>
                    <Uik.Button fill text="View Project" size="large" />
                  </Link>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    Project Request on 25 November, 2022
                  </small>
                </Card.Footer>
              </Card>
            </Link>
          </>
        );
      })}
    </CardGroup>
  );
};

export default ActiveProjects;
