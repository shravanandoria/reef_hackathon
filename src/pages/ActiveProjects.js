import React, { useEffect, useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import "../styles/activeprojects.css";
import Uik from "@reef-defi/ui-kit";
import ProjectFactory from "../contracts/ProjectFactory.json";
import SignerContext from "../signerContext";
import { Contract } from "ethers";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { Provider, Signer } from "@reef-defi/evm-provider";
import { WsProvider } from "@polkadot/rpc-provider";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import reef from "../assets/reef.png";

import Button from "react-bootstrap/Button";

const ActiveProjects = () => {
  const navigate = useNavigate();
  const [isWalletConnected, setWalletConnected] = useState(false);
  const [signer, setSigner] = useState();
  const FactoryAbi = ProjectFactory.abi;
  const factoryContractAddress = ProjectFactory.address;
  const { signerState, address } = useContext(SignerContext);
  const [usernameMain, setUsernameMain] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const URL = "wss://rpc-testnet.reefscan.com/ws";

  const [isLoading, setIsLoading] = useState(false);
  const [sample, setSample] = useState([]);
  const [data, setData] = useState([
    {
      title: "",
      description: "",
      deadline: "",
      budget: "",
      images: "",
      owner: "",
      date: "",
    },
  ]);

  const getOwnerData = async (ownerId) => {
    const response = await axios({
      url: `http://localhost/auth/getuser`,
      method: "post",
      data: {
        id: ownerId,
      },
    });
    const { username, profileImage } = response.data;
    setUsernameMain(username);
    setProfileImage(profileImage);
  };

  const checkExtension = async () => {
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

      const wallet = new Signer(evmProvider, allAccounts[0].address, injected);

      if (!(await wallet.isClaimed())) {
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

  const fetchProjects = async () => {
    setIsLoading(true);
    if (!address.address) return;
    // await checkSigner();
    const factoryContract = new Contract(
      factoryContractAddress,
      FactoryAbi,
      signerState
    );
    const res = await factoryContract.getDeployedProjects();
    const { projectTitle, projectDesc } = res;
    console.log(res);
    setSample(res);
    console.log({ projectTitle, projectDesc });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="cardDesign">
      {sample &&
        sample.map((e, index) => {
          // console.log(e.files[0]);
          return (
            <>
              <Link className="linkDesign" key={index}>
                <Card
                  className="cardDiv"
                  style={{
                    textDecoration: "none",
                    margin: "5px 30px",
                    width: "360px",
                  }}
                  key={index}
                >
                  <Card.Img
                    variant="top"
                    src={e.image}
                    style={{ maxHeight: "220px", width: "auto" }}
                  />
                  <Card.Body>
                    <Card.Title>{e.projectTitle}</Card.Title>
                    <Card.Text>{e.projectDesc}</Card.Text>
                    <div style={{ display: "flex" }}>
                      <Link
                        to={`/project/${e.projectId.toString()}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Uik.Button
                          fill
                          text="View Project"
                          size="large"
                          className="btnProjectt"
                        />
                      </Link>
                      <div style={{ display: "flex" }}>
                        <Uik.Label text="Requested By" className="labeluser" />
                        <Uik.Avatar
                          name={"Shravan"}
                          image={reef}
                          size="small"
                        />
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted" style={{ display: "flex" }}>
                      <Uik.Tooltip
                        text="Deadline"
                        position="right"
                        className="tooltipBox"
                      >
                        <Uik.Button text={e.deadline} />
                      </Uik.Tooltip>
                      <div className="budgetDesign">
                        <Uik.Label text="Budget" className="budgetIn" />
                      </div>
                      <Uik.ReefAmount value={e.budget} />
                    </small>
                  </Card.Footer>
                </Card>
              </Link>
            </>
          );
        })}
    </div>
  );
};

export default ActiveProjects;
