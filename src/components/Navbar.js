import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function BasicExample() {
  const categories = ["Web2", "Web2", "Mobile Apps"];
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">QuickLancer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {categories.map((e) => (
              <>
                <Nav.Link href="#home">{e}</Nav.Link>
              </>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
