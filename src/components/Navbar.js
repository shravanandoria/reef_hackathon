import { React, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Navbar as BootstrapNavbar } from "react-bootstrap/";
import NavDropdown from "react-bootstrap/NavDropdown";
import Uik from "@reef-defi/ui-kit";
import { Link } from "react-router-dom";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch } from "react-redux";
// import { connectWallet } from "../actions/connectWalletSlice";
import { useContext } from "react";
import SignerContext from "../actions/signerContext";
const Navbar = ({ connectedWallet, connecting }) => {
  const { checkExtension, conenctingWallet, address } =
    useContext(SignerContext);

  const [isOpen, setOpen] = useState(false);
  return (
    <BootstrapNavbar bg="light" expand="lg">
      <Container>
        {/* <Uik.Tag color="green" className="tagStyle" text="QuickLance" /> */}
        <Link
          style={{
            marginRight: "40px",
            fontWeight: "500",
            fontSize: "20px",
            textDecoration: "none",
            color: "#5D3BAD",
          }}
          to="/"
        >
          QuickLance
        </Link>
        <BootstrapNavbar.Toggle aria-controls="basic-BootstrapNavbar-nav" />
        <BootstrapNavbar.Collapse id="basic-BootstrapNavbar-nav">
          <Nav className="me-auto">
            <Link
              to={"/createproject"}
              className="headStyle2"
              style={{
                textDecoration: "none",
                color: "#19233c",
                padding: "6px",
              }}
            >
              Create Project
            </Link>
            <Link
              to={"/gettingstarted"}
              className="headStyle2"
              style={{
                textDecoration: "none",
                color: "#19233c",
                padding: "6px",
              }}
            >
              Getting Started
            </Link>
            <Link
              to={"/freelancers"}
              className="headStyle2"
              style={{
                textDecoration: "none",
                color: "#19233c",
                padding: "6px",
              }}
            >
              Freelancers
            </Link>
            <Link
              to={"/activeprojects"}
              className="headStyle2"
              style={{
                textDecoration: "none",
                color: "#19233c",
                padding: "6px",
              }}
            >
              Active Projects
            </Link>
          </Nav>
          {conenctingWallet ? (
            <Uik.Button text="Button" loading size="large" />
          ) : (
            <Uik.Button
              text={
                address
                  ? `${address.slice(0, 2)} .... ${address.slice(40)}`
                  : "Connect Wallet"
              }
              onClick={checkExtension}
            />
          )}

          {address ? (
            <div style={{ marginLeft: "20px" }}>
              {" "}
              <Link to={"/createprofile"}>
                <Uik.Button icon={faCog} size="large" />
              </Link>
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
