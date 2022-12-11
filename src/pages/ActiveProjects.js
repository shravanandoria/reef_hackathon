import React, { useEffect, useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import "../styles/activeprojects.css";
import Uik from "@reef-defi/ui-kit";
import ProjectFactory from "../contracts/ProjectFactory.json";
import SignerContext from "../actions/signerContext";
import { Contract } from "ethers";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import reef from "../assets/reef.png";
import Button from "react-bootstrap/Button";

const ActiveProjects = () => {
  const { signer, address, factoryContract } = useContext(SignerContext);
  const navigate = useNavigate();
  const [isWalletConnected, setWalletConnected] = useState(false);
  const FactoryAbi = ProjectFactory.abi;
  const factoryContractAddress = ProjectFactory.address;
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

  const fetchProjects = async () => {
    setIsLoading(true);
    if (!address) return;

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
