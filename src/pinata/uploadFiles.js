import axios from "axios";
import { useState, useContext } from "react";
import SignerContext from "../signerContext";

const keys = {
  api: "f5adb195db4a091fc2b8",
  secret: "45a5b65ef92291b54bd02c781daac7d14f0967ae4d9f42c29ae23b0947b30d3b",
};

export const uploadFileToIPFS = async (file) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  try {
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
    return imgLink;
  } catch (error) {
    return {
      success: false,
      data: error.message,
    };
  }
};
