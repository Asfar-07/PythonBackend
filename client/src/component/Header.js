import React from "react";
import { useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { NavbarBrand } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setDatalocal, Removeitem } from "../redux/authslice";
import "./Header.css";

export default function Header() {
  var userstate = true;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setDatalocal());
  }, [dispatch]);
  const { user } = useSelector((state) => state.userdata);
  if (user === "null") {
    userstate = true;
  } else {
    userstate = false;
  }
  return (
    <div>
      <Navbar
        expand="lg"
        className="bg-primary"
        style={{ position: "fixed", width: "100%" }}
      >
        <Container className="mx-5 mw-100">
          <NavbarBrand href="/" className="text-light">
            <img
              src="https://digitalsynopsis.com/wp-content/uploads/2018/07/car-logos-bentley.jpg"
              style={{ width: "40px", height: "40px" }}
              alt="Avatar Logo"
              className="rounded-pill mx-3"
            />
            Logo
          </NavbarBrand>
          <Navbar.Toggle />
          <Nav className="m-0 justify-content-end ">
            <Nav.Link className="" href="/">
              Home
            </Nav.Link>
            <Nav.Link href="About">About</Nav.Link>
            <Nav.Link href="Account">Account</Nav.Link>
            {userstate ? (
              <Nav.Link href="Login" className="d-flex bg-dark px-4 rounded ">
                Login
              </Nav.Link>
            ) : (
              <Nav.Link
                href="/"
                className="d-flex bg-dark px-4 rounded "
                onClick={() => {
                  dispatch(Removeitem());
                }}
              >
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}
