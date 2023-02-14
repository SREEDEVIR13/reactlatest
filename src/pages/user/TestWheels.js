import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./Wheels.css";
import * as Icons from "react-icons/fa";

import axios from "axios";
import swal from "sweetalert";

import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import './PopUp.css';
import Layout from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { decodeToken } from "react-jwt";



const Id = "SYT454";

export default function TestWheels() {
    const [openModal, setOpenModal] = useState(false);
    const Navigate = useNavigate();
    const { VehicleOwnerId } = useParams();
    const [VehicleList, setVehicleList] = useState([]);
    const [searchParams] = useSearchParams();
    const [isSubmit, setIsSubmit] = useState(false);
    console.log("vehicledelete", VehicleList.VehicleId);


    useEffect(() => {
        refreshVehicleList();
        TokenCheck();
    }, [VehicleOwnerId]);

    const TokenCheck = () => {

        const storeToken = localStorage.getItem("token");
        if (storeToken === null || "") {
            localStorage.clear();
            //LoginRedirect();
            console.log("login redirect")
            loginRedirection();
        } else {
            const { exp } = decodeToken(storeToken);
            const expirationTime = exp * 1000 - 60000;
            if (Date.now() >= expirationTime) {
                localStorage.clear();
                //LoginRedirect();
                loginRedirection();
            }
        }

    }
    function loginRedirection() {
        console.log("Redirected to user login.Please login again")
        Navigate('/user-login')
    }


    function refreshVehicleList() {
        axios
            .get(`https://rideabuddyapi.suyatitech.com/api/Vehicle/getVehicle/` + Id)
            .then((Response) => {


                setVehicleList(Response.data);
                console.log("vehicle-get", Response.data);

            })
            .catch((error) => {
                console.log(error);
            });
        if (VehicleList.vehicleOwnerId = 0) {
            { return <NoDataFound /> }

        }
    }



    function NoDataFound() {
        return (
            <div> no data found</div>
        );
    }



    const onDelete = (e, vehicleId) => {
        e.preventDefault();
        console.log("delete");
        console.log("vehicleid", vehicleId);

        axios
            .delete(`https://rideabuddyapi.suyatitech.com/api/Vehicle/delete/` + vehicleId)
            .then((Response) => {
                swal({
                    title: "DELETED!",
                    text: " Vehicle Deleted Succesfully ",
                    icon: "success",
                    button: "ok",

                })
                refreshVehicleList();
                console.log("vehicle-get", Response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        setOpenModal(false);
    };

    const submitHandler = () => {
        setIsSubmit(true);
        Navigate("/add-wheels");
    };

    const setModalClose = () => {
        setOpenModal(false);
    };


    return (
        <Layout>
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

                                            <img src={data.imageSrc} className="image-property" />
                                        </div>


                                        <div className="fullname-div">
                                            <h2> {data.vehicleName}</h2>
                                            <div> {data.vehicleType}</div>
                                        </div>



                                        <div className="body-info-div">

                                            <div> {data.vehicleNumber}</div>
                                        </div>

                                        <div className="body-info-div">
                                            <label>Seats:</label>
                                            <div> {data.numberOfSeats}</div>
                                        </div>
                                        <button
                                            className="wheels-delete-button"
                                            onClick={() => {
                                                setOpenModal(true);
                                            }}
                                        >
                                            <Icons.FaTrash color="red" />
                                        </button>
                                        <Modal show={openModal} onHide={setModalClose} className='modalContainer'>
                                            <Modal.Header>
                                                <Modal.Title>Delete Vehicle</Modal.Title>
                                                <div className='titleCloseBtn'> <button onClick={() => setModalClose(false)}> x</button></div>
                                            </Modal.Header>
                                            <Form onSubmit={(e) => onDelete(e, parseInt(data.vehicleId))}
                                            >
                                                <Modal.Body className="title">


                                                    <div className='title'> Do you really want to delete ? </div>

                                                </Modal.Body>
                                                <Modal.Footer className='footer' >
                                                    <div>
                                                        <button type="submit" id="YesBtn">
                                                            Yes
                                                        </button>
                                                        <button type="button" onClick={setModalClose} id="cancelBtn">
                                                            No
                                                        </button>
                                                    </div>
                                                </Modal.Footer>
                                            </Form>
                                        </Modal>

                                    </div>
                                </div>


                            )

                        })
                    }
                </div>
            </div>
            <Footer></Footer>
        </Layout>
    );
}
