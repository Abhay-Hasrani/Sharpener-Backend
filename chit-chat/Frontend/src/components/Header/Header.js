import { Button, Container, Nav, Navbar } from "react-bootstrap";
import "./Header.css";
import { useState } from "react";
import CreateGroupModel from "../UI/CreateGroupModel";
const Header = (props) => {
  const [showGroupModal, setShowGroupModal] = useState(false);
  function toggleModalVisibility() {
    setShowGroupModal(!showGroupModal);
  }

  return (
    <>
      <Navbar className="header-container">
        <Container>
          <Navbar.Brand href="#home" className="fw-bolder">
            <img
              src="/chat-png-hd.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt=""
            />
            Chit-Chat
          </Navbar.Brand>
          <Nav className="m-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link
              as={Button}
              onClick={() => setShowGroupModal(!showGroupModal)}
            >
              Create Group
            </Nav.Link>
            <Nav.Link className="text-danger" onClick={props.onLogOutClicked}>
              Log Out
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <CreateGroupModel
        modalVisibility={showGroupModal}
        toggleModalVisibility={toggleModalVisibility}
      />
    </>
  );
};
export default Header;
