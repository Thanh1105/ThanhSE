import React, { useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../../login/fire";
import Login from "../../../../login/login";
import { getAuth, signOut } from "firebase/auth";
import { Cookies } from 'react-cookie';
const Header = () => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const cookie = new Cookies();
  const [isLogin, setIsLogin] = useState(cookie.get('token') === undefined ? false : true);
  const logout = () => {
    signOut(auth);
    cookie.remove('token');
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div>
      <Navbar
        fixed="top"
        collapseOnSelect
        expand="lg"
        bg="white"
        className="position-relative"
      >
        <Container>
          <Navbar bg="white">
            <Container>
              <Navbar.Brand href="#home">
                <img
                  src="https://res.cloudinary.com/da0i1amaa/image/upload/v1653128960/Logo_2_ji0who.png"
                  width="200px"
                  height="80px"
                  className="d-inline-block align-top mx-lg-3"
                  alt="Logo"
                />
              </Navbar.Brand>
            </Container>
          </Navbar>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#about" className="me-lg-3 me-md-3">
                About us
              </Nav.Link>
              <NavDropdown
                title="Borrowers"
                id="collasible-nav-dropdown-borrow"
                className="me-lg-3 me-md-4"
              >
                <NavDropdown.Item href="#action/3.1">
                  Borrow now
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.2">
                  Borrower's Guide
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title="Investors"
                id="collasible-nav-dropdown-invest"
                className="me-md-2"
              >
                <NavDropdown.Item href="#action/3.1">
                  Invest now
                </NavDropdown.Item>
                <NavDropdown.Divider variant="green" />
                <NavDropdown.Item href="#action/3.2">
                  Investor's Guide
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              {!isLogin ? (
                <>
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog ">
                      <div className="modal-content modal-container ">
                        <div className="modal-body body-modal">
                          <Login />
                        </div>
                      </div>
                    </div>
                  </div>
                  <p
                    className="btn btn-success login rounded-pill mx-md-5 my-md-2 me-lg-4 px-4"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Login
                  </p>
                </>
              ) : (
                <p
                  onClick={logout}
                  className="btn btn-success login rounded-pill me-lg-4 px-4"
                  href="#"
                  role="button"
                >
                  Logout
                </p>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
