import React from 'react'
import Layout from '../../components/navbar/navbar'
import { useState, useEffect } from 'react';
import "./ConfirmPool.css";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import swal from 'sweetalert';


const userId = localStorage.getItem("Uid");
export default function ConfirmPool() {


    const { hostedRideId } = useParams();
    const hostedRideIdValue = parseInt(hostedRideId);
    console.log("hostedid:", hostedRideId)
    console.log("useparams", hostedRideId)
    const navigate = useNavigate();

    const [ConfirmRide, setConfirmRide] = useState([]);


    useEffect(() => {
        ConfirmYourRide(hostedRideId);
    }, []);

    const [inputList, setInputList] = useState([{ value: '' }]);
    const handleListChange = (e, index) => {
        const newInputList = [...inputList];
        newInputList[index].value = e.target.value;
        setInputList(newInputList);
    };
    const handleListAdd = () => {
        setInputList([...inputList, { value: '' }]);
    };

    const handleListRemove = index => {
        const newInputList = [...inputList];
        newInputList.splice(index, 1);
        setInputList(newInputList);
    };

    const [counter, setCounter] = useState(0)

    const handleClick1 = () => {
        setCounter(counter + 1)
    }

    const handleClick2 = () => {
        setCounter(counter - 1)
    }


    function ConfirmYourRide(hostedRideId) {
        console.log(hostedRideId)
        axios
            .get(`https://localhost:7149/api/JoinRide/confirmpool?hostedRideId=${hostedRideId}`)
            .then((Response) => {
                setConfirmRide(Response.data);
                console.log("confirm-pool", Response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const JoinAPI = (url = 'https://localhost:7149/api/JoinRide/joinriderequest') => {
        let token = localStorage.getItem("token");
        const headers = {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
        }
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord, {
                headers: headers
            }),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }
    const JoinrideReq = (formData, onSuccess) => {
        JoinAPI().create(formData)
            .then(response => {
                feedDataHost();
                onSuccess();
            })
            .catch(err => console.log(err))
    }

    const UserAPI = (url = 'https://localhost:7149/api/JoinRide/requesttohost') => {
        let token = localStorage.getItem("token");
        const headers = {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord, {
                headers: headers
            }),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }


    const addOrEdit = (formData, onSuccess) => {
        UserAPI().create(formData)
            .then(response => {
                console.log("feed data join")
                swal({
                    title: "Success",
                    text: "Join Request Sent !",
                    icon: "success",
                  });
                  navigate('/home-page')
                
                onSuccess();
            })
            .catch(err => console.log(err))
    }

    const feedDataJoin = () => {
        console.log("feedData insde")
        const joinReqData = JSON.parse(localStorage.getItem("joinReqData"))
        const testJoinReq = {
            'StartLocation': joinReqData.StartLocation,
            'EndLocation': inputList,
            'StartDate': joinReqData.StartDate,
            'StartTime': joinReqData.StartTime,
            'MemberId': localStorage.getItem("Uid"),
            'HostedRideId':hostedRideIdValue,
            'NumberOfSeats':counter
        }
        console.log(testJoinReq)
        JoinrideReq(testJoinReq);
    }
    const feedDataHost = () => {

        const testReqToHost = {
            'HostedRideId': hostedRideIdValue,
            'JoineeId': localStorage.getItem("Uid"),
            'Status': 0
        }
        console.log(testReqToHost)
        addOrEdit(testReqToHost);
    }

    const checkUserProfile = () => {
        
        navigate(`/user-details/${ConfirmRide.employeeId}`);
        
    };


    return (
        <>
            <Layout>
                <div className='register-body'>

                    {/* <p className='confirmpool-title'>Confirm Pool Details</p> */}
                    <div key={ConfirmRide.Id} className='confirm-pool-body'>
                        <div className='section1'>
                            <div className='profile-and-wheels'>
                                <div className='profile-card'>
                                    <div className='profile-hostname'>
                                        <div className='host-image'>
                                            <img 
                                                alt=''
                                                src={ConfirmRide.profileSrc}
                                                className="host-picture"
                                                onClick={checkUserProfile}
                                            />
                                        </div>
                                        <div className='host-name-id'>
                                            <label>Host Name : {ConfirmRide.fullName} </label><br></br>
                                            <label>Employee ID :{ConfirmRide.employeeId} </label>
                                        </div>
                                    </div>
                                </div>
                                <div className='vehicle-detail-card'>
                                    <div className='wheel-image-name-number'>
                                        <div className='wheel-image'>
                                            <img
                                            alt=''
                                                src={ConfirmRide.vehicleSrc}
                                                className="vehicle-picture"
                                            />
                                        </div>
                                        <div className='wheel-name-number'>
                                            <p>{ConfirmRide.vehicleName}</p>
                                            <p>{ConfirmRide.vehicleNumber} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='from-to-details'>
                                <div className='from-to-date-time-seat'>
                                    <div className='from'>
                                        <label>Start Location : {ConfirmRide.startLocation}</label>
                                    </div>
                                    <div className='to'>
                                        <label>Destination:{ConfirmRide.endtLocation}</label>
                                    </div>
                                    <div className='start-time'>
                                        <label>Start Date:{ConfirmRide.startDate}</label><br></br>
                                        <label>Start Time: {ConfirmRide.startTime}</label>

                                    </div>
                                    <div className='seatss'>
                                        <label className='no-of-seats'>Select number of seats :</label><br></br><br></br>
                                        <button className="b1" onClick={handleClick1}>+</button>
                                        {counter}
                                        <button className="b2" onClick={handleClick2}>-</button>
                                    </div>

                                </div>
                            </div>
                        </div>


                        <div className='section2'>
                            <div className='riders-multidropoff'>
                                <div className='form-card'>
                                    <div className='no-of-riders'>
                                        <p className='no-of-riderss'>Number of Riders:  {counter}</p>
                                    </div>
                                    <div className='multi-dropoff'>

                                        <div>
                                            {inputList.map((input, index) => (
                                                <div key={index}>
                                                    <input
                                                        type="text"
                                                        value={input.value}
                                                        onChange={e => handleListChange(e, index)}
                                                    />
                                                    <button onClick={() => handleListRemove(index)}>Remove</button>
                                                </div>
                                            ))}
                                            <button onClick={handleListAdd}>Add Dropoff Locations</button>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='confirm-button'>
                            <button className='cr-button' onClick={feedDataJoin}>Confirm Pool</button>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

