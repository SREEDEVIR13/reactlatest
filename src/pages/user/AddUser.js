import React, { useEffect, useState } from "react";
import "./AddUser.css"
import { useNavigate } from "react-router-dom";
import Layout from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import axios from "axios";
import swal from "sweetalert";

const defaultImageSrc = "/img/userlogo.png"

const initialFeildValues = {
    employeeId: '',
    firstName: '',
    lastName: '',
    email: '',
    number: null,
    password: '',
    confirmPassword: '',
    gender: '',
    department: '',
    role: 'User',

    profileName: '',
    profileSrc: defaultImageSrc,
    profileFile: null,

    lisenceName: '',
    lisenceSrc: defaultImageSrc,
    lisenceFile: null
}

export default function AddUser() {

    const navigate = useNavigate();


    const [values, setValues] = useState(initialFeildValues);
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const UserAPI = (url = 'https://localhost:7149/api/Registration/register') => {
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
            .then(res => {
                swal({
                    title: "Success",
                    text: "Check Mail To Activate Your Account",
                    icon: "success",
                  });
                  localStorage.setItem("userexist",res.data.output)
                  if(res.data.output === "user already exist")
                  {
                    swal({
                        title: "Failed",
                        text: "User Already Exist",
                        icon: "error",
                      });
                  }
                  else{
                    navigate('/user-login')
                  }
                  
                onSuccess();
            })
            .catch(err => console.log(err))
    }


    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })

    }

    const showPreview = e => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    lisenceFile: imageFile,
                    lisenceSrc: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        }
        else {
            setValues({
                ...values,
                lisenceFile: null,
                lisenceSrc: defaultImageSrc
            })
        }
    }

    const profileUpdate = e => {
        if (e.target.files && e.target.files[0]) {
            console.log("image hit")
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    profileFile: imageFile,
                    profileSrc: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        }
        else {
            setValues({
                ...values,
                profileFile: null,
                profileSrc: defaultImageSrc
            })
        }
    }

    const validate = () => {
        const err = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const idRegex = /^SYT{1}[0-9]{3,4}$/gm;
        const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
        if (!values.firstName) {
            err.firstName = "First Name is Required";
        }

        if (!values.lastName) {
            err.lastName = "Last Name is Required";
        }
        if (!values.email) {
            err.email = "Email is Required";
        }
        else if (!emailRegex.test(values.email)) {
            err.email = "Email is not valid"
        }
        if (!values.password) {
            err.password = "Password is Required";
        }
        else if (!pwdRegex.test(values.password)) {
            err.password = "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!"
        }
        if (values.confirmPassword !== values.password) {
            err.confirmPassword = "Password's doesnt match"
        }
        if (!values.department) {
            err.department = "Department is Required";
        }
        if (!values.employeeId) {
            err.employeeId = "Employee Id is Required";
        }
        else if (!idRegex.test(values.employeeId)) {
            err.employeeId = "Invalid Employee Id"
        }
        if (!values.number) {
            err.number = "number is Required";
        }
        else if ((values.number).length < 10 || values.number.length > 10) {
            err.number = "number should be 10 digit";
        }
        if (!values.gender) {
            err.gender = "Please select gender";
        }
        if (values.profileSrc === defaultImageSrc) {
            err.profileSrc = "select Profile picture"
        }

        return err;


    }

    const resetForm = () => {
        setValues(initialFeildValues)
        document.getElementById('image-uploader').value = null;
        document.getElementById('license-uploader').value = null;
        setErrors({})
    }

    const handleSubmit = e => {
        console.log('submit hit')
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmit(true);
        feedData()

    }





    const feedData = () => {
        const formData = new FormData()
        formData.append('lisenceName', values.lisenceName)
        formData.append('lisenceFile', values.lisenceFile)
        formData.append('profileName', values.profileName)
        formData.append('profileFile', values.profileFile)
        formData.append('firstname', values.firstName)
        formData.append('lastName', values.lastName)
        formData.append('email', values.email)
        formData.append('password', values.password)
        formData.append('department', values.department)
        formData.append('number', values.number)
        formData.append('gender', values.gender)
        formData.append('employeeId', values.employeeId)
        formData.append('role', values.role)
        const test = {
            'lisenceName': values.lisenceName,
            'lisenceFile': values.lisenceFile,
            'profileName': values.profileName,
            'profileFile': values.profileFile,
            'firstName': values.firstName,
            'lastName': values.lastName,
            'email': values.email,
            'password': values.password,
            'department': values.department,
            'number': values.number,
            'gender': values.gender,
            'employeeId': values.employeeId,
            'role': values.role,
        }
        console.log(test)
        addOrEdit(test, resetForm)
    }
    const TokenCheck = () => {

        const storeToken = localStorage.getItem("token");
        if (storeToken === null || "") {
            localStorage.clear();
            //LoginRedirect();
            console.log("login redirect")
            navigate("/home-page")
        } 

    }
    useEffect(()=>{
        //TokenCheck();
    },[])

    return (

        <>

            <Layout>
                <body className="register-body">
                    <div class="register-container">
                        <div class="register-title">Registration</div>
                        <div class="register-content">
                            <form className="register-form" onSubmit={handleSubmit}>
                                <div class="register-user-details">
                                    <div class="profile-input-box">
                                        <img alt="" src={values.profileSrc} height="100px" width="100px" />
                                        <input type="file" accept="image/*"
                                            onChange={profileUpdate} id="profile-uploader" />
                                        <p className="error-text">{errors.profileSrc}</p>
                                    </div>
                                    <div class="input-box">
                                        <span class="details">First Name</span>
                                        <input className={"form-control"} type="text" placeholder="First Name" name="firstName"
                                            value={values.firstName}
                                            onChange={handleInputChange} />
                                        <p className="error-text">{errors.firstName}</p>
                                    </div>
                                    <div class="input-box">
                                        <span class="details">Last Name</span>
                                        <input className={"form-control"} placeholder="LastName" name="lastName"
                                            value={values.lastName}
                                            onChange={handleInputChange} />
                                        <p className="error-text">{errors.lastName}</p>
                                    </div>
                                    <div class="input-box">
                                        <span class="details">Email</span>
                                        <input className={"form-control"} placeholder="Email" name="email"
                                            value={values.email}
                                            onChange={handleInputChange} />
                                        <p className="error-text">{errors.email}</p>
                                    </div>
                                    <div class="input-box">
                                        <span class="details">Phone Number</span>
                                        <input type="number" className={"form-control"} placeholder="Number" name="number"
                                            value={values.number}
                                            onChange={handleInputChange}  />
                                        <p className="error-text">{errors.number}</p>
                                    </div>
                                    <div class="input-box">
                                        <span class="details">Password</span>
                                        <input type="password" className={"form-control"} placeholder="Password" name="password"
                                            value={values.password}
                                            onChange={handleInputChange} />
                                        <p className="error-text">{errors.password}</p>
                                    </div>
                                    <div class="input-box">
                                        <span class="details">Confirm Password</span>
                                        <input type="password" placeholder="Password" name="confirmPassword"
                                            value={values.confirmPassword}
                                            onChange={handleInputChange} />
                                        <p className="error-text">{errors.confirmPassword}</p>
                                    </div>
                                    <div class="input-box">
                                        <span class="details">Gender</span>
                                        <div className="select-box">
                                            <select
                                                name="gender"
                                                value={values.gender}
                                                onChange={handleInputChange} >
                                                <option hidden>Gender</option>
                                                <option>Male</option>
                                                <option>Female</option>
                                                <option>Prefer not to say</option>
                                            </select>
                                            <p className="error-text">{errors.gender}</p>
                                        </div>
                                    </div>
                                    <div class="input-box">
                                        <span class="details">License</span>
                                        <input type="file" accept="image/*"
                                            onChange={showPreview} id="image-uploader" />
                                    </div>
                                    <div className="input-box">

                                        <span class="details">Department</span>
                                        <div className="select-box">
                                            <select
                                                name="department"
                                                value={values.department}
                                                onChange={handleInputChange} >
                                                <option hidden>Department</option>
                                                <option>Delivery</option>
                                                <option>IT</option>
                                                <option>Admin</option>
                                                <option>HR</option>
                                            </select>
                                            <p className="error-text">{errors.department}</p>
                                        </div>


                                    </div>
                                    <div className="input-box">
                                        <span class="details">Employee ID</span>
                                        <input type="text" className={"form-control"} placeholder="Employee Id" name="employeeId"
                                            value={values.employeeId}
                                            onChange={handleInputChange}  />
                                        <p className="error-text">{errors.employeeId}</p>
                                    </div>
                                    <div className="input-box">

                                    </div>
                                </div>


                                <div className="button">
                                    <input type="submit" value="Register" />
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