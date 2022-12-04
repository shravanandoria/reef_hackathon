import React, { useEffect, useState, useContext } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Uik from "@reef-defi/ui-kit";
import "../styles/project.css";
import ethindia from "../assets/ethindia.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router-dom";
import axios from "axios";
import SignerContext from "../signerContext";
import ProjectFactory from "../contracts/ProjectFactory.json";
import { Contract } from "ethers";
// import "swiper/swiper-bundle.min.css";

import { FreeMode, Pagination } from "swiper";
const Project = () => {
  const factoryContractAddress = ProjectFactory.address;
  const FactoryAbi = ProjectFactory.abi;
  const { id } = useParams();
  const [usernameMain, setUsernameMain] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [data, setData] = useState();
  const [date, setDate] = useState();

  const { signerState, address } = useContext(SignerContext);

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
    setData(res);
  };

  const applyProposal = async () => {
    if (!address.address) return;
    
    const factoryContract = new Contract(
      factoryContractAddress,
      FactoryAbi,
      signerState
    );
    const res = await factoryContract.deployedProjectsById(id);
    console.log({ res });
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

  const [show, setShow] = useState(false);
  const [apply, setApply] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    // setApply(false);
  };
  const handleClose = () => {
    setApply(false);
  };
  const handleShow = () => setApply(true);

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
                    <Uik.Tag color="purple" text={data.date} />
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
                      name={usernameMain}
                      image={profileImage}
                      className="avatarTest"
                    />
                  </Link>
                </div>
                <Uik.Text
                  className="title titleProject"
                  text={data.description}
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
                onClick={handleShow}
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
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>2300</td>
                    <td>Talkingg</td>
                    <td>
                      {" "}
                      <Uik.Button text="Accept Proposal" size="small" success />
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>0.8</td>
                    <td>Talkingg</td>
                    <td>
                      {" "}
                      <Uik.Button text="Accept Proposal" size="small" success />
                    </td>
                  </tr>
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
          <Modal show={apply} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Submit a Proposal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Uik.Input
                label="Coat (Your coatation in Reef)"
                value={value}
                required={true}
                onInput={(e) => setValue(e.target.value)}
              />
              <Uik.Input
                required={true}
                label="Summary (How will you work/Which tech stack will you use)"
                textarea
                className="inputTextarea"
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
