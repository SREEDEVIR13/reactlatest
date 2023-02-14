import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import './AdminTripManagement.css'

import { useNavigate } from "react-router-dom";

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import axios from 'axios'
export default function AdminTripManagement() {
    // const [list,setList] =useState([])
    const [tripData, setTripData] = useState([])
    const [Invitedstatusget, setInvitedStatusget] = useState(false);
    const Navigate = useNavigate();

    // useEffect(() => {
    //     setList([...employees])
    //   }, []);


    const HostedTrips = () => {

        Navigate("/admin-trips-hosted");
    };
    const PreviousTrips = () => {

        Navigate("/admin-trips-previous");
    };
    function getCurrentTrips() {
        axios.get('https://rideabuddyapi.suyatitech.com/api/AdminTrips/getcurrenttrips')
            .then((Response) => {
                setTripData(Response.data);
                if(Response.data.length === 0){
                    setInvitedStatusget(true);
                }
                console.log("Data:", Response.data);
            })

    }
    


    useEffect(() => {
        getCurrentTrips();
    }, [])
    return (

        <>
            <Sidebar>
            <div className='admincurrentTrips-container'>

                <div className='Admin-tripHistory-buttons' >
                    <button style={{ backgroundColor: "grey" }} className='admin-history-btn'>Current Trips</button>
                    <button onClick={() => {

                        HostedTrips();
                    }} className='admin-history-btn'>Hosted Trips</button>
                    <button onClick={() => {

                        PreviousTrips();
                    }} className='admin-history-btn'>Previous Trips</button>
                </div>

                <div className='table-previous-container'>
                {console.log("treu or false :",Invitedstatusget)}
                   

                    <Table className="trip-previous-table">
                    {Invitedstatusget && <h2>No Wheels Registered</h2>}
                                    {!Invitedstatusget && <Thead className="trip-previous-head">
                                        <Tr className="trip-previous-tr">
                                            <Th className="trip-previous-th"></Th>
                                            <Th className="trip-previous-th">Name</Th>
                                            <Th className="trip-previous-th">FRom Place</Th>
                                            <Th className="trip-previous-th">To place</Th>
                                        </Tr>
                                    </Thead>}
                                    {tripData.map((data) => {
                            return (
                                <>
                                    <Tbody className="trip-previous-tb">
                                        <Tr className="trip-previous-tr">
                                            <Td className="trip-previous-td">  <img src={data.profileSrc} alt="" /> </Td>
                                            <Td className="trip-previous-td">{data.name}</Td>
                                            <Td className="trip-previous-td">{data.startLocation}</Td>
                                            <Td className="trip-previous-td">{data.endLocation}</Td>
                                        </Tr>
                                    </Tbody>
                                </>
                            )
                        })}
                    </Table>





                </div>
            </div>

            </Sidebar>
        </>
    )
}



