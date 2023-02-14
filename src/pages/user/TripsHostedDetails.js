import React, { useState, useEffect } from "react";
import "./TripsHostedDetails.css";
import Layout from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import * as Icons from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";
import { decodeToken } from "react-jwt";

const Id = localStorage.getItem("Uid");

export default function TripsHostedDetails() {
  const [tripHosted, setTripHosted] = useState([]);
  const [rideDetails, setRideDetails] = useState([]);
  const [Hosted, setHosted] = useState(false);

  const Navigate = useNavigate();

  useEffect(() => {
    HostedRidesList();
    console.log("Uid", Id)
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




  function HostedRidesList() {
    axios
      .get(`https://localhost:7149/api/HostRide/getRides/` + Id)
      .then((Response) => {

       
        setTripHosted(Response.data);
        if (Response.data.length === 0) {
          setHosted(true);
        }
        console.log("ride get", Response.data);


      })
      .catch((error) => {
        console.log(error);
      });

  }
  const statusCheck = (id) => {
    axios
      .get(`https://localhost:7149/api/HostRide/getDetailRide?Id=${id}`)
      .then((Response) => {
        console.log("Response1:",Response.data[0].hostedStatus)
        if (Response.data[0].hostedStatus=== 1) {
          console.log("started ride hit")
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
        }
        else {
          Navigate(`/check-ride/${id}`);
        }
      })
    
  };



  return (
    <>
      <Layout>
        <div className="register-body">
          <div className="trip-hosted-container">
            <div className="tp-title">
              <h2>Trips Hosted</h2>
            </div>
            {Hosted && <h2>No Hosted Trips</h2>}
            {!Hosted &&  tripHosted.map((data) => {
              return (
                <div key={data.memberId} className="inside-container">
                  <div className=" tp-outer-box">
                    <div className="tp-detail">
                      <div className="th-first">
                        <div className="th-row"><label>from: {data.startLocation}   <Icons.FaMapMarkerAlt /></label> <br></br></div>
                        <div className="th-row"><label>To:  {data.endLocation}  <Icons.FaMapMarkerAlt /></label></div>
                      </div>
                      <div className="th-first">
                        <div className="th-row1"><label>Date:{data.startDate}</label><br></br></div>
                        <div className="th-row"><label>Start Time: {data.startTime}</label></div>
                      </div>
                      <div className="check-ride-btn">
                        <button onClick={() => {
                          statusCheck(data.id);
                        }} className="th-btn">check ride</button>
                        <button className="checkride-button" onClick={() => {
                          statusCheck(data.id);
                        }}><FaPlayCircle className="playcircle" /></button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* <Footer></Footer> */}

      </Layout>
    </>
  );
}