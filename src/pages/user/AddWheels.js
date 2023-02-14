import React, { useEffect, useState } from "react";
import "./AddWheels.css"
import axios from "axios";
import Layout from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";


const defaultImageSrc = "/img/vehicle.jpg"

const userID = localStorage.getItem("Uid")
const initialFeildValues = {

    vehicleName: '',
    vehicleType: '',
    vehicleNumber: '',
    numberOfSeats: 0,
    vehicleOwnerId: userID,


    imageName: '',
    imageSrc: defaultImageSrc,
    imageFile: null,


}

export default function AddWheels() {


    const [values, setValues] = useState(initialFeildValues);
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();
    const Navigate = useNavigate();
    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })

    }
    const UserAPI = (url = 'https://localhost:7149/api/Vehicle/register') => {
        let token = localStorage.getItem("token");
        const headers = {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
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
            .then(res => {swal({
                title: "Success",
                text: "Vehicle added successfully",
                icon: "success",
              });
              Navigate('/check-wheels')
                onSuccess();
            })
            .catch(err => console.log(err))
    }

    const imageUpdate = e => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    imageFile: imageFile,
                    imageSrc: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        }
        else {
            setValues({
                ...values,
                imageFile: null,
                imageSrc: defaultImageSrc
            })
        }
    }

    const validate = () => {
        const err = {};

        if (!values.vehicleName) {
            err.vehicleName = "Vehicle name is required";
        }

        if (!values.vehicleType) {
            err.vehicleType = " vehicle type is required";
        }
        if (!values.vehicleNumber) {
            err.vehicleNumber = "vehicle number is required";
        }
        if (!values.numberOfSeats) {
            err.numberOfSeats = "Number of seats is required";
        }


        if (values.imageSrc === defaultImageSrc) {
            err.imageSrc = "select vehicle image"
        }

        return err;


    }

    const resetForm = () => {
        setValues(initialFeildValues)
        document.getElementById('image-uploader').value = null;
        setErrors({})
    }

    const handleSubmit = e => {
        console.log('submit hit')
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmit(true);

    }

    const applyErrorClass = field => ((field in errors && errors[field] === false) ? ' invalid-field' : '')

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmit) {

            const formData = new FormData()
            formData.append('imageName', values.imageName)
            formData.append('imageFile', values.imageFile)
            formData.append('vehicleName', values.vehicleName)
            formData.append('vehicleType', values.vehicleType)
            formData.append('vehicleNumber', values.vehicleNumber)
            formData.append('numberOfSeats', values.numberOfSeats)
            formData.append('vehicleOwnerId', values.vehicleOwnerId)

            addOrEdit(formData, resetForm)
        }
    }, [errors]);


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
        navigate('/user-login')
    }

    useEffect(() => {
        TokenCheck();
    })

    return (

        <>
            <Layout>
            <body className="register-body">
                    <div class="add-wheel-container">
                        <div class="add-wheel-title">Add New Vehicle</div>
                        <div className="add-wheel-content">
                            <form className="add-wheel-form" onSubmit={handleSubmit}>
                                <div class="add-wheel-details">
                                    <div className="image-tag" >
                                        <img src={values.imageSrc} height="100px" width="100px" />
                                        <input type="file" accept="image/*" className={"form-control-file" + applyErrorClass('imageSrc')}
                                            onChange={imageUpdate} id="license-uploader" />
                                        <p className="error-text">{errors.imageSrc}</p>


                                    </div>
                                    <div className="add-wheel-column">
                                        <div className="input-box">
                                            <label>Vehicle Name</label>
                                            <input className={"form-control"} type="text" placeholder="Vehicle Name" name="vehicleName"
                                                value={values.vehicleName}
                                                onChange={handleInputChange} required />
                                            <p className="error-text">{errors.vehicleName}</p>
                                        </div>

                                        <div className="input-box">
                                            <label>Vehicle Type</label>
                                            <div className="select-box">
                                                <select placeholder="Vehicle Type" name="vehicleType"
                                                    value={values.vehicleType}
                                                    onChange={handleInputChange} >
                                                    <option hidden>Vehicle Type</option>
                                                    <option>Hatchback</option>
                                                    <option>Sedan</option>
                                                    <option>SUV</option>
                                                    <option>Motorcycle</option>
                                                    <option>Minivan</option>
                                                </select>
                                                <p className="error-text">{errors.vehicleType}</p>
                                            </div>
                                        </div>

                                    </div>


                                    <div className="add-wheel-column">
                                        <div className="input-box">
                                            <label>Vehicle Number </label>
                                            <input className={"form-control"} placeholder="vehicleNumber" name="vehicleNumber"
                                                value={values.vehicleNumber}
                                                onChange={handleInputChange} required />
                                            <p className="error-text">{errors.vehicleNumber}</p>
                                        </div>
                                        <div className="input-box">
                                            <label>Number of Seats</label>
                                            <div className="select-box">
                                                <select type="number" className={"form-control"} placeholder="Number" name="numberOfSeats"
                                                    value={values.numberOfSeats}
                                                    onChange={handleInputChange} required  >
                                                    <option hidden>Number of Seats</option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                                <p className="error-text">{errors.numberOfSeats}</p>
                                            </div>

                                        </div>
                                    </div>
                                    <div class="button">
                                        <input type="submit" value="Register" />
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