import React, { useState, useEffect } from "react";
import "./JoinedTripHistory.css";
import Layout from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import * as Icons from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";

const Id = localStorage.getItem("Uid");

export default function JoinedTripHistory() {

    const [hosted, setHosted] = useState(false);
    const [joinedHistory,SetJoinedHistory]=useState([]);
    const [joined, setjoined] = useState(false);
  
    const Navigate = useNavigate();
    useEffect(() => {
        JoinedTripHistory();
        TokenCheck();
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
    
    function JoinedTripHistory() {
        axios
          .get(`https://localhost:7149/api/TripHistory/joinedhistory/` + Id)
          .then((Response) => {
            
     if (Response.data.length === 0) {
        setjoined(true);
        }
            SetJoinedHistory(Response.data);
            console.log("joined-history", Response.data);
            
           
          })
          .catch((error) => {
            console.log(error);
          });
         
      }
   
    const statusHosted = () => {
        setHosted(true);
        Navigate("/trips-history");
    };

    return (
        <>

            <Layout>
                {/* <div className="register-body"> */}
                <div className="joined-history-container">
                    <div className="joined-Histrory-btnGrp">
                        <button onClick={() => {

                            statusHosted();
                        }} className="joined-Btn">Hosted</button>
                        <button style={{ backgroundColor: "grey" }} className="joined-Btn">Joined</button>
                    </div>
                    <div className="joined-title">
                        <h1> My Trips History-joined</h1>
                    </div>
                    {joined && <h2>No Joined Rides</h2>}
                    { !joined && joinedHistory.map((data) =>{ return(
                    <div className="joined-container">
                      
                            <div className=" joined-outer-box">
                                <div className="joined-detail">


                                    <div className="joined-first">
                                        <div className="joined-row1">
                                        <img className='joined-img' src={data.ProfileSrc}alt="" />
                                        </div>
                                    </div>



                                    <div className="joined-first">
                                        <div className="joined-row">
                                            <label>  Name:{data.hostName} </label>

                                        </div>
                                        <div className="joined-row">
                                            <label> From: {data.startLocation}<Icons.FaMapMarkerAlt /></label><br></br>
                                            <label>
                                                To: {data.endLocation}  <Icons.FaMapMarkerAlt />
                                            </label>
                                        </div>

                                    </div>
                                    <div className="joined-first">
                                        <div className="joined-row">
                                            <label>  price: </label>

                                        </div>
                                        <div className="joined-row">
                                            <label> Date:{data.startDate}</label><br></br>
                                            <label>
                                                Time:{data.startTime}
                                            </label>
                                        </div>

                                    </div>


                                </div>
                            </div>
                        </div>
                   


);
})} 


                </div>
                {/* </div> */}
                <Footer></Footer>

            </Layout>
        </>
    );
}


