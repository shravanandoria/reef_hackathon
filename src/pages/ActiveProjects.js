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
import Button from "react-bootstrap/Button";

const ActiveProjects = () => {
  const navigate = useNavigate();
  const [isWalletConnected, setWalletConnected] = useState(false);
  const [signer, setSigner] = useState();
  const FactoryAbi = ProjectFactory.abi;
  const factoryContractAddress = ProjectFactory.address;
  const { signerState } = useContext(SignerContext);
  const [usernameMain, setUsernameMain] = useState("");
  const [profileImage, setProfileImage] = useState("");
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
    console.log({ res: res.data });
    setData(res.data);
    getOwnerData(res.data.owner);
  };

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
    console.log({ ownerInfo: response.data });
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

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="cardDesign">
      {data.map((e, index) => {
        // console.log(e.files[0]);
        return (
          <>
            <Link className="linkDesign">
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
                  src={e.files[0]}
                  style={{ maxHeight: "220px", width: "auto" }}
                />
                <Card.Body>
                  <Card.Title>{e.title}</Card.Title>
                  <Card.Text>{e.description}</Card.Text>
                  <div style={{ display: "flex" }}>
                    <Link
                      to={`/project/${e._id}`}
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
                        name={usernameMain}
                        image={profileImage}
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
