import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";

import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { decodeToken } from "react-jwt";
import axios from "axios";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
} from "react-icons/fa";

import "./navbar.css";

const userId = localStorage.getItem("Uid");
function Layout(props) {
  const [login, setLogin] = useState(false);
  const logo =
    "https://github.com/SREEDEVIR13/reactlatest/blob/main/src/images/user-sign-icon-person-symbol-human-avatar-vector-12693195.jpg";
  const Navigate = useNavigate();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState([]);
  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/home-page");
  };
  useEffect(() => {
    UserDetails();
  }, []);

  const UserDetails = () => {
    axios
      .get(`https://localhost:7149/api/User/getuserdetails/` + userId)
      .then((Response) => {
        //setUserDetail(Response.data);
        setUserProfile(Response.data);
        console.log("user-get", Response.data);
        console.log("||", userProfile);
        const storeToken = localStorage.getItem("token");
        if (storeToken !== null || "") {
          setLogin(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const TokenCheck = () => {
  //     const storeToken = localStorage.getItem("token");
  //     if (storeToken === null || "") {
  //       localStorage.clear();
  //       console.log("login redirect");
  //       loginRedirection();
  //     } else {
  //       const { exp } = decodeToken(storeToken);
  //       const expirationTime = exp * 1000 - 60000;
  //       if (Date.now() >= expirationTime) {
  //         localStorage.clear();
  //         loginRedirection();
  //       }
  //     }
  //   };
  function loginRedirection() {
    console.log("Redirected to user login.Please login again");
    Navigate("/user-login");
  }
  const profileDetails = (userId) => {
    Navigate(`/user-details/${userId}`);
  };
  return (
    <>
      {/* <div className='navbar-css'>
                <div className='ImageContainerClassLayout'>
                    <img src="/img/Ride Buddy-logo.png" height="80px" width="200px"></img>
                </div>
                <div className='topCenter'>
                    <ul className='topList'>
                        <li className='topListItem'>
                            <Link className='link' to="/home-page">HOME</Link>
                        </li>
                        <div class="dropdown">
                            <button class="dropbtn">TRIPS</button>
                            <i class="fa fa-caret-down"></i>
                            <div class="dropdown-content">
                                <Link className='ddlink' to="/trip-requests">REQUESTS</Link>
                                <Link className='ddlink' to="/trips-hosted">HOSTED RIDES</Link>
                                <Link className='ddlink' to="/trips-history">TRIP HISTORY</Link>
                            </div>
                        </div>
                        <li className='topListItem'><Link className='link' to="/check-wheels">WHEELS</Link></li>
                    </ul>
                </div>
                <div className='topRight'>
                    <ul className='topList'>
                        <li className='topListItem'>
                        { localStorage.getItem("token")===null?
                        <>
                            <Link className='link' to="/user-login">
                                LOGIN
                            </Link>
                            <Link className='link' to="/add-users">
                                REGISTER
                            </Link>
                            </>:
                            <button className='link' onClick={logoutHandler}>LOGOUT</button>
                        }   
                        </li>
                    </ul>
                </div>


            </div> */}
      <div className="resp">
        <Navbar collapseOnSelect expand="lg">
          <Container>
            <div class="ImageContainerClassLayout2">
              <img
                src="/img/Ride Buddy-logo.png"
                height="80px"
                width="100px"
              ></img>
            </div>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/home-page">HOME</Nav.Link>
                <Nav.Link href="/check-wheels">WHEELS</Nav.Link>

                <NavDropdown title="TRIPS" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/trip-requests">
                    REQUESTS
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/trips-hosted">
                    HOSTED
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/trips-history">
                    HISTORY
                  </NavDropdown.Item>
                </NavDropdown>

                
              </Nav>


              <Nav.Link>
                    {login ? (
                      <img
                        className="user-icon-round"
                        src={userProfile.profileSrc}
                        height={50}
                        width={50}
                      ></img>
                    ) : (
                      <img src={logo}></img>
                    )}
                  </Nav.Link>





              <NavDropdown title={userProfile.fullName} id="collasible-nav-dropdown">
                  

                  <NavDropdown.Item
                    onClick={() => {
                      profileDetails(userProfile.employeeId);
                    }}
                  >
                    My profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>

              


              {localStorage.getItem("token") == (null || "" || undefined) ? (
                <>
                  <Link className="link" to="/user-login">
                    LOGIN
                  </Link>
                </>
              ) : (
                <button className="link" onClick={logoutHandler}>
                  LOGOUT
                </button>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <div className="below-navbar-div">{props.children}</div>
    </>
  );
}
export default Layout;
