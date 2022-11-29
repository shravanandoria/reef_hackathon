import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Navbar as BootstrapNavbar } from "react-bootstrap/";
import NavDropdown from "react-bootstrap/NavDropdown";
import Uik from "@reef-defi/ui-kit";
import { useEffect, useState } from "react";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { Provider, Signer } from "@reef-defi/evm-provider";
import { WsProvider } from "@polkadot/rpc-provider";
import { Link } from "react-router-dom";
import {
  faCog,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  // const categories = ["Web2 Websites", "Web3 Websites", "Mobile Apps"];
  const [signer, setSigner] = useState();
  const [walletAddress, setWalletAddress] = useState("");
  const [isWalletConnected, setWalletConnected] = useState(false);
  const URL = "wss://rpc-testnet.reefscan.com/ws";

  useEffect(() => {
    const WalletConnect = localStorage.getItem("walletStatus");
    setWalletConnected(WalletConnect);
    if (!isWalletConnected) checkExtension();
  })

  const checkExtension = async () => {
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
      setWalletAddress(allAccounts[0].address);

      localStorage.setItem("walletStatus", true);
      allAccounts[0] && allAccounts[0].address && setWalletConnected(true);

      // console.log(allAccounts);

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
      // localStorage.setItem("signer", wallet);
    });
  };

  return (
    <BootstrapNavbar bg="light" expand="lg">
      <Container>
        {/* <Uik.Tag color="green" className="tagStyle" text="QuickLance" /> */}
        <Nav.Link style={{ marginRight: "40px", fontWeight: "500", fontSize: "20px" }} href="/">QuickLance</Nav.Link>
        <BootstrapNavbar.Toggle aria-controls="basic-BootstrapNavbar-nav" />
        <BootstrapNavbar.Collapse id="basic-BootstrapNavbar-nav">
          <Nav className="me-auto">
            {/* {categories.map((e, key) => (
              <>
                <Nav.Link href="#home" key={key}>
                  {e}
                </Nav.Link>
              </>
            ))} */}
            <Nav.Link href={"/createproject"}>Create Project</Nav.Link>
            <Nav.Link href={"/gettingstarted"}>Getting Started</Nav.Link >
            <Nav.Link href={"/freelancers"}>Freelancers</Nav.Link>
            {/* nav drop down  */}
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item href={"/activeprojects"}>
                Web2 Websites
              </NavDropdown.Item>
              <NavDropdown.Item href={"/activeprojects"}>
                web3 Websites
              </NavDropdown.Item>
              <NavDropdown.Item href={"/activeprojects"}>
                Mobile Apps
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Uik.Button
            text={
              walletAddress
                ? `${walletAddress.slice(0, 2)} .... ${walletAddress.slice(40)}`
                : "Connect Wallet"
            }
            onClick={checkExtension}
          />
          {walletAddress ? (
            <div style={{ marginLeft: "20px" }}>
              {" "}
              <Nav.Link href={"/editprofile"}>
                <Uik.Button icon={faCog} size="large" />
              </Nav.Link >
            </div>
          ) : (
            ""
          )}
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
