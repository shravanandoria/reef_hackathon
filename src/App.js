import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import EditProfile from "./pages/EditProfile";
import CreateProject from "./pages/CreateProject";
import Freelancers from "./pages/Freelancers";
import ActiveProjects from "./pages/ActiveProjects";
import GettingStarted from "./pages/GettingStarted";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { Provider, Signer } from "@reef-defi/evm-provider";
import { WsProvider } from "@polkadot/rpc-provider";

import { useContext } from "react";
import SignerContext from "./signerContext";
import Project from "./pages/Project";
import CreateProfile from "./pages/CreateProfile";

function App() {
  const routes = [
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
    {
      path: "/project",
      element: <Project />,
    },
    {
      path: "/createprofile",
      element: <CreateProfile />,
    },
  ];

  const { setSignerState } = useContext(SignerContext);

  const [signer, setSigner] = useState();
  const [connecting, setConnecting] = useState(false);
  const [isWalletConnected, setWalletConnected] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState("");
  

  const URL = "wss://rpc-testnet.reefscan.com/ws";

  const checkExtension = async () => {
    console.log("checking reef extension");
    setConnecting(true);
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

      console.log(allAccounts);
      setConnectedWallet(allAccounts[0]);

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
      setSignerState(wallet);
      localStorage.setItem("walletConnected", true);
      setConnecting(false);
    });
  };

  const checkSigner = async () => {
    if (!signer) {
      await checkExtension();
    }
    return true;
  };

  return (
    <div>
      <Navbar
        checkExtension={checkExtension}
        checkSigner={checkSigner}
        connectedWallet={connectedWallet.address}
        connecting = {connecting}
      />
      <Routes>
        {routes.map((e, index) => (
          <Route key={index} path={e.path} element={e.element}  />
        ))}
      </Routes>
      <Footer />
      {/* <RouterProvider router={router}></RouterProvider> */}
    </div>
  );
}

export default App;
