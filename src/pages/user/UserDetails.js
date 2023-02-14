import React from 'react'
import "./UserDetails.css";
import { useEffect, useState } from "react";
import Layout from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import axios from "axios";

import { AiOutlineMail } from "react-icons/ai"
import {IoIosCall} from "react-icons/io"
import { useParams } from 'react-router-dom';

export default function UserDetails() {
    const {id} = useParams();
    const {userId} = useParams();
    console.log("Uid",id)
    const [userProfile, setUserProfile] = useState([]);

    useEffect(() => {
        profileDetails (userId);
        UserDetails(id);
    }, []);

    const UserDetails = (id) => {
        axios
            .get(`https://localhost:7149/api/User/getuserdetails/` + id)
            .then((Response) => {
                //setUserDetail(Response.data);
                setUserProfile(Response.data)
                console.log("user-get", Response.data)
                console.log("||", userProfile)
            })
            .catch((error) => {
                console.log(error);
            });
    }




    const profileDetails = (userId) => {
        axios
            .get(`https://localhost:7149/api/User/getuserdetails/` + userId)
            .then((Response) => {
                //setUserDetail(Response.data);
                setUserProfile(Response.data)
                console.log("user-get", Response.data)
                console.log("||", userProfile)
            })
            .catch((error) => {
                console.log(error);
            });
    }
    
    return (
        <>
            <Layout>
                <body className="register-body">
                    <div class="register-container">
                        <div class="register-content">
                            <form className="register-form" >
                                <div class="register-user-details">
                                    <div class="input-box">
                                        <img alt='' className="up-profile-image" src={userProfile.profileSrc}></img>
                                        <br></br>
                                        <div className="up-email"><AiOutlineMail/> {userProfile.email}</div>
                                        <div className="up-email"><IoIosCall></IoIosCall> {userProfile.phoneNumber}</div>
                                    </div>
                                    <div class="input-box">
                                        <div className="up-fullname">{userProfile.fullName}</div>
                                        <div className="up-gender">{userProfile.gender}</div>
                                        <div className="up-empId">{userProfile.employeeId}</div>
                                        <br></br>
                                        <div className="up-dept">Department</div>
                                        <div className="up-dept">{userProfile.department}</div>
                                    </div>
                                    <div class="input-box">
                                        <div class="up-fullname">Vehicles</div>
                                        {userProfile.vehicles?.map((data) => {
                                            return (
                                                <>

                                                    <div className="user-profile-vehicle-block">
                                                        <div className="vehicle-block-left">
                                                            <div className="up-vehiclename">{data.vehicleName}</div>
                                                            <div>{data.vehicleNumber}</div>
                                                            <div>Seats:{data.numberOfSeats}</div>
                                                        </div>

                                                        <img alt='' className="up-vehicle-image" src={data.imageSrc}></img>
                                                    </div>

                                                </>
                                            );
                                        })}

                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>

                </body>
                <Footer></Footer>
            </Layout>

        </>
    )
}

