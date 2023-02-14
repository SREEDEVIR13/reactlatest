import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Footer from "../../components/footer/footer";
import Layout from "../../components/navbar/navbar";
import { decodeToken } from "react-jwt";
import axios from "axios";

const initialFieldValues = {

    Email: ''

}
export default function UserConfirmation() {

    const [values, setValues] = useState(initialFieldValues);
    const [tempMail, setTempMail] = useState('')

    const navigate = useNavigate();

    const search = useLocation().search;
    const token = new URLSearchParams(search).get("id")

    useEffect(() => {
        tokenCheck();
        feedData();
    }, []);

    const tokenCheck = () => {
        const { Email } = decodeToken(token);
        console.log("Email",Email)
        const userMail = Email;
        setTempMail(userMail);
        console.log("tempmail",tempMail)

        values.Email = tempMail;
        console.log(values.Email)
    }
    

    const resetForm = () => {
        setValues('')
    }

    const handleSubmit = e => {
        console.log('submit hit')
        e.preventDefault();
        feedData();
        

    }
    const postUrl = 'https://localhost:7149/api/Registration/Confirm-user?email=' + tempMail;
    const UserAPI = (url = postUrl) => {
        let token = localStorage.getItem("token");
        const headers = {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
    }
        return {
            fetchAll: () => axios.get(url, 
                {
                    headers:headers
                }),
            create: newRecord => axios.post(url, newRecord,{
                headers:headers
            }),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
            delete: id => axios.delete(url + id)
        }
    }
    const addOrEdit = (formData, onSuccess) => {
        UserAPI().create(formData)
            .then(res => {
                console.log("User Added Successfully!")
                navigate("/user-login");
                onSuccess();
            })
            .catch(err => console.log(err))
    }



    const feedData = () => {
        const formData = new FormData()

        formData.append('Email', values.Email)
        console.log("foeed data hit", values.Email)

        addOrEdit(formData, resetForm)

    }

    return (
        <>
            <Layout>
                
                    <div className="userconfirm-div">
                    <form autoComplete="off" noValidate onSubmit={handleSubmit} className="userconfirm-form">
                        
                        <h2>Congratulations, you have been registered</h2>
                        <div>
                            <h3>Click Here to Confirm</h3>
                            <button>Confirm</button>
                        </div>
                        </form>
                    </div>
                    <Footer></Footer>
            </Layout>
        </>
    )
}