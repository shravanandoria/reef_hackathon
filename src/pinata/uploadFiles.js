import axios from "axios";
const keys = {
  api: "f5adb195db4a091fc2b8",
  secret: "45a5b65ef92291b54bd02c781daac7d14f0967ae4d9f42c29ae23b0947b30d3b",
};

export const uploadFileToIPFS = async (files) => {
  const baseURL = "https://gateway.pinata.cloud/ipfs/";
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  const imageURL = [""];

  try {
    Array.from(files).forEach(async (file) => {
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
      if (res.data.IpfsHash.length > 0) {
        imageURL.push(imgLink);
      }
    });
    return imageURL;
  } catch (error) {
    return {
      success: false,
      data: error.message,
    };
  }
};
