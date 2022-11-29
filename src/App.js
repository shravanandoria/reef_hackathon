import React, { useState } from "react";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { Provider, Signer } from "@reef-defi/evm-provider";
import { WsProvider } from "@polkadot/rpc-provider";
import { Contract } from "ethers";
import ProjectFactory from "./contracts/ProjectFactory.json";
import Uik from "@reef-defi/ui-kit";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import EditProfile from "./pages/EditProfile";
import CreateProject from "./pages/CreateProject";
import Freelancers from "./pages/Freelancers";
import ActiveProjects from "./pages/ActiveProjects";
import GettingStarted from "./pages/GettingStarted";
import Footer from "./components/Footer";
import { Route, RouterProvider, createBrowserRouter } from "react-router-dom";
// const FactoryAbi = ProjectFactory.abi;
// const factoryContractAddress = ProjectFactory.address;

function App() {
  // const checkSigner = async () => {
  //   if (!signer) {
  //     await checkExtension();
  //   }
  //   return true;
  // };

  // const getGreeting = async () => {
  //   await checkSigner();
  //   const factoryContract = new Contract(
  //     factoryContractAddress,
  //     FactoryAbi,
  //     signer
  //   );
  //   const result = await factoryContract.greet();
  //   setMsg(result);
  // };

  // const setGreeting = async () => {
  //   await checkSigner();
  //   const factoryContract = new Contract(
  //     factoryContractAddress,
  //     FactoryAbi,
  //     signer
  //   );
  //   await factoryContract.setGreeting(msgVal);
  //   setMsgVal("");
  //   getGreeting();
  // };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/createproject",
      element: <CreateProject />,
    },
    {
      path: "/freelancers",
      element: <Freelancers />,
    },
    {
      path: "/editprofile",
      element: <EditProfile />,
    },
    {
      path: "/activeprojects",
      element: <ActiveProjects />,
    },
    {
      path: "/gettingstarted",
      element: <GettingStarted />,
    },
  ]);

  return (
    <div>
      <Navbar />
      <RouterProvider router={router}></RouterProvider>
      <Footer />
    </div>
  );
}

export default App;
