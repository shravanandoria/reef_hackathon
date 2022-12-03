import { React, useEffect, useState } from "react";
import Uik from "@reef-defi/ui-kit";
import "../styles/createproject.css";
import { uploadFileToIPFS } from "../pinata/uploadFiles";
import axios from "axios";
import { useContext } from "react";
import SignerContext from "../signerContext";
import { useAsyncError, useNavigate } from "react-router-dom";

const CreateProfile = () => {
  const navigate = useNavigate();
  const { address } = useContext(SignerContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [file, setFile] = useState();
  const [data, setData] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
  });

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const uploadFileToIPFS = async (file) => {
    const keys = {
      api: "f5adb195db4a091fc2b8",
      secret:
        "45a5b65ef92291b54bd02c781daac7d14f0967ae4d9f42c29ae23b0947b30d3b",
    };

    // const baseURL = "https://gateway.pinata.cloud/ipfs/";
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    let imgUrl = [];
    // try {
    let data = new FormData();
    data.append("file", file);

    const metadata = JSON.stringify({
      name: file.name,
      keyvalues: {
        exampleKey: "exampleValue",
      },
    });
    data.append("pinataMetadata", metadata);

    const res = await axios.post(url, data, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: keys.api,
        pinata_secret_api_key: keys.secret,
      },
    });
    const imgLink = "https://gateway.pinata.cloud/ipfs/" + res.data.IpfsHash;
    // imgUrl.push(imgLink);
    return imgLink;
    // } catch (error) {
    //   return {
    //     success: false,
    //     data: error.message,
    //   };
    // }
  };

  const createProfile = async (e) => {
    e.preventDefault();
    if (!address.address) return alert("Please connect your wallet");
    setIsLoading(true);
    try {
      const link = await uploadFileToIPFS(file);
      console.log(link);

      const userData = {
        fname: data.fname,
        lname: data.lname,
        profileImage: link,
        username: data.username,
        email: data.email,
        wallet: address.address,
      };
      console.log(userData);
      const res = await axios({
        url: "http://localhost/auth/signup",
        method: "post",
        data: {
          fname: data.fname,
          lname: data.lname,
          profileImage: link,
          username: data.username,
          email: data.email,
          wallet: address.address,
        },
      });
      console.log({ res: res.data });
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mainContainer">
      <form className="FormContainer" onSubmit={createProfile}>
        {/* <Uik.Form> */}
        <Uik.Text
          className="fontCustom"
          text="Create Profile"
          type="headline"
        />
        <Uik.Container>
          <Uik.Input label="First Name" name="fname" onChange={onChange} />
          <Uik.Input label="Last Name" name="lname" onChange={onChange} />
        </Uik.Container>
        <Uik.Input label="Username" name="username" onChange={onChange} />
        <input
          type="file"
          label="Profile Image"
          multiple="multiple"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <Uik.Input label="Email" name="email" onChange={onChange} />
        {/* <Uik.Input label='Short Description' textarea /> */}
        <Uik.Button
          text={isLoading ? <Uik.Loading /> : "Create"}
          fill
          type="submit"
          disabled={isLoading}
        />
        {/* </Uik.Form> */}
      </form>
    </div>
  );
};

export default CreateProfile;
