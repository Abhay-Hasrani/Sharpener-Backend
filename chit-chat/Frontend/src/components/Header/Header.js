import { Container, Nav, Navbar } from "react-bootstrap";
import "./Header.css";
const Header = (props) => {
  return (
    <Navbar className="header-container">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src="..\..\..\public\logo192.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
          />
          Chit-Chat
        </Navbar.Brand>
        <Nav className="m-auto">
          <Nav.Link href="#">Home</Nav.Link>
          <Nav.Link className="text-danger" onClick={props.onLogOutClicked}>
            Log Out
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Header;
