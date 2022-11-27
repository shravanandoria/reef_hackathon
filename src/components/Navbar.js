import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Navbar as BootstrapNavbar } from "react-bootstrap/";
import NavDropdown from "react-bootstrap/NavDropdown";
import Uik from "@reef-defi/ui-kit";
import { useState } from "react";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { Provider, Signer } from "@reef-defi/evm-provider";
import { WsProvider } from "@polkadot/rpc-provider";
import {
  faShieldHalved,
  faBell,
  faBoltLightning,
  faCoins,
  faCog
} from "@fortawesome/free-solid-svg-icons";


const Navbar = () => {
  // const categories = ["Web2 Websites", "Web3 Websites", "Mobile Apps"];
  const [signer, setSigner] = useState();
  const [walletAddress, setWalletAddress] = useState("");
  const [isWalletConnected, setWalletConnected] = useState(false);
  const URL = "wss://rpc-testnet.reefscan.com/ws";
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

      allAccounts[0] && allAccounts[0].address && setWalletConnected(true);

      console.log(allAccounts);

      const wallet = new Signer(evmProvider, allAccounts[0].address, injected);

      // Claim default account
      if (!(await wallet.isClaimed())) {
        console.log(
          "No claimed EVM account found -> claimed default EVM account: ",
          await wallet.getAddress()
        );
        await wallet.claimDefaultAccount();
      }

      console.log({ wallet });

      setSigner(wallet);
    });
  };
  return (
    <BootstrapNavbar bg="light" expand="lg">
      <Container>
        <BootstrapNavbar.Brand href="/">QuickLancer</BootstrapNavbar.Brand>
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
            <Nav.Link href="#home">Create Project</Nav.Link>
            <Nav.Link href="#link">Getting Started</Nav.Link>
            <Nav.Link href="#link">Freelancers</Nav.Link>
            {/* nav drop down  */}
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Web2 Websites</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                web3 Websites
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Mobile Apps</NavDropdown.Item>
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
          {walletAddress ?
            (<div style={{ marginLeft: "20px" }} > <Uik.Button icon={faCog} size='large' /></div>) : ""
          }
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
