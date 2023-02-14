import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import { JwtDecode } from "jwt-decode-module";
import { decodeToken } from "react-jwt";
import "./Login.css"
import Layout from "../../components/navbar/navbar";
import AdminLayout from "./AdminNavbar";



const initialFeildValues = {

    username: '',
    password: '',

}

export default function AdminLogin() {

    const navigate = useNavigate();
    const [values, setValues] = useState(initialFeildValues);
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);


    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })

    }
    const UserAPI = (url = 'https://rideabuddyapi.suyatitech.com/api/Admin') => {
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
                console.log(res.data.output)
                onSuccess();
                localStorage.setItem("token", res.data.output);
                TokenCheck();
                console.log("redirect after login")
                navigate("/admin-dashboard")
            })
            .catch(err => console.log(err))
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
        navigate('/admin-login')
    }


    const validate = () => {
        const err = {};

        if (!values.username) {
            err.username = "username is Required";
        }

        if (!values.password) {
            err.password = "password is Required";
        }


        return err;


    }

    const resetForm = () => {
        setValues(initialFeildValues)
        setErrors({})
    }

    const handleSubmit = e => {
        console.log('submit hit')
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmit(true);

    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmit) {

            const formData = new FormData()
            formData.append('username', values.username)
            formData.append('password', values.password)

            addOrEdit(formData, resetForm)
        }
    }, [errors]);

    return (

        <>

                <AdminLayout>
                <div className="login-main-content">
                    <div className="login-title">
                        <header className="login-one">Admin Login</header>
                    </div>
                    <div className="loginbody-content">
                        <form autoComplete="off" noValidate onSubmit={handleSubmit} className="login-form">


                            <div className="column">
                                <div className="input-box">
                                    <label>Username</label>
                                    <input className={"form-control"} type="text" placeholder="Username" name="username"
                                        value={values.username}
                                        onChange={handleInputChange} required />
                                    <p className="error-text">{errors.username}</p>
                                </div>

                            </div>
                            <div className="column">
                                <div className="input-box">
                                    <label>Password </label>
                                    <input className={"form-control"} placeholder="Password" name="password" type="password"
                                        value={values.password}
                                        onChange={handleInputChange} required />
                                    <p className="error-text">{errors.password}</p>
                                </div>
                            </div>


                            <button >Login</button>



                        </form>
                    </div>

                </div>
                </AdminLayout>


        </>

    )

}