import React, { useState, useEffect } from "react";
import "./HostRide.css"
import axios from "axios";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/fa"
import Layout from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { useNavigate } from "react-router-dom"
import Select from "react-select";
import swal from "sweetalert";


const initialfieldValues = {
    StartLocation: '',
    EndLocation: '',
    StartDate: '',
    StartTime: '',
    VehicleId: '',
    MemberId: localStorage.getItem("Uid"),
    NumberOfSeats: 0,
    InvitedMembers: ['']
}


const Id = localStorage.getItem("Uid");
export default function HostRide() {
    

    //const [invitedUserObj, setUserList] = useState([]);

    var InvitedUsers;

    const [VehicleList, setVehicleList] = useState([]);

    // console.log(SampleList[1]);
    const [invitedUserObj, setInvitedUsers] = useState();
    const [invitedUserList, setInvitedUserList] = useState();

    const DdlHandle = (e) => {
        setInvitedUsers(Array.isArray(e) ? e.map(x => x.value) : [])
        callHandle();

    }
    const callHandle = () => {
        values.InvitedMembers = invitedUserObj;
    }



    const [values, setValues] = useState(initialfieldValues);
    const [errors, setErrors] = useState({});
    const [vehicles, setVehicles] = useState()
    const [userList, setUserList] = useState()
    const Navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);

    const handleCheckboxChange = (vehicleId) => {
      setSelectedImage(vehicleId === selectedImage ? null : vehicleId);
    };
  
    useEffect(() => {
        //GetWheels();
        GetUsers();
    }, [])

    useEffect(() => {
        refreshVehicleList();
        TokenCheck();
    }, []);

    const TokenCheck = () => {

        const storeToken = localStorage.getItem("token");
        if (storeToken === null || "") {
            localStorage.clear();
            //LoginRedirect();
            console.log("login redirect")
            Navigate("/home-page")
        } 

    }

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
        console.log("vehicleList:", vehicles);

    }
    const validate = () => {
        const err = {};
        if (!values.StartLocation) {
            err.StartLocation = "Start Location is Required";
        }
       
        if (!values.EndLocation) {
            err.EndLocation = "End Location is Required";
        }
        if (!values.StartDate) {
            err.StartDate = "Start Date is Required";
        }
        if (!values.StartTime) {
            err.StartTime = "Start Time is Required";
        }
        if (!values.NumberOfSeats) {
            err.NumberOfSeats = "Number of seats is Required";
        }
        return err;

    }
    const resetForm = () => {
        setValues(initialfieldValues)
        setErrors({})
    }

    const handleSubmit = e => {
        console.log('submit hit')
        //console.log(values.MemberId)
        console.log(values)
        e.preventDefault();
        setErrors(validate(values));
        feedData();
        //navigate("/home-page")


    }

    const GetWheels = () => {
        axios
            .get(`https://localhost:7149/api/Vehicle/getVehicle/SYT454`)
            .then((Response) => {
                setVehicles(Response.data);
                console.log("vehicle-get", Response.data);

            })
            .catch((error) => {
                console.log(error);
            });
    }

    const GetUsers = () => {
        axios
            .get('https://localhost:7149/api/Registration/getallusers')
            .then((Response) => {
                setUserList(Response.data);

                // console.log("User-List:",userList);

                InvitedUsers = userList;
                setInvitedUserList(InvitedUsers);
                // console.log(Response.data);
                console.log("invited:", invitedUserList)


            })
    }

    const UserAPI = (url = 'https://localhost:7149/api/HostRide/hostyourride') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }

    const addOrEdit = (formData, onSuccess) => {
        UserAPI().create(formData)
            .then(res => {
                swal({
                    title: "Success",
                    text: "Ride Hosted Successfully",
                    icon: "success",
                  });
                  Navigate('/home-page')
                onSuccess();
            })
            .catch(err => console.log(err))
    }

    const feedData = () => {
        const formData = new FormData()
        console.log(values.NumberOfSeats)
        formData.append('StartLocation', values.StartLocation)
        formData.append('EndLocation', values.EndLocation)
        formData.append('StartDate', values.StartDate)
        formData.append('StartTime', values.StartTime)
        formData.append('VehicleId', values.VehicleId)
        formData.append('NumberOfSeats', values.NumberOfSeats)
        formData.append('MemberId', values.MemberId)
        formData.append('InvitedMembers', values.InvitedMembers)
        const test = {
            'StartLocation': values.StartLocation,
            'EndLocation': values.EndLocation,
            'StartDate': values.StartDate,
            'StartTime': values.StartTime,
            'VehicleId': values.VehicleId,
            'NumberOfSeats': values.NumberOfSeats,
            'MemberId': values.MemberId,
            'InvitedMembers': values.InvitedMembers
        }
        console.log(test)
        addOrEdit(test, resetForm)
    }

    function refreshVehicleList() {
        axios
            .get(`https://localhost:7149/api/Vehicle/getVehicle/` + Id)
            .then((Response) => {


                setVehicleList(Response.data);
                console.log("Id",Id)
                console.log("vehicle-get", Response.data);

            })
            .catch((error) => {
                console.log(error);
            });

    }


    const statusCheck = (vehicleId) => {
        // Navigate(`/check-ride/${vehicleId}`);
        console.log(vehicleId);
    };




    return (
        <>
            <Layout>
                <body className="hostride-body">
                    <div class="hostride-container">
                        <div class="hostride-title">Host A Ride</div>
                        <div class="hostride-content">
                            <form className="hostride-form" onSubmit={handleSubmit}>
                                <div class="hostride-user-details">
                                    <div class="input-box">
                                        <label>Start Location</label>
                                        <input className={"form-control"} type="text" placeholder="Hey,Where do you start?" name="StartLocation"
                                            value={values.StartLocation}
                                            onChange={handleInputChange} />
                                        <p className="error-text">{errors.StartLocation}</p>
                                        {console.log("Error",errors.StartLocation)}
                                    </div>
                                    <div className="column">
                                        <div className="input-box">
                                            <label>Which Date?</label>
                                            <input className={"form-control"} type="date" placeholder="Which Date?" name="StartDate"
                                                value={values.StartDate}
                                                onChange={handleInputChange} />
                                            <p className="error-text">{errors.StartDate}</p>
                                        </div>
                                        <div className="input-box">
                                            <label>When?</label>
                                            <input className={"form-control"} type="time" placeholder="And What Time?" name="StartTime"
                                                value={values.StartTime}
                                                onChange={handleInputChange}  />
                                            <p className="error-text">{errors.StartTime}</p>
                                        </div>
                                    </div>
                                    <div className="input-box">
                                        <label>Where to ?</label>
                                        <input className={"form-control"} type="text" placeholder="Enter your destination" name="EndLocation"
                                            value={values.EndLocation}
                                            onChange={handleInputChange}  />
                                        <p className="error-text">{errors.EndLocation}</p>
                                    </div>
                                    <div className="add-vehicle-image">
                                        <div className="select-vehicle">
                                            <label>Add/Select Wheels </label>
                                            <Link className='add-vehicle' to="/add-wheels"><Icons.FaPlusCircle></Icons.FaPlusCircle><i class="fa fa-plus-circle" aria-hidden="true"></i></Link>
                                        </div>
                                        <div className="vehicle-image-display">
                                            {VehicleList.map((data) => {
                                                return (
                                                    // <div className="mywheel-image">
                                                    //     <img alt="" onClick={() => {
                                                    //         statusCheck(data.vehicleId);
                                                    //         values.VehicleId = data.vehicleId;
                                                    //     }}
                                                    //         src={data.imageSrc}
                                                    //     />
                                                    // </div>
                                                    <div key={data.vehicleId} className="mywheel-image">
                                                    <input
                                                      type="checkbox"
                                                      name="vehicle"
                                                      id={data.vehicleId}
                                                      checked={selectedImage === data.vehicleId}
                                                      onChange={() =>
                                                        handleCheckboxChange(data.vehicleId)
                                                      }
                                                    />
                                                    <label for={data.vehicleId}>
                                                      <img
                                                        alt=""
                                                        onClick={() => {
                                                          statusCheck(data.vehicleId);
                                                          values.VehicleId = data.vehicleId;
                                                        }}
                                                        src={data.imageSrc}
                                                      />
                                                    </label>
                                                  </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="column">
                                        <div className="input-box">
                                            <label>Fare</label>
                                            <input type="number" className={"form-control"} placeholder="Fare" name="fare" />
                                        </div>
                                        <div className="input-box">
                                            <label>Select number of seats</label>
                                            <div className="select-box">
                                                <select type="number" className={"form-control"} placeholder="Number" name="NumberOfSeats" value={values.NumberOfSeats}
                                                    onChange={handleInputChange} required>
                                                        <p className="error-text">{errors.NumberOfSeats}</p>
                                                    <option hidden>0</option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-box">
                                        <label>Invite Others</label>
                                        <div className="user-search">
                                            <Select isMulti options={userList} onChange={DdlHandle} ></Select>
                                        </div>
                                    </div>
                                    {console.log("selected users:", invitedUserObj)}
                                    {/* {console.log("invitation sent by", values.InvitedMembers)} */}
                                    {console.log("invitation sent by", values.MemberId)}
                                </div>
                                <div class="button">
                                    <input type="submit" value="Host Ride" />
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