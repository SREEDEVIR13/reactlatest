import React, { useState, useEffect } from "react";
import Layout from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import * as Icons from "react-icons/fa";
import { decodeToken } from "react-jwt";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./StartRide.css";
import swal from "sweetalert";



var temp = JSON.parse(localStorage.getItem("startedRide"));
export default function StartRide() {

  const [rideData, setRideData] = useState([])
  
  console.log("get-setridedata", rideData);
  const Navigate =useNavigate()

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("startedRide"));
    console.log("temp:", temp)
    setRideData(temp)
    console.log("ride-data",rideData);
  }, [])

  const statusEnd = (id) =>{
    axios.post(`https://localhost:7149/api/Rides/endride/${id}`)
    .then((Response) => {
        localStorage.removeItem("startedRide");
        swal({
          title: "Success",
          text: "Ride Ended Successfully",
          icon: "success",
        });
        Navigate('/home-page')
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <><Layout>
      <div className="trip-start-ride">

        
        
            <div className="sr-container">
          <div className="sr-top-container">
            <div className=" sr-outer-box">
              <div className="sr-detail">
                <div className="sr-first">
                  <div className="sr-row"><h4><Icons.FaMapMarkerAlt />{rideData.startLocation} </h4> <br></br></div>
                  <div className="sr-row"><h4><Icons.FaMapMarkerAlt />{rideData.endLocation}</h4></div>
                </div>
                <div className="sr-first">
                  <div className="sr-row"> <h4>Seats Left:{rideData.numberOfSeatsLeft}</h4><br></br></div>

                </div>
                <div className="start-button">
                  <button className="sr-btn" onClick={() => {
                          statusEnd(rideData.hostedRideId);
                          
                        }}>End Ride</button><br></br>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sr-middile">
          <div className="sr-left-side">
            <div className="sr-left-data">
              <div className="sr-data"> To be Recieved</div>
              <div className="sr-data"> Rs 90.00</div>

            </div>
          </div>


          <div className="sr-bottom-container">
            <div className="sr-title">
              <h2>co-passengers</h2>
            </div>

            {rideData.users?.map((data) => {
          return (
            <>
            <div className="sbc-outer-box">
              <div className="sbc-details">
                <div className="sbc-first">
                  <div className="sbc-icon"> <Icons.FaUser /> <br></br></div>
                  <div className="sbc-icon"> Name: {data.name}</div>
                  <div className="sbc-icon">   <Icons.FaPhone /></div>
                </div>
                <div className="sbc-first">
                  <div className="sbc-row"><h4>rs 30.00</h4> </div>
                  <div className="sbc-row"><h4>paid: </h4>

                  </div>
                </div>

              </div>
            </div>
            

            </>
          )
        })}

          </div>
        </div>

      </div>
    </Layout>
    </>
  )




}
