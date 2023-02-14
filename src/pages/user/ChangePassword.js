import React, { useEffect } from "react";
import { useState } from "react";
import { json, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/navbar/navbar";
import { useJwt } from "react-jwt";
import { decodeToken } from "react-jwt";
import "./ChangePassword.css"
import Footer from "../../components/footer/footer";

const initialFieldValues = {

    Email: '',
    Password: '',
    confirmPassword: '',

}


export default function ChangePassword() {

    const search = useLocation().search;
    const token = new URLSearchParams(search).get('id');
    console.log(token);

    const [values, setValues] = useState(initialFieldValues);
    const [errors, setErrors] = useState({});
    const [tempMail, setTempMail] = useState('');
    const navigate = useNavigate();
    console.log(tempMail)

    useEffect(() => {
        tokenCheck();
    }, []);


    const tokenCheck = () => {
        const { Email } = decodeToken(token);
        const userMail = Email;
        console.log()
        setTempMail(userMail);
        values.Email = tempMail;
        //console.log(values.Email)


    }


    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,

            [name]: value
        })

    }


    const validate = () => {
        const err = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const idRegex = /^SYT{1}[0-9]{3,4}$/gm;
        const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

        if (!values.Email) {
            err.Email = "Email is Required";
        }
        else if (!emailRegex.test(values.email)) {
            err.Email = "Email is not valid"
        }
        if (!values.Password) {
            err.Password = "Password is Required";
        }
        else if (!pwdRegex.test(values.Password)) {
            err.Password = "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!"
        }
        if (values.confirmPassword !== values.Password) {
            err.confirmPassword = "Password's doesnt match"
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
        feedData();
        navigate("/user-login");

    }
    const string1 = 'https://localhost:7149/api/ForgotPassword/changepassword?Token=' + tempMail;
    const string2 = '&Password=' + values.Password;
    const postUrl = string1 + string2;
    console.log(postUrl)
    const UserAPI = (url = postUrl) => {
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
    const addOrEdit = (formData, onSuccess) => {
        UserAPI().create(formData)
            .then(res => {
                console.log("Password changed successfully!")
                onSuccess();
            })
            .catch(err => console.log(err))
    }



    const feedData = () => {
        const formData = new FormData()

        formData.append('Email', tempMail)
        formData.append('Password', values.Password)

        addOrEdit(formData, resetForm)

    }

    return (
        <>
            <Layout>
                <body class="register-body">
                    <div class="cp-container">
                        <div class="cp-title">Reset Password</div>
                        <div class="cp-content">

                            <form onSubmit={handleSubmit} className="cp-form">
                                <div className="cp-details">
                                    <div className="input-box">
                                        <span class="details">New Password:</span>
                                        <input type="password" placeholder="Password" name="Password"
                                            value={values.Password}
                                            onChange={handleInputChange} />
                                        <p className="error-text">{errors.Password}</p>
                                    </div>
                                    <div className="input-box">
                                        <span class="details">Confirm Password:</span>
                                        <input type="password" placeholder="Password" name="confirmPassword"
                                            value={values.confirmPassword}
                                            onChange={handleInputChange} />
                                        <p className="error-text">{errors.confirmPassword}</p>
                                    </div>
                                </div>
                                <div class="button">
                                    <input type="submit" value="Submit" />
                                </div>
                            </form>

                        </div>
                    </div>
                </body>
            </Layout>
        </>
    )
}