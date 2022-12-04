import { React, useContext, useState, useEffect } from "react";
import Uik from "@reef-defi/ui-kit";
import ProjectFactory from "../contracts/ProjectFactory.json";
import { Contract } from "ethers";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { Provider, Signer } from "@reef-defi/evm-provider";
import { WsProvider } from "@polkadot/rpc-provider";
import SignerContext from "../signerContext";
import { uploadAllFiles, uploadFileToIPFS } from "../pinata/uploadFiles";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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

  const [isWalletConnected, setWalletConnected] = useState(false);
  const [signer, setSigner] = useState();
  const [files, setFiles] = useState([FileList]);
  const [isLoading, setIsLoading] = useState(false);


  const [images, setImages] = useState([]);

  const [data, setData] = useState({
    title: "",
    description: "",
    deadline: 0,
    budget: "",
  });
  const FactoryAbi = ProjectFactory.abi;

  const factoryContractAddress = ProjectFactory.address;
  const { signerState, address } = useContext(SignerContext);
  const URL = "wss://rpc-testnet.reefscan.com/ws";

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
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

  const onChageFileSave = async (e) => {
    // setFiles();
    console.log("loading true")
    setIsLoading(true);
    const imageFiles = await uploadFileToIPFS(e.target.files);
    setImages(imageFiles);
    console.log("loading false")
    setIsLoading(false);
  };

  const cenCreateProject = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // if (!address.address) return alert("Please connect your wallet address");
    if (!images) return alert("Please provide some images");
    try {
      const res = await axios({
        url: "http://localhost/project/createpost",
        method: "post",
        data: {
          wallet: address.address,
          ...data,
          files: images,
          date: Date.now(),
        },
      });

      const result = await res.data;
      console.log(result);
      setIsLoading(false);
      handleShow();
    } catch (error) {
      console.log(error);
    }
  };

  // blockchain
  const createProject = async (e) => {
    e.preventDefault();
    if (!address.address) return alert("Please connect your wallet");
    await checkSigner();
    const factoryContract = new Contract(
      factoryContractAddress,
      FactoryAbi,
      signerState
    );
    const result = await factoryContract.getDeployedProjects();
    console.log(result);

    console.log(result);
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
          <Uik.Input onChange={onChange} name="title" label="Project Name" required={true} />
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
              onChange={onChange}
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
            <Uik.Label text='Project Related Files (JPG/PNG)' className="labelTextt" required={true}/>
          </>
          <input
            type="file"
            name="files"
            multiple="multiple"
            placeholder="input files"
            className="filesInt"
            onChange={onChageFileSave}
          />
          {isLoading ? (<Uik.Button text='Button' loading size='small' />) : (<Uik.Button text="Create" fill type="submit" />)}
        </form>
      </div>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Request Created 😃</Modal.Title>
        </Modal.Header>
        <Modal.Body>You have successfully requested the project, Click on close to add more projects!</Modal.Body>
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
