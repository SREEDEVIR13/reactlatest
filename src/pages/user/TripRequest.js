import React, { useState, useEffect } from "react";
import "./TripRequest.css";
import Layout from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import * as Icons from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { decodeToken } from "react-jwt";

const userID = localStorage.getItem("Uid");

//const userID = "SYT865";
export default function TripsRequest() {
  const [rideRequest, setRideRequest] = useState([]);
  const [request, setrequest] = useState(false);
  const [Invitation, setInvitation] = useState(false);
  const Navigate = useNavigate();

  const [rideInvitation, setRideInvitation] = useState([]);
  useEffect(() => {
    myRideRequest();
    RideInvitation();
    TokenCheck();
    // CheckRidesList();
  }, []);

  const TokenCheck = () => {
    const storeToken = localStorage.getItem("token");
    if (storeToken === null || "") {
      localStorage.clear();
      //LoginRedirect();
      console.log("login redirect");
      loginRedirection();
    } else {
      const { exp } = decodeToken(storeToken);
      const expirationTime = exp * 1000 - 60000;
      if (Date.now() >= expirationTime) {
        localStorage.clear();
        //LoginRedirect();
        loginRedirection();
      }
    }
  };
  function loginRedirection() {
    console.log("Redirected to user login.Please login again");
    Navigate("/user-login");
  }

  function myRideRequest() {
    axios
      .get(
        `https://localhost:7149/api/RequestHandler/myriderequest?userId=` +
          userID
      )
      .then((Response) => {
        setRideRequest(Response.data);
        if (Response.data.length === 0) {
          setrequest(true);
        }
        console.log("ride-request", Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function RideInvitation() {
    axios
      .get(
        `https://localhost:7149/api/RequestHandler/myrideinvitation?userId=` +
          userID
      )
      .then((Response) => {
        setRideInvitation(Response.data);
        if (Response.data.length === 0) {
          setInvitation(true);
        }
        console.log("ride-invitation", Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function postStatus() {
    axios
      .post("https://localhost:7149/api/RequestHandler/myridestatus", {
        statusAccept,
        statusDeny,
      })
      .then((Response) => {
        console.log(Response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const statusCancel = (id) => {
    console.log("Cancel button :", id);
    axios
      .post(`https://localhost:7149/api/Rides/cancelride/${id}`)
      .then((Response) => {
        console.log(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const poolCancel = (id) => {
    console.log("Cancel pool:", id);
    const data = {
      hostedRideId: id,
      joineeId: userID,
    };
    console.log("Post data", data);
    axios
      .post(`https://localhost:7149/api/Rides/cancelpool`, data)
      .then((Response) => {
        console.log(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const statusAccept = (id, userID, status) => {
    console.log("status-Accept", userID, id, status);
    const test = {
      id: id,
      userId: userID,
      status: parseInt(status),
    };
    console.log("test values", test);
    axios
      .post("https://localhost:7149/api/RequestHandler/myridestatus", test)
      .then((Response) => {
        console.log(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const statusDeny = (id, userID, status) => {
    console.log("status-deny", id, userID, status);
    const test = {
      id: id,
      userId: userID,
      status: status,
    };
    axios
      .post("https://localhost:7149/api/RequestHandler/myridestatus", test)
      .then((Response) => {
        console.log(Response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const profileDetails = (userId) => {
    Navigate(`/user-details/${userId}`);
  };

  return (
    <>
      <Layout>
        <>
          <div className="request-container">
            <div className="request-right">
              <div className="request-title">
                <h1> My Ride Request</h1>
              </div>
              {request && <h2>No Request</h2>}
              {!request && rideRequest.map((data) => {
                return (
                  <div key={data} className=" Request-outer-box">
                    <div className="request-detail">
                      <div className="request-first">
                        <div className="request-row1">
                          <img
                            src={data.profileSrc}
                            onClick={() => {
                              profileDetails(data.userId);
                            }}
                            className="avatar"
                          />
                          <br></br>
                        </div>
                      </div>
                      <div className="request-first">
                        <div className="request-row">
                          <label>{data.username} </label>
                        </div>
                        <div className="request-row">
                          <label>
                     
                            <Icons.FaMapMarkerAlt />
                            {data.startLocation}
                          </label>
                          <br></br>
                          <label>
                         
                            <Icons.FaMapMarkerAlt />
                            {data.endLocation}
                          </label>
                          <br></br>
                        </div>
                      </div>
                      <div className="request-first">
                        <div className="request-row">
                          <label>On:{data.startDate} </label>
                        </div>
                        <div className="request-row">
                          <label>Starting:{data.startTime}</label>
                          <br></br>
                        </div>
                      </div>
                      <div className="request-first">
                        <div className="request-row2">
                          <div>
                          
                            {data.status === 0 && <p>Pending</p>}
                            {data.status === 1 && <p>Accepted</p>}
                            {data.status === 2 && <p>Turned Down</p>}
                            {data.status === 3 && <p>Canceled</p>}
                          </div>
                        </div>
                        <div className="request-row2">
                          <button
                            className="request-btn1"
                            onClick={() => {
                              poolCancel(data.hostedRideId);
                              console.log(rideInvitation.hostedRideId);
                            }}
                          >
                            Cancel Pool
                          </button>
                          <button
                            className="request-btn2"
                            onClick={() => {
                              poolCancel(data.hostedRideId);
                              console.log(rideInvitation.hostedRideId);
                            }}
                          >
                            <MdOutlineCancel className="mdoutlinecancel"></MdOutlineCancel>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="request-right">
              <div className="request-title">
                <h1> My Invitations</h1>
              </div>
              {Invitation && <h2>No New Invitation</h2>}
              {!Invitation && rideInvitation.map((data) => {
                return (
                  <div key={data} className=" Request-outer-box">
                    <div className="request-detail">
                      <div className="request-first">
                        <div className="request-row1">
                          <img
                            src={data.profileSrc}
                            onClick={() => {
                              profileDetails(data.userId);
                            }}
                            className="avatar"
                          />
                          <br></br>
                        </div>
                      </div>

                      <div className="request-first">
                        <div className="request-row">
                          <label>
                            From:{data.startLocation} <Icons.FaMapMarkerAlt />
                          </label>
                          <br></br>
                          <label>
                            To: {data.endLocation}
                            <Icons.FaMapMarkerAlt />
                          </label>
                        </div>
                      </div>
                      <div className="request-first">
                        <div className="request-row">
                          <label> Date:{data.startDate} </label>
                        </div>
                        <div className="request-row">
                          <label> Ride start Time:{data.startTime}</label>
                          <br></br>
                        </div>
                      </div>
                      <div className="request-first">
                        {data.status === 0 ? (
                          <div className="request-buttons">
                            <button
                              onClick={() => {
                                statusAccept(data.hostedRideId, userID, "1");
                              }}
                              className="request-btn"
                            >
                              Accept
                            </button>
                            <br></br>
                            <button
                              onClick={() => {
                                statusDeny(data.hostedRideId, userID, "2");
                              }}
                              className="request-btn"
                            >
                              Deny
                            </button>
                          </div>
                        ) : (
                          <>
                            {data.status === 1 ? (
                              <>
                                <div className="request-buttons">
                                  <p>Accepted</p>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="request-buttons">
                                  <p>Denied</p>
                                </div>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Footer></Footer>
        </>
      </Layout>
    </>
  );
}
