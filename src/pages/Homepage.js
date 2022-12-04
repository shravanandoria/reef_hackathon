import { React, useContext, useEffect, useState, } from "react";
import "../styles/homepage.css";
import HeroSvg from "../assets/hero.svg";
import Uik from "@reef-defi/ui-kit";
import Card from "react-bootstrap/Card";
import "../styles/freelancers.css";
import { Link } from "react-router-dom";
import ProjectFactory from "../contracts/ProjectFactory.json";
import SignerContext from "../signerContext";
import { Contract } from "ethers";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { Provider, Signer } from "@reef-defi/evm-provider";
import { WsProvider } from "@polkadot/rpc-provider"

import CardGroup from "react-bootstrap/CardGroup";
import ethindia from "../assets/ethindia.png";
import dapp from "../assets/dapp.png";
import reef from "../assets/reef.png";
import axios from "axios";


const Homepage = () => {

  const [signer, setSigner] = useState();
  const FactoryAbi = ProjectFactory.abi;
  const factoryContractAddress = ProjectFactory.address;
  const { signerState, address } = useContext(SignerContext);
  const [usernameMain, setUsernameMain] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [isWalletConnected, setWalletConnected] = useState(false);

  const URL = "wss://rpc-testnet.reefscan.com/ws";

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


  const openPage = () => {
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
    if (!address.address) return;
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
  };

  useEffect(() => {
    fetchProjects();
  }, []);
  return (
    <>
      <div className="heroContainer">
        <div>
          <Uik.Text text="Find The Best Work For You!" type="headline" />
          <Uik.Text text="Request | Work | Earn" type="headline" />
          <Uik.Text
            className="normalText"
            text="Choose your direction and get started!!"
            type="light"
          />
          <div className="ButtonContainer">
            <Link to={"/createproject"} className="TextStyleCustom">
              <Uik.Button className="btn1" text="Request Project" fill />
            </Link>
            <Link to={"/activeprojects"} className="TextStyleCustom">
              <Uik.Button text="Get Project" success />
            </Link>
          </div>
        </div>
        <div>
          <img src={HeroSvg} className="heroImg" />
        </div>
      </div>



      {!address ? (<>
        <div className="centerText">
          <Uik.Text text="Active Projects" type="headline" className="projectStyle" />
        </div>
        <CardGroup className="cardDesign">
          <Card className="cardDiv" style={{ margin: "2px 10px" }}>
            <Card.Img
              variant="top"
              src={reef}
              style={{ maxHeight: "320px", width: "auto" }}
            />
            <Card.Body>
              <Card.Title>Integrate web3.js library in Reef Dapp</Card.Title>
              <Card.Text>
                Hi, We are looking for a developer to integrate web3.js library to
                connect to a smart contract. This would be an HMTL web page
                requesting user payment in USDT or Reef, user will initiate
                payment from their wallet and coins will be transferred to the
                smart contract.
              </Card.Text>
              <Uik.Button
                fill
                text="View Project"
                size="large"
                onClick={() =>
                  Uik.notify.info("Please connect your wallet to view projects")
                }
              />
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">
                Project Request on 25 November, 2022
              </small>
            </Card.Footer>
          </Card>
          <Card className="cardDiv" style={{ margin: "2px 10px" }}>
            <Card.Img
              variant="top"
              src={ethindia}
              style={{ maxHeight: "320px", width: "auto" }}
            />
            <Card.Body>
              <Card.Title>ETH India Website</Card.Title>
              <Card.Text>
                Want to create official website for ETH india event | Need a
                freelancer with good experience, need this website done very quickly and in best way
              </Card.Text>
              <Uik.Button
                fill
                text="View Project"
                size="large"
                onClick={() =>
                  Uik.notify.info("Please connect your wallet to view projects")
                }
              />
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">
                Project Request on 24 November, 2022
              </small>
            </Card.Footer>
          </Card>
          <Card className="cardDiv" style={{ margin: "2px 10px" }}>
            <Card.Img
              variant="top"
              src={dapp}
              style={{ maxHeight: "320px", width: "auto" }}
            />
            <Card.Body>
              <Card.Title>Crypto Exchange Website</Card.Title>
              <Card.Text>
                Hello, we are a low-budget startup We want to create a USDT to USD
                (FIAT) exchange for the local market. The website should be
                written in React/Next.js (front) The idea is simple, we need a
                landing page where the course will be calculated easily ( USD- GEL
                course)
              </Card.Text>
              <Uik.Button
                fill
                text="View Project"
                size="large"
                onClick={() =>
                  Uik.notify.info("Please connect your wallet to view projects")
                }
              />
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">
                Project Request on 26 November, 2022
              </small>
            </Card.Footer>
          </Card>
        </CardGroup>
      </>) : (<>
        <div className="centerText">
          <Uik.Text text="Active Projects" type="headline" className="projectStyle" />
        </div>
        <div className="cardDesign">
          {sample &&
            sample.map((e, index) => {
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
      </>)}
    </>
  );
};

export default Homepage;
