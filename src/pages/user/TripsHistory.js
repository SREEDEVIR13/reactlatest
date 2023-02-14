import React, { useState, useEffect } from "react";
import "./TripsHistory.css";
import Layout from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import * as Icons from "react-icons/fa";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";

const Id = localStorage.getItem("Uid");
export default function TripsHistory() {
  
  const [joined, setJoined] = useState(false);
  const [hostedHistory,SetHostedHistory]=useState([]);
  const [hosted, sethosted] = useState(false);
  const Navigate = useNavigate();
  useEffect(() => {
    HostedTripHistory();
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

  function HostedTripHistory() {
    axios
      .get(`https://localhost:7149/api/TripHistory/hostedhistory/` +Id)
      .then((Response) => {
        

        SetHostedHistory(Response.data);
        if (Response.data.length === 0) {
          sethosted(true);
        }
        console.log("hosted-history", Response.data);
        
       
      })
      .catch((error) => {
        console.log(error);
      });
     
  }

      const statusJoined = () => {
        setJoined(true);
        Navigate("/joined-trip-history");
      };
  
    return (
        <>

    <Layout> 
    {/* <div className="register-body"> */}
    <div className="trip-history-container">
        <div className="Trip-Histrory-btnGrp">
            <button   style= {{backgroundColor:"grey"}}  className= "trips-Btn">Hosted</button>
            <button   onClick={() => {
                   
                    statusJoined();
                  }}className="trips-Btn">Joined</button>
        </div>
      <div className="trh-title">
        <h1> My Trips History-Hosted</h1>
      </div>
      {hosted && <h2>No wheels found</h2>}
   { !hosted && hostedHistory.map((data) =>{ return(
      <div  key={data.hostedRideId} className="trips-container">
                <div className="trips-top-container">
                  <div className=" trips-outer-box">
                    <div className="trips-detail">
                      <div className="trips-first">
                        <div className="trips-row">
                          <label>  Date:{data.startDate}  </label> 
                          <label>  Time:{data.startTime} </label>
                        </div>
                        <div className="trips-row">
                          <label> From:<Icons.FaMapMarkerAlt className="start"/> {data.startLocation}</label>
                          <label>
                            To:{data.endLocation}  <Icons.FaMapMarkerAlt/>
                          </label>
                        </div>
                        <div className="trips-row1">
                          <label> price: 1000 rs</label><br></br>
                          
                        </div>
                    
                        
                      </div>
                      {/* <div className="trips-first">
                        <div className="trips-row1">
                        <img></img><br></br>
                          <label>Name: </label>
                          <br></br>
                          <label>SYT878 </label>
                          <br></br>
                        </div>
                        <div className="trips-row1">
                          <label> price:</label><br></br>
                          
                        </div>

                      </div>
                      */} 
                      {/* <div className="trips-first">
                      <div className="trips-row1">
                          <label> price:</label><br></br>
                          
                        </div>
                        </div> */}

                    </div>
                  </div>
                </div>
              </div>

       
       );
      })} 
     
{/*
      {/* ); */}
{/* })}  */}
    </div>
{/* </div> */}
    <Footer></Footer>
 
  </Layout>
</>
);
}