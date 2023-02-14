import React, { useEffect, useState } from "react";
import "./UserLogin.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { decodeToken } from "react-jwt";
import { toast } from 'react-toastify';
import swal from "sweetalert";




const initialFieldValues = {

    username: '',
    password: '',

}

export default function UserLogin() {

    const navigate = useNavigate();
    const [values, setValues] = useState(initialFieldValues);
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);


    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })

    }

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



    const validate = () => {
        const err = {};

        if (!values.username) {
            err.username = "Username is Required";
        }

        if (!values.password) {
            err.password = "Password is Required";
        }
        const value = localStorage.getItem("token");
        const status = localStorage.getItem("status");
        console.log("status:", status)
        if (status == "false") {
            console.log("if condition worked", status)
            err.password = " User name  or password is wrong"
        }


        return err;


    }

    const resetForm = () => {
        setValues(initialFieldValues)
        setErrors({})
    }

    const handleSubmit = e => {
        console.log('submit hit')
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmit(true);
        feedData();
    }



    const submitHandler = () => {
        setIsSubmit(true);
        navigate("/add-user");
    }

    const ForgotPasswordHandler = () => {
        setIsSubmit(true);
        navigate("/forgot-password");
    }


    function feedData() {
        const test = {
            'username': values.username,
            'password': values.password
        };
        axios.post("https://localhost:7149/api/Login", test)
            .then(res => {
                console.log("add or edit :: ", res.data.token);
                console.log("add or edit :: ", res.data.status);
                console.log("add or edit :: ", res.data.user);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('Uid', res.data.user);
                localStorage.setItem('loginStatus', res.data.output);
                localStorage.setItem('status', res.data.status);
                TokenCheck();
                console.log("local:", localStorage.getItem("token"))
                console.log("Redirect after login");

                navigate("/home-page")
            })
            .catch(err => console.log(err))
    }

    return (

        <>
            <Layout>
                <body className="login-body">
                    <section class="side">
                        <img src="../../images/img.svg" alt="" />
                    </section>
                    <section class="main">
                        <div class="login-container">
                            <p class="title">Welcome back</p>
                            <div class="separator"></div>
                            <p class="welcome-message">Please, provide login credential to proceed and have access to all our services</p>
                            <form class="login-form" onSubmit={handleSubmit}>
                                <div class="form-control">
                                    <input className="login-input" type="text" placeholder="Username" name="username"
                                        value={values.username}
                                        onChange={handleInputChange} />
                                    <i class="fas fa-user"></i>
                                    <p className="error-text">{errors.username}</p>
                                </div>
                                <div class="form-control">
                                    <input className="login-input" type="password" placeholder="Password" name="password"
                                        value={values.password}
                                        onChange={handleInputChange} />
                                    <i class="fas fa-lock"></i>
                                    <p className="error-text">{errors.password}</p>
                                </div>
                                <button class="submit">Login</button>
                                <div className="login-bottom">
                                    <a href="/forgot-password" className="forgotPassword">
                                        Forgot password?
                                    </a>

                                    <a href="/add-users" className="noAccount">
                                        Don't have an account?
                                    </a>
                                </div>
                            </form>
                        </div>
                    </section>
                </body>

                <Footer />
            </Layout>

        </>

    )

}