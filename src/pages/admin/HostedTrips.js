import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import './AdminTripManagement.css'
import { useNavigate } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import './HostedTrips.css'
import axios from 'axios'

export default function AdminTripHosted() {
    // const [list,setList] =useState([])
    const [tripData,setTripData] =useState([])
    const Navigate = useNavigate();

    // useEffect(() => {
    //     setList([...employees])
    //   }, []);
    const PreviousTrips = () => {

        Navigate("/admin-trips-previous");
    };
    const CurrentTrips = () => {

        Navigate("/admin-trips-current");
    };
    function getHostedTrips(){
        axios.get('https://rideabuddyapi.suyatitech.com/api/AdminTrips/gethostedtrips')
        .then((Response)=>{
            setTripData(Response.data);
            if(Response.data.length === 0){
                setInvitedStatusget(true);
            }
            console.log("Data:",Response.data);
        })
        
    }
    const [Invitedstatusget, setInvitedStatusget] = useState(false);



    useEffect(()=>{
        getHostedTrips();
    },[])

    return (

        <>

            <Sidebar>
            <div className='admincurrentTrips-container'>

                <div className='Admin-tripHistory-buttons' >
                    <button onClick={() => {

                        CurrentTrips();
                    }} className='admin-history-btn'>Current Trips</button>
                    <button style={{ backgroundColor: "grey" }} className='admin-history-btn'>Hosted Trips</button>
                    <button onClick={() => {

                        PreviousTrips();
                    }} className='admin-history-btn'>Previous Trips</button>
                </div>

                <div className='table-hosted-container'>
                    <Table className="trip-hosted-table">
                    {Invitedstatusget && <h2>No Data Found</h2>}
                    
                        {!Invitedstatusget && <Thead className="trip-previous-head">
                            <Tr className="trip-previous-tr">
                                <Th className="trip-previous-th"></Th>
                                <Th className="trip-previous-th">Name</Th>
                                <Th className="trip-previous-th">FRom Place</Th>
                                <Th className="trip-previous-th">To place</Th>
                                <Th className="trip-previous-th">Date</Th>
                                <Th className="trip-previous-th">Time</Th>
                            </Tr>
                        </Thead>}
                        {tripData.map((data) => {
                            return (<>
                        <Tbody className="trip-previous-tb">
                            <Tr className="trip-previous-tr">
                                <Td className="trip-previous-td">  <img src={data.profileSrc} alt="" /> </Td>
                                <Td className="trip-previous-td">{data.name}</Td>
                                <Td className="trip-previous-td">{data.startLocation}</Td>
                                <Td className="trip-previous-td">{data.endLocation}</Td>
                                <Td className="trip-previous-td">{data.startDate}</Td>
                                <Td className="trip-previous-td">{data.startTime}</Td>
                            </Tr>
                        </Tbody></>
                        )
                    })}
                    </Table>
                </div>
            </div>

            </Sidebar>
        </>
    )
}



