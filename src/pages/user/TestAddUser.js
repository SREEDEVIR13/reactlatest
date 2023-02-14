import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/navbar/navbar';

const RegistrationForm = () => {
    const navigate = useNavigate();


    const [values, setValues] = useState([]);
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);


    const [formData, setFormData] = useState({
        employeeId: 0,
        firstName: '',
        lastName: '',
        email: '',
        number: 0,
        password: '',
        confirmPassword: '',
        gender: '',
        department: '',
        role: 'User',       
        profileFile: null,      
        lisenceFile: null,
    });

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
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
                lisenceSrc: ""
            })
        }
    }

    const profileUpdate = e => {
        if (e.target.files && e.target.files[0]) {
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
            {console.log(imageFile)}
        }
        else {
            setValues({
                ...values,
                profileFile: null,
                profileSrc: ""
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
        if (values.profileSrc == null) {
            err.profileSrc = "select Profile picture"
        }

        return err;


    }

    const resetForm = () => {
        setValues([])
        document.getElementById('image-uploader').value = null;
        document.getElementById('license-uploader').value = null;
        setErrors({})
    }

    


    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('employeeId', this.state.employeeId);
        formData.append('email', this.state.email);
        formData.append('password', this.state.password);
        formData.append('firstName', this.state.firstName);
        formData.append('lastName', this.state.lastName);
        formData.append('number', this.state.number);
        formData.append('gender', this.state.gender);
        formData.append('department', this.state.department);
        formData.append('role', this.state.role);
        formData.append('profileFile', this.state.profileFile);
        formData.append('lisenceFile', this.state.lisenceFile);
        axios.post('https://localhost:7149/api/Registration/register', formData)
            .then(response => {
                console.log(response);
                alert('Registration successful!');
            })
            .catch(error => {
                console.log(error);
                alert('An error occurred.');
            });
    }

    

    return (
        <>
        {/* <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" onChange={handleChange} />
            </label>
            <br />
            <label>
                Email:
                <input type="email" name="email" onChange={handleChange} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" name="password" onChange={handleChange} />
            </label>
            <br />
            <label>
                Profile Image:
                <input type="file" name="image" onChange={handleChange} />
            </label>
            <br />
            <button type="submit">Register</button>
        </form> */}
        <Layout>
                <body className="register-body">
                    <div class="register-container">
                        <div class="register-title">Registration</div>
                        <div class="register-content">
                            <form className="register-form" onSubmit={handleSubmit}>
                                <div class="register-user-details">
                                    <div class="profile-input-box">
                                        <img src={values.profileSrc} height="100px" width="100px" />
                                        <input type="file" accept="image/*"
                                            onChange={profileUpdate} id="profile-uploader" />
                                        <p className="error-text">{errors.profileSrc}</p>
                                    </div>
                                    <div class="input-box">
                                        <span class="details">First Name</span>
                                        <input className={"form-control"} type="text" placeholder="First Name" name="firstName"
                                            value={values.firstName}
                                            onChange={handleChange} />
                                        <p className="error-text">{errors.firstName}</p>
                                    </div>
                                    <div class="input-box">
                                        <span class="details">Last Name</span>
                                        <input className={"form-control"} placeholder="LastName" name="lastName"
                                            value={values.lastName}
                                            onChange={handleChange} />
                                        <p className="error-text">{errors.lastName}</p>
                                    </div>
                                    <div class="input-box">
                                        <span class="details">Email</span>
                                        <input className={"form-control"} placeholder="Email" name="email"
                                            value={values.email}
                                            onChange={handleChange} />
                                        <p className="error-text">{errors.email}</p>
                                    </div>
                                    <div class="input-box">
                                        <span class="details">Phone Number</span>
                                        <input type="number" className={"form-control"} placeholder="Number" name="number"
                                            value={values.number}
                                            onChange={handleChange} required />
                                        <p className="error-text">{errors.number}</p>
                                    </div>
                                    <div class="input-box">
                                        <span class="details">Password</span>
                                        <input type="password" className={"form-control"} placeholder="Password" name="password"
                                            value={values.password}
                                            onChange={handleChange} />
                                        <p className="error-text">{errors.password}</p>
                                    </div>
                                    <div class="input-box">
                                        <span class="details">Confirm Password</span>
                                        <input type="password" placeholder="Password" name="confirmPassword"
                                            value={values.confirmPassword}
                                            onChange={handleChange} />
                                        <p className="error-text">{errors.confirmPassword}</p>
                                    </div>
                                    <div class="input-box">
                                        <span class="details">Gender</span>
                                        <div className="select-box">
                                            <select
                                                name="gender"
                                                value={values.gender}
                                                onChange={handleChange} >
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
                                                onChange={handleChange} >
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
                                            onChange={handleChange} required />
                                        <p className="error-text">{errors.employeeId}</p>
                                    </div>
                                    <div className="input-box">

                                    </div>
                                </div>


                                <div class="button">
                                    <input type="submit" value="Register" />
                                </div>
                            </form>
                        </div>
                    </div>

                </body>
            </Layout>
        </>
        
    );
};

export default RegistrationForm;