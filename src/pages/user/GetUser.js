import React, { useState, useEffect } from "react";
import * as Icons from "react-icons/fa";
import axios from "axios";
import swal from "sweetalert";
import "./GetUser.css"
// import PopUp from "./PopUp";

import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Layout from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

// const Id = "SYT865";
const userId = localStorage.getItem("Uid");
export default function GetUser() {
    const [userDetail, setUserDetail] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState([]);

    useEffect(() => {
        GetList();
      }, []);




      function GetList() {
        axios
          // .get(`https://localhost:7149/api/Registration/getDetail/` + Id)
          .get(`https://localhost:7149/api/Registration/getDetail/` + userId)
          .then((Response) => {
            setUserDetail(Response.data);
            console.log("vehicle-get", Response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      function GetPhoneNumber(e,employeeId) {
        axios
          .get(`https://localhost:7149/api/Call/getNumber/` + employeeId)
          
          .then((Response) => {
            setPhoneNumber(Response.data);
            console.log("number-get", Response.data);
            console.log("store",phoneNumber);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    



      const setModalClose = () => {
        setOpenModal(false);
      };
    




  return (
    <Layout>
    <div className="list-arrangeElement">
      

      {userDetail.map((data) => {
        return (
          <div key={data.employeeId} className="RowArrange">
           
           
              <div className="card-body">
                <h5> {data.firstName}</h5>
                <span> {data.lastName}</span>
                <br></br>
                <span> {data.gender}</span>
                <br></br>
                <span> {data.department}</span>
                <br></br>
                <span> {data.role}</span>
                <br></br>


                <button
                  className="btn btn-light delete-button"
                  onClick={() => {
                    setOpenModal(true);
                    GetPhoneNumber();
                  }}
                >
                  <Icons.FaPhone color="green" />
                </button>
                <Modal show={openModal} onHide={setModalClose}  className='modalContainer'>
                  <Modal.Header>
                    <Modal.Title>Phone Number</Modal.Title>
                    <div className='titleCloseBtn'> <button onClick={()=> setModalClose(false)}> x</button></div>
                  </Modal.Header>
                  <Form  onSubmit={(e) => GetPhoneNumber(e, (data.employeeId))}
                    >
                  <Modal.Body className="title">
                    
                  <label> {data.number}</label>
                      
                  </Modal.Body>
                  <Modal.Footer className='footer' >
                    <div>
                      <button type="submit" id="YesBtn">
                        ok
                      </button>
                     
                    </div>
                  </Modal.Footer>
                  </Form>
                </Modal>
                
              </div>
            </div>
         
        );
      })}
      </div>
      <Footer></Footer>
      </Layout>
  );
    }