import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Header = (props) => {
  return (
    <Navbar className="bg-black" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">MyExpenses</Navbar.Brand>
          <Nav className="m-auto">
            <Nav.Link href="#expense-title">All Expenses</Nav.Link>
            <Nav.Link className="text-danger" onClick={props.onLogOutClicked}>Log Out</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
};
export default Header;
