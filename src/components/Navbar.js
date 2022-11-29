import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Navbar as BootstrapNavbar } from "react-bootstrap/";
import NavDropdown from "react-bootstrap/NavDropdown";
import Uik from "@reef-defi/ui-kit";
import { Link } from "react-router-dom";
import { faCog } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ checkExtension, checkSigner, connectedWallet }) => {
  console.log(connectedWallet);
  return (
    <BootstrapNavbar bg="light" expand="lg">
      <Container>
        {/* <Uik.Tag color="green" className="tagStyle" text="QuickLance" /> */}
        <Link
          style={{ marginRight: "40px", fontWeight: "500", fontSize: "20px" }}
          to="/"
        >
          QuickLance
        </Link>
        <BootstrapNavbar.Toggle aria-controls="basic-BootstrapNavbar-nav" />
        <BootstrapNavbar.Collapse id="basic-BootstrapNavbar-nav">
          <Nav className="me-auto">
            <Link to={"/createproject"}>Create Project</Link>
            <Link to={"/gettingstarted"}>Getting Started</Link>
            <Link to={"/freelancers"}>Freelancers</Link>
            {/* nav drop down  */}
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item to={"/activeprojects"}>
                Web2 Websites
              </NavDropdown.Item>
              <NavDropdown.Item to={"/activeprojects"}>
                web3 Websites
              </NavDropdown.Item>
              <NavDropdown.Item to={"/activeprojects"}>
                Mobile Apps
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Uik.Button
            text={
              connectedWallet
                ? `${connectedWallet.slice(0, 2)} .... ${connectedWallet.slice(
                    40
                  )}`
                : "Connect Wallet"
            }
            onClick={checkExtension}
          />
          {connectedWallet ? (
            <div style={{ marginLeft: "20px" }}>
              {" "}
              {/* <Link to={"/editprofile"}> */}
              <Uik.Button icon={faCog} size="large" />
              {/* </Link> */}
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
