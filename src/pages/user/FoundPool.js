import React, { useEffect } from 'react'
import { Await, Link } from 'react-router-dom'
import Layout from '../../components/navbar/navbar'
import "./FoundPool.css"
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";

var temp = JSON.parse(localStorage.getItem("apiData"));
export default function FoundPool() {
    const [Poolsget, setPoolsget] = useState(false);
    const [poolData, setPoolData] = useState([])
    
    useEffect(()=>{
    const temp = JSON.parse(localStorage.getItem("apiData"));
    console.log("temp:", temp)
    setPoolData(temp)
    },[])

    const checkUserProfile = () => {
        setIsCheck(true);
       
        
        poolData.map((data) =>{
            const uid = data.hostId;
            console.log("uid data",uid)
            console.log("lenght",poolData.length )
            if (poolData.data.length === 0) {
                setPoolsget(true);
              }
        Navigate(`/user-details/${uid}`);
        })
       
    };

    const [isCheck, setIsCheck] = useState(false);
    const Navigate = useNavigate();


    const confirmRide = (hostedRideId) => {
        setIsCheck(true);
        Navigate(`/confirm-pool/${hostedRideId}`);
    };

    
    return (
        <>
            <Layout>
                <body className='register-body'>
               
                    {console.log("PoolList", poolData)}
                    <div className="foundpool-container">
                        <p className='foundpool-title'>List Of Available Pools</p>
                        {/* <div className="foundpool-filter">
                            <p className='foundpool-filter-bar'>Filter By Date : </p>
                            <input className="foundpool-data" type="date" />
                        </div> */} {Poolsget && <h2>No pools Found</h2>}
                        {!Poolsget && poolData.map((data) => {
                            return (
                                <div key={data.memberId} className="foundpool-details">

                                    <div className='foundpool-left'>
                                        <div className='host-image-profile'>
                                            <img
                                                src={data.imageSrc}
                                                className="host-img"
                                                onClick={checkUserProfile}
                                            />
                                        </div>
                                        <div className='foundpool-host'>
                                            <p>{data.hostName} </p>
                                        </div>

                                        <div className="foundpool-row">
                                            <p>{data.startLocation}</p>
                                            <p>to</p>
                                            <p>{data.endLocation}</p>
                                        </div>
                                    </div>
                                    <div className='foundpool-right'>
                                        <div className="requestride-block">

                                            <button onClick={() => {
                                                confirmRide(data.hostedRideId);
                                            }}
                                                className='requestride-btn'>REQUEST POOL</button>

                                            <div className='call-seat-icons'>
                                                <FontAwesomeIcon icon="fa-solid fa-square-phone" />
                                                <p>Number of seats:</p>
                                                {data.numberOfSeats}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </body>
            </Layout>
        </>
    )
}