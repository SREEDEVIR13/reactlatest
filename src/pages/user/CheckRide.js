import React, { useState, useEffect } from "react";
import Layout from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import * as Icons from "react-icons/fa";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./CheckRide.css";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
// const Id = "1";
const userId = localStorage.getItem("Uid")
export default function CheckRide() {
  const { id } = useParams();
  console.log("useparams", id);
  const Navigate = useNavigate();
  const [CheckRide, setCheckRide] = useState([]);
  const [invited, setInvited] = useState([]);
  const [requested, setRequested] = useState([]);
  const [rideDetails, setRideDetails] = useState([]);

  const [Invitedstatusget, setInvitedStatusget] = useState(false);
  const [Acceptedstatusget, setAcceptedStatusget] = useState(false);
  const [Deniedstatusget, setDeniedStatusget] = useState(false);
  const [invitedBuddy, setinvitedBuddy] = useState(false);
  const [request, setrequest] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState([]);
  const statusStart = (id) => {
    console.log("Start Id:", id)
    axios.get(`https://localhost:7149/api/Rides/startride/${id}`)
      .then((Response) => {
        setRideDetails(Response.data);
        
        console.log("ride-details", Response.data);
        localStorage.setItem("startedRide", JSON.stringify(Response.data));
      })
      .catch((error) => {
        console.log(error);
      });

    Navigate("/start-ride");
  };
  useEffect(() => {
    CheckRidesList(id);
    InvitedDetail(id);
    TokenCheck();
 
    GetPhoneNumber();
  }, []);
  const TokenCheck = () => {

    const storeToken = localStorage.getItem("token");
    if (storeToken === null || "") {
      localStorage.clear();
      //LoginRedirect();
      console.log("login redirect")
      Navigate("/home-page")
    }

  }

  function CheckRidesList(id) {
    axios
      .get(`https://localhost:7149/api/HostRide/getDetailRide?Id=${id}`)
      .then((Response) => {
        setCheckRide(Response.data);
        console.log(" get-checkRide", Response.data);
        var url1 = `https://localhost:7149/api/RequestHandler/getalljoinrequest?userId=${userId}`
        var url2 = `&hostedRideId=${id}`

        var getUrl = url1 + url2;
        console.log("url", getUrl)
        axios
          .get(getUrl)
          .then((Response) => {
            setRequested(Response.data);
            axios.get()
            // onData(Response.data);
            onLoad(Response.data);
            // console.log("statusget", invited.status);
            console.log("requests-get", Response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const statusAccept = (id, userID, status) => {

    console.log("status-Accept", userID, id, status)
    const test = {
      'userId': userID,
      'status': parseInt(status),
      'hostedRideId': id,


    }
    console.log("test values", test)
    axios
      .post('https://localhost:7149/api/RequestHandler/acceptjoinrequest', test)
      .then((Response) => {
        console.log(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onLoad = (item) => {
    item.map((items) => {
      console.log("itemstatus", items.status)
      if (items.status === 0) {
        setInvitedStatusget(true);
      } else if (items.status === 1) {
        setAcceptedStatusget(true);
      } else if (items.status === 2) {
        setDeniedStatusget(true);
      }

    });
  };


  function InvitedDetail() {
    let token = localStorage.getItem("token");
    const headers = {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    }
    axios
      .get(`https://localhost:7149/api/HostRide/getInvitedUsers?Id=${id}`, { headers })
      .then((Response) => {
        setInvited(Response.data);
        if (Response.data.length === 0) {
          setinvitedBuddy(true);
        }
        onLoad(Response.data);
        console.log("Invites-get", Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function GetPhoneNumber(e,userID) {
    axios
      .get(`https://localhost:7149/api/Call/getNumber/` + userID)
      
      .then((Response) => {
        setPhoneNumber(Response.data);
        console.log("number-get", Response.data);
        console.log("store",phoneNumber);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const setModalClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Layout>

        <div className="trip-check-container">
          {/* {console.log(zero)} */}
          <div className="cr-title">
            <h2>Check Rides</h2>
          </div>
         
          { CheckRide.map((data) => {
            return (
              <div key={data.id} className="cr-container">
                <div className="cr-top-container">
                  <div className=" cr-outer-box">
                    <div className="cr-detail">
                      <div className="cr-first">
                        <div className="cr-row">
                          <label>
                            From: {data.startLocation}  <Icons.FaMapMarkerAlt />
                          </label>
                          <br></br>
                        </div>
                        <div className="cr-row">
                          <label>
                            To: {data.endLocation}  <Icons.FaMapMarkerAlt />
                          </label>
                        </div>
                      </div>
                      <div className="cr-first">
                        <div className="cr-row">
                          <label>Number of seat Left: {data.numberOfSeatsLeft}</label>
                          <br></br>
                        </div>
                      </div>
                      <div className="check-buttons">
                        <button onClick={() => {
                          statusStart(data.id);
                        }} className="cr-btn">
                          Start Ride
                        </button>
                        {/* <br></br> */}
                        {/* <button className="cr-btn">Cancel Ride</button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="cr-title">
            <h2>You Invited Them To join</h2>
          </div>
          {/* {nodata && <p>No invited Members</p>}
          {data &&  */}
          <div className="cr-middile-container">
          {invitedBuddy && <h2>You haven't invited anyone yet</h2>}
            {!invitedBuddy && invited.map((data) => {
              return (
                <div key={data.InvitationId} className="crm-outerbox">
                  {/* <div className="crm-details"> */}
                  <div className="crm-row">

                    <img alt="" src={data.imageSrc} className="avatar" />

                    {data.fullName}


                    <div className="crm-column">
                      {data.status === 0 && <p> STATUS:Invited </p>}
                      {data.status === 1 && <p> STATUS :Accepted </p>}
                      {data.status === 2 && <p> STATUS :Turned Down </p>}

                    </div>
                  </div>
                </div>
              );
            })}
          </div>


          {/* } */}
          <div className="cr-bottom-container">
            <div className="cr-title">
              <h2>They are requesting to join your Pool</h2>
            </div>

            <div className="cbc-outer-box">
              <div className="cbc-details">
                {/* <div className="cbc-first">
                  <div className="cbc-icon">

                    <Icons.FaUser /> <br></br>
                  </div>
                  <div className="cbc-icon">

                    <Icons.FaPhone />
                  </div>
                </div>
                <div className="cbc-first">
                  <div className="cbc-row">
                    <label>john</label>
                  </div>
                  <div className="cbc-row">
                    <label>from: </label><br></br>
                    <label>To:</label>
                  </div>
                </div> */}
                {requested.map((data) => {
                  return (
                    <>
                      <div className="cbc-first">
                        <div className="cbc-icon">

                          <img alt="" src={data.profileSrc} className="avatar" /><br></br>
                        </div>
                        <div className="cbc-icon">

                          < Icons.FaPhone 
              
                  onClick={() => {
                    setOpenModal(true);
                    GetPhoneNumber();
                  }}
                />
                
                <Modal show={openModal} onHide={setModalClose}  className='modalContainer'>
                  <Modal.Header>
                    <Modal.Title>Phone Number</Modal.Title>
                    <div className='titleCloseBtn'> <button onClick={()=> setModalClose(false)}> x</button></div>
                  </Modal.Header>
                  <Form  onSubmit={(e) => GetPhoneNumber(e, (data.userID))}
                    >
                  <Modal.Body className="title">
                    
                  <label> {data.number}</label>
                      
                  </Modal.Body>
                  <Modal.Footer className='footer' >
                    <div>
                      <button type="submit" id="YesBtn">
                        ok
                      </button>
                     
                    </div>
                  </Modal.Footer>
                  </Form>
                </Modal>
                
                        </div>
                      </div>
                      <div className="cbc-first">
                        <div className="cbc-row">
                          <label>{data.username}</label>
                        </div>
                        <div className="cbc-row">
                          <label>from:{data.startLocation}</label><br></br>
                          <label>To:{data.endLocation}</label>
                        </div>
                      </div>


                      <div className="cbc-first">
                        {data.requestStatus === 0 ?
                          <>
                            <button onClick={() => {
                              statusAccept(data.hostedRideId, data.userId, "1");
                            }} className="request-btn" >
                              Accept
                            </button>
                            <br></br>
                            <button onClick={() => {
                              statusAccept(data.hostedRideId, data.userId, "2");
                            }}
                              className="request-btn">Deny</button>
                          </> :
                          <>
                            {
                              data.requestStatus === 1 ?
                                <>
                                  <div className="request-buttons">
                                    <p>Accepted</p>
                                  </div>
                                </> :
                                <>
                                  <div className="request-buttons">
                                    <p>Denied</p>
                                  </div>
                                </>
                            }
                        </>
                        }
                    </div>
                    </>
              );
                })}
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </Layout>
    </>
  );
}