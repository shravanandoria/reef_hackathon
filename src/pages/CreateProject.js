import { React, useContext, useState, useEffect } from "react";
import Uik from "@reef-defi/ui-kit";
import ProjectFactory from "../contracts/ProjectFactory.json";
import SignerContext from "../actions/signerContext";
import { uploadFileToIPFS } from "../pinata/uploadFiles";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "../styles/createproject.css";
const CreateProject = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleOpen = () => {
    setShow(false);
    navigate("/activeprojects");
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const [files, setFiles] = useState([FileList]);
  const [isLoading, setIsLoading] = useState(false);

  const [images, setImages] = useState([]);

  const [data, setData] = useState({
    title: "",
    description: "",
    deadline: "",
    date: "",
    budget: "",
  });
  const { address, factoryContract } = useContext(SignerContext);

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onChageFileSave = async (e) => {
    // setFiles();
    setIsLoading(true);
    const imageFiles = await uploadFileToIPFS(e.target.files[0]);
    console.log({ imageFiles });
    setImages(imageFiles);
    setIsLoading(false);
  };

  // blockchain
  const createProject = async (e) => {
    e.preventDefault();
    if (!address) return alert("Please connect your wallet");
    setIsLoading(true);
    let parsedBudget = ethers.utils.parseEther(data.budget.toString());

    console.log({ addressInfo: address });
    let nowDate = Date.now();
    console.log({ nowDate });

    const result = await factoryContract.createProject(
      data.title,
      data.description,
      images,
      data.budget,
      nowDate,
      data.deadline,
      { value: parsedBudget }
    );
    const projects = await factoryContract.getDeployedProjects();
    console.log(projects);
    console.log({ result });
    setIsLoading(false);
    handleShow();
  };

  return (
    <div className="mainContainer">
      <div className="FormContainer">
        <form onSubmit={createProject}>
          <Uik.Text
            className="fontCustom"
            text="Create Your Project Request"
            type="headline"
          />
          <Uik.Input
            onChange={onChange}
            name="title"
            label="Project Name"
            required={true}
          />
          <Uik.Container className="containerStyle">
            <Uik.Input
              onChange={onChange}
              name="budget"
              label="Budget (In REEF)"
              placeholder="Eg : 10000"
              required={true}
            />
            <Uik.Input
              type="date"
              label="Deadline"
              name="deadline"
              required={true}
              onChange={(e) => {
                let date = new Date();
                let sec = date.getSeconds(e);
                onChange(e);
              }}
            />
          </Uik.Container>
          <Uik.Input
            onChange={onChange}
            name="description"
            label="Project Description"
            required={true}
            textarea
          />
          <>
            <Uik.Label
              text="Project Related Files (JPG/PNG)"
              className="labelTextt"
              required={true}
            />
          </>
          <input
            type="file"
            name="files"
            placeholder="input files"
            className="filesInt"
            onChange={onChageFileSave}
          />
          {isLoading ? (
            <Uik.Button text="Button" loading size="small" />
          ) : (
            <Uik.Button text="Create" fill type="submit" />
          )}
        </form>
      </div>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Request Created 😃</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You have successfully requested the project, Click on close to add
          more projects!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleOpen}>
            Explore
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateProject;
