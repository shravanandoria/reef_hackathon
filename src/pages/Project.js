import React, { useEffect, useState, useContext } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Uik from "@reef-defi/ui-kit";
import "../styles/project.css";
import ethindia from "../assets/ethindia.png";
import reef from "../assets/reef.png";
import dapp from "../assets/dapp.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router-dom";
import axios from "axios";
import SignerContext from "../signerContext";
import ProjectFactory from "../contracts/ProjectFactory.json";
import { Contract } from "ethers";
import "swiper/swiper-bundle.min.css";

import { FreeMode, Pagination } from "swiper";
const Project = () => {
  const factoryContractAddress = ProjectFactory.address;
  const FactoryAbi = ProjectFactory.abi;
  const { id } = useParams();
  const [usernameMain, setUsernameMain] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [data, setData] = useState();
  const [date, setDate] = useState();
  const [applyData, setApplyData] = useState({ cost: 0, summary: "" });
  const { signerState, address } = useContext(SignerContext);
  const [proposals, setProposals] = useState([]);
  const [factoryContract, setFactoryContract] = useState();

  const fetchProject = async () => {
    // setIsLoading(true);
    if (!address.address) return;
    const factoryContract = new Contract(
      factoryContractAddress,
      FactoryAbi,
      signerState
    );
    const res = await factoryContract.deployedProjectsById(id);
    console.log({ res });
    fetchProposals(res.project);
    setData(res);
  };

  const onChangeModal = (e) => {
    setApplyData({ ...applyData, [e.target.name]: e.target.value });
    console.log(applyData);
  };

  const [show, setShow] = useState(false);
  const [apply, setApply] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = async () => {
    if (!address.address) return;
    const { abi } = require("./ABI");
    const factoryContract = new Contract(data.project, abi, signerState);
    const res = await factoryContract.createProposal(
      applyData.cost,
      applyData.summary
    );
    console.log({ res });
  };
  const handleClose = () => {
    setApply(false);
  };
  const handleShow = () => setApply(true);

  const fetchProposals = async (project) => {
    if (!address.address) return;
    const { abi } = require("./ABI");
    const factoryContract = new Contract(project, abi, signerState);
    const res = await factoryContract.getProposals();
    let dataObj = [];
    res.map((e) => {
      let obj = {
        cost: e.cost.toString(),
        summary: e.summary,
      };
      dataObj.push(obj);
    });
    console.log({ dataObj });
    setProposals(dataObj);
  };

  useEffect(() => {
    fetchProject();
  }, [address]);

  return (
    <>
      {data ? (
        <>
          <Uik.Card title="" condensed>
            <div className="divDesign">
              <div className="divTextArea">
                <Uik.Text
                  className="fontCustom"
                  text={data.projectTitle}
                  type="headline"
                />
                <div className="labelDiv">
                  <div style={{ marginRight: "25px" }}>
                    <Uik.Label text="Published On" className="labelText" />
                    <Uik.Tag color="purple" text={"2021-11-12"} />
                  </div>
                  <div style={{ marginRight: "25px" }}>
                    <Uik.Label text="Project Deadline" className="labelText" />
                    <Uik.Tag color="yellow" text={data.deadline} />
                  </div>
                  <div>
                    <Uik.Label text="Project Budget" className="labelText" />
                    {data && <Uik.ReefAmount value={data.budget.toNumber()} />}
                  </div>
                </div>
                <div className="userProfile">
                  <Uik.Label text="Requested By" className="userText" />
                  <Link to={"/profile"} style={{ textDecoration: "none" }}>
                    <Uik.Avatar
                      name={"Shravan"}
                      image={reef}
                      className="avatarTest"
                    />
                  </Link>
                </div>
                <Uik.Text
                  className="title titleProject"
                  text={data.projectDesc}
                  type="title"
                />
              </div>

              <div className="ImageDivHero">
                <img src={data.image} className="heroImgMain" />
              </div>
            </div>
            <div className="btndiv">
              <Uik.Button
                text="Apply"
                onClick={() => {
                  handleShow();
                }}
                success
                className="applyBtn"
              />
              <Uik.Tooltip text="Coming Soon.." position="right">
                {!show && (
                  <Button onClick={() => setShow(true)} className="applyBtn">
                    See Proposals
                  </Button>
                )}
                <Uik.Button text="Chat" />
              </Uik.Tooltip>
            </div>
            <Alert show={show} variant="success">
              <Alert.Heading>
                Exisiting Proposals from other freelancers
              </Alert.Heading>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Coatation</th>
                    <th>Summary</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {proposals.map((e, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>Shravan User</td>
                      <td>{e.cost} Reef</td>
                      <td>{e.summary}</td>
                      <td>
                        {" "}
                        <Uik.Button
                          text="Accept Proposal"
                          size="small"
                          success
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <hr />
              <div className="d-flex justify-content-end">
                <Button
                  onClick={() => setShow(false)}
                  variant="outline-success"
                >
                  Close
                </Button>
              </div>
            </Alert>
            <Uik.Text className="textDivProj" text="Other Related Images" />
            <div className="ImageDiv">
              <Swiper
                // slidesPerView={3}
                spaceBetween={10}
                freeMode={true}
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                  },
                  700: {
                    slidesPerView: 2,
                  },
                  1050: {
                    slidesPerView: 3,
                  },
                  1400: {
                    slidesPerView: 4,
                  },
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper"
              >
                <SwiperSlide>
                  {" "}
                  <img src={ethindia} className="heroImg" />
                </SwiperSlide>
                <SwiperSlide>
                  {" "}
                  <img src={ethindia} className="heroImg" />
                </SwiperSlide>
                <SwiperSlide>
                  {" "}
                  <img src={ethindia} className="heroImg" />
                </SwiperSlide>
                <SwiperSlide>
                  {" "}
                  <img src={ethindia} className="heroImg" />
                </SwiperSlide>
                <SwiperSlide>
                  {" "}
                  <img src={ethindia} className="heroImg" />
                </SwiperSlide>
                <SwiperSlide>
                  {" "}
                  <img src={ethindia} className="heroImg" />
                </SwiperSlide>
                <SwiperSlide>
                  {" "}
                  <img src={ethindia} className="heroImg" />
                </SwiperSlide>
              </Swiper>
            </div>
          </Uik.Card>
          {/* Modal apply proposal */}
          <Modal show={apply} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Submit a Proposal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Uik.Input
                label="Coat (Your coatation in Reef)"
                required={true}
                name="cost"
                onChange={onChangeModal}
              />
              <Uik.Input
                required={true}
                label="Summary (How will you work/Which tech stack will you use)"
                textarea
                name="summary"
                className="inputTextarea"
                onChange={onChangeModal}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        "Loading...."
      )}
    </>
  );
};

export default Project;
