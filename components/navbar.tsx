import React from "react";
import Link from "next/link";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const NavBar: React.FC<{ role: string; path: string }> = ({ role, path }) => {
  let adminLinks;
  role === "admin"
    ? (adminLinks = (
        <Link href="/manageusers" passHref>
          <Nav.Link active={path === "/manageusers"}>Manage Users</Nav.Link>
        </Link>
      ))
    : null;

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Link href="/">
        <Navbar.Brand href="#home">CCS Honors Awards</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link href="/awards" passHref>
            <Nav.Link active={path === "/awards"}>Awards</Nav.Link>
          </Link>
          <Link href="/writeups" passHref>
            <Nav.Link active={path === "/writeups"}>Writeups</Nav.Link>
          </Link>
          <Link href="/displayawards" passHref>
            <Nav.Link active={path === "/displayawards"}>Awards Table</Nav.Link>
          </Link>
          {adminLinks}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
