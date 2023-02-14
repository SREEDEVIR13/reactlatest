import Sidebar from "../../components/sidebar/sidebar";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom/dist";
import axios from "axios";
import "./UserManage.css"
import { decodeToken } from "react-jwt";
import swal from "sweetalert";
import Layout from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

export default function UserManage() {
    const [VehicleList, setVehicleList] = useState([])
    const navi = useNavigate();

    useEffect(() => {
        refreshUserList();
        TokenCheck();
    }, [])



    const refreshUserList = () => {
        //TokenCheck();

        axios.get('https://rideabuddyapi.suyatitech.com/api/registration/getallusers')
            .then((Response) => {
                console.log(Response.data)
                setVehicleList(Response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
  



    const TokenCheck = () => {

        const storeToken = localStorage.getItem("token");
        if (storeToken === null || "") {
            localStorage.clear();
            console.log("login redirect")
            loginRedirection();
        } else {
            const { exp } = decodeToken(storeToken);
            const expirationTime = exp * 1000 - 60000;
            if (Date.now() >= expirationTime) {
                localStorage.clear();
                loginRedirection();
            }
        }

    }
    function loginRedirection() {
        console.log("redirection done")
        navi('/admin-login')
    }

    return (
        <>
            {/* <Sidebar>
        <div className="header-div">
                <h1>User Management</h1>
            </div>

            <div className="main-div-content">


                <div className="list">
                    {
                        VehicleList.map(data => {
                            return (
                                <div key={data} className="card-div">
                                   
                                    <div className="card-body-div">


                                    <div className="card-image-div">
                                        
                                            <img src={data.profileSrc} className="image-property" />
                                        </div>


                                    <div className="fullname-div">
                                                <h2> {data.firstName}</h2>
                                                <div> {data.lastName}</div>
                                            </div>


                                   
                                            <div className="body-info-div">
                                                <label>Email:</label>
                                                <div> {data.email}</div>
                                            </div>

                                            <div className="body-info-div">
                                                <label>Department:</label>
                                                <div> {data.department}</div>
                                            </div>
                                            <div className="body-info-div">
                                                <label>Number:</label>
                                                <div> {data.number}</div>
                                            </div>
                                        <div>
                                            <div className="body-info-div">
                                                <label>Id:</label>
                                                <div> {data.employeeId}</div>
                                            </div>
                                            <div className="body-info-div">
                                                <label>Gender:</label>
                                                <span> {data.gender}</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>


                            )

                        })
                    }
                </div>
            </div>
        </Sidebar> */}

<Sidebar>
            <div className='admincurrentTrips-container'>
                <div className='table-hosted-container'>
                    <Table className="trip-hosted-table">
                    {/* {Invitedstatusget && <h2>No Data Found</h2>} */}
                    
                        {<Thead className="trip-previous-head">
                            <Tr className="trip-previous-tr">
                                <Th className="trip-previous-th"></Th>
                                <Th className="trip-previous-th">Name</Th>
                                <Th className="trip-previous-th">FRom Place</Th>
                                <Th className="trip-previous-th">To place</Th>
                                <Th className="trip-previous-th">Date</Th>
                                <Th className="trip-previous-th">Time</Th>
                            </Tr>
                        </Thead>}
                        {/* {tripData.map((data) => {
                            return (<> */}
                        <Tbody className="trip-previous-tb">
                            <Tr className="trip-previous-tr">
                                <Td className="trip-previous-td"> <img src={""} alt="" /> </Td>
                                <Td className="trip-previous-td">{}</Td>
                                <Td className="trip-previous-td">{}</Td>
                                <Td className="trip-previous-td">{}</Td>
                                <Td className="trip-previous-td">{}</Td>
                                <Td className="trip-previous-td">{}</Td>
                            </Tr>
                        </Tbody>
                        {/* )
                    })} */}
                    </Table>
                </div>
            </div>

            </Sidebar>
        </>
    )
}