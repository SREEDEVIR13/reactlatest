import React, { useState, useEffect } from "react";
import "./TripRequest.css";
import Layout from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import * as Icons from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const userID = localStorage.getItem("Uid")

//const userID = "SYT865";
export default function TripsRequest() {
    const [rideRequest, setRideRequest] = useState([]);

    const [rideInvitation, setRideInvitation] = useState([]);
    useEffect(() => {
        myRideRequest();
        RideInvitation();
        // CheckRidesList();
    }, []);


    function myRideRequest() {
        axios
            .get(`https://rideabuddyapi.suyatitech.com/api/RequestHandler/myriderequest?userId=` + userID)
            .then((Response) => {
                setRideRequest(Response.data);
                console.log("ride-request", Response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }

    function RideInvitation() {
        axios
            .get(`https://rideabuddyapi.suyatitech.com/api/RequestHandler/myrideinvitation?userId=` + userID)
            .then((Response) => {
                setRideInvitation(Response.data);
                console.log("ride-invitation", Response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }
    function postStatus() {
        axios
            .post('https://rideabuddyapi.suyatitech.com/api/RequestHandler/myridestatus', {
                statusAccept, statusDeny,

            })
            .then((Response) => {



                console.log(Response);


            })
            .catch((error) => {
                console.log(error);
            });

    }

    const statusCancel = (id) =>{
        console.log("Cancel button :",id)
        axios.post(`https://rideabuddyapi.suyatitech.com/api/Rides/cancelride/${id}`)
        .then((Response) =>{
            console.log(Response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }




    const statusAccept = (id, userID, status) => {

        console.log("status-Accept", userID, id, status)
        const test ={
            'id':id,
            'userId':userID,
            'status':parseInt(status)
        }
        console.log("test values", test)
        axios
        .post('https://rideabuddyapi.suyatitech.com/api/RequestHandler/myridestatus',test)
        .then((Response) => {
            console.log(Response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const statusDeny = (id, userID, status) => {

        console.log("status-deny", id, userID, status)
        const test ={
            'id':id,
            'userId':userID,
            'status':status
        }
        axios
        .post('https://rideabuddyapi.suyatitech.com/api/RequestHandler/myridestatus', test)
        .then((Response) => {
            console.log(Response);
        })
        .catch((error) => {
            console.log(error);
        });
    };
    return (
        <>

            <Layout>

                <div className="request-container">
                    <div className="request-side">
                        <div className="request-title">
                            <h1> My Ride Request</h1>
                        </div>
                        {rideRequest.map((data) => {
                            return (
                                <div key={data} className=" Request-outer-box">
                                    <div className="request-detail">
                                        <div className="request-first">
                                            <div className="request-row1">
                                                <img src={data.profileSrc} className="avatar" /><br></br>
                                            </div>
                                        </div>
                                        <div className="request-first">
                                            <div className="request-row">
                                                <label>  Name: {data.username}  </label>

                                            </div>
                                            <div className="request-row">
                                                <label> From: {data.startLocation} <Icons.FaMapMarkerAlt /></label><br></br>
                                                <label>
                                                    To:  {data.endLocation} <Icons.FaMapMarkerAlt />
                                                </label>
                                            </div>

                                        </div>
                                        <div className="request-first">
                                            <div className="request-row">
                                                <label>  Date:{data.startDate} </label>

                                            </div>
                                            <div className="request-row">
                                                <label> Ride start Time:{data.startTime}</label><br></br>

                                            </div>

                                        </div>
                                        <div className="request-first">
                                            <div className="request-row2">
                                                <label> Ride request Accepted:{data.status} </label>

                                            </div>
                                            <div className="request-row2">
                                                <button className="request-btn1" onClick={() => {
                                                    statusCancel(data.hostedRideId);
                                                    console.log(rideInvitation.hostedRideId) ;
                                                }} >Cancel Ride</button>

                                            </div>

                                        </div>

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="request-side">
                        <div className="request-title">
                            <h1> My  Invitations</h1>
                        </div>

                        {rideInvitation.map((data) => {
                            return (
                                <div key={data} className=" Request-outer-box">
                                    <div className="request-detail">


                                        <div className="request-first">
                                            <div className="request-row1">
                                                <img src={data.profileSrc} className="avatar" /><br></br>
                                            </div>
                                        </div>



                                        <div className="request-first">

                                            <div className="request-row">
                                                <label> From:{data.startLocation} <Icons.FaMapMarkerAlt /></label><br></br>
                                                <label>
                                                    To:  {data.endLocation}<Icons.FaMapMarkerAlt />
                                                </label>
                                            </div>

                                        </div>
                                        <div className="request-first">
                                            <div className="request-row">
                                                <label>  Date:{data.startDate} </label>

                                            </div>
                                            <div className="request-row">
                                                <label> Ride start Time:{data.startTime}</label><br></br>

                                            </div>

                                        </div>
                                        <div className="request-first">
                                            <div className="request-buttons">
                                                <button onClick={() => {
                                                    statusAccept(data.hostedRideId, userID, "1");
                                                }} className="request-btn" >
                                                    Accept
                                                </button>
                                                <br></br>
                                                <button onClick={() => {
                                                    statusDeny(data.hostedRideId, userID, "2");
                                                }}
                                                    className="request-btn">Deny</button>
                                            </div>



                                        </div>

                                    </div>
                                </div>
                            );
                        })}
                    </div>


                </div>



                <Footer></Footer>

            </Layout>
        </>
    );
}



