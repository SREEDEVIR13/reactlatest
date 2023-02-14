import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Footer from '../../components/footer/footer';
import Layout from '../../components/navbar/navbar';
import './UserTracking.css'

const userId = localStorage.getItem("Uid");
function UserTracking() {

useEffect(()=>{
    //myRideDetails();
},[]);

const [rideDetails, setRideDetails] = useState([]);

function myRideDetails(){
    axios.get(`https://localhost:7149/api/Rides/startride/${userId}`)
    .then((Response) => {
        setRideDetails(Response.data);
        console.log("ride-details", Response.data);
    })
    .catch((error) => {
        console.log(error);
    });
}


    return (
        <>
        <Layout>
        <div className='user-tracking-Container'>
            <div className='user-tracking-Box'>
                <p className='user-tracking-title'>
                    Ride started on date ,time
                </p>
                <div className='usertracking-Card'>
                    <div className='host-Name-Prof'>
                        <div className='hostPicture'>
                            <img className='Host-PIc' src="" height="50px" width="50px">

                            </img>
                        </div>
                        <div className='host-NamE'>
                            John Doe
                        </div>
                        <div className='host-emp-ID'>
                            SYT565
                        </div>
                    </div>
                    <div className='start-dest-pts'>
                        <div className='start-POINT'>
                            From : kakkanad
                        </div>
                        <div className='dest-PNT'>
                            To : infopark
                        </div>
                    </div>
                </div>
                <div className='you-owe'>
                    Pay John Doe 60 Rs
                </div>
                <div className='pay-now-btn'>
                    <button className='pay-BTN'>
                        Pay Now
                    </button>
                </div>
            </div>
        </div>
        <Footer></Footer>
        </Layout>
        </>
    )
}

export default UserTracking