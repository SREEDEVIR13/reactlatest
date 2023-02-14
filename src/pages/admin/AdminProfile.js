import React, { useState, useEffect } from "react";
import Sidebar from '../../components/sidebar/sidebar'
import "./AdminProfile.css";
import * as Icons from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function AdminProfile() {
    const [joined, setJoined] = useState(false);
    const Navigate = useNavigate();

    const statusJoined = () => {
        setJoined(true);
        Navigate("/joined-trip-history");
    };
    return (
        <>
            <Sidebar>
                <div className='adminprofile-container'>
                    <div className='adminprofile-title'> <h1>User profile  <button onClick={statusJoined}><Icons.FaEdit></Icons.FaEdit></button></h1></div>
                    <div className='admin-details'>
                        <div className='adminprofile-top'>

                            <div className='top-first'>
                                <img className='profile-img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBYihAWXxS1QToEvH1rDhk5oOJlgR8IAelpQ&usqp=CAU" alt="" /><br></br>
                                <div className='profile-icons'> <Icons.FaFacebook></Icons.FaFacebook> <Icons.FaTwitter></Icons.FaTwitter> <Icons.FaLinkedinIn></Icons.FaLinkedinIn></div><br></br>
                                <div className='profil-mail'> sreeedevi@suyati.com</div><br></br>
                                <div className='user-number'> 1234567890</div><br></br>
                                <Icons.FaPhone></Icons.FaPhone>

                            </div>
                            <div className='top-first'>

                                <div className="ap-fullname">sreeedevi</div>
                                <div className="ap-gender">female</div>
                                <div className="ap-empId">Syt878</div>

                                <div className="ap-dept">Department</div>
                                <div className="ap-depts">delivery</div>
                                <div className="ap-adr">Adress</div>
                                <div className="ap-adress">suyati lulu kakkanad
                                </div>
                            </div>
                        </div>
                        <br></br>


                        <div className='profile-bottom'>


                            <div className='adminprofile-title'>
                                <h1>Vehicles <button onClick={statusJoined}><Icons.FaEdit></Icons.FaEdit></button></h1>


                            </div>
                            <div className='adminprofile-top'>

                                <div className='bottom-details'>

                                    <div className='bottom-detail-first'>

                                        <div className="ap-vehicle-name">Toyota Matrix</div>
                                        <div className="ap-vehicle-empId">Hatchback</div>

                                        <div className="ap-vehicle-num"> KL67J3848</div>
                                        <div className="ap-vehicle-dept">4 seat</div>
                                    </div>
                                    <div className='bottom-detail-first'>
                                        <img className='' src="https://cdn.pixabay.com/photo/2012/04/12/23/47/car-30984__340.png" alt="" /><br></br>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

            </Sidebar>

        </>
    )
}


