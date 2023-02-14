import React, { useEffect } from "react";
import Footer from "../../components/footer/footer";
import Layout from "../../components/navbar/navbar";
import { Link } from 'react-router-dom';
import "./HomePage.css"
import { decodeToken } from "react-jwt";
import {useNavigate} from "react-router-dom"

export default function HomePage(){
    const navigate= useNavigate();
    useEffect(()=>{
        //TokenCheck()
    })

    const TokenCheck = () => {

        const storeToken = localStorage.getItem("token");
        if (storeToken === null || "" ) {
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

    return(
        <>
        <Layout>
        <div className='Img'>
        <img
          className='topImg'
          src="https://th.bing.com/th/id/R.7934bf67c34ad2bb61260a16e0d11242?rik=yLW38LOADjPH1w&riu=http%3a%2f%2fblog.quickride.in%2fwp-content%2fuploads%2f2019%2f04%2fcarpoolgirls-1024x634.jpg&ehk=Lm6CAA4zzCvYZtV6ofqSFtoh6WH%2fZcN3yEmdW5t%2fIQg%3d&risl=&pid=ImgRaw&r=0"
          alt=""
          width="100" height="100"
        />
        <div className="i-name">

          <div className='SpanClassHeader'>"Reduce CO2 . Save Money . Grow network" </div>

          <div className='pool'>
            <Link to="/join-ride" className='btn1'>Join Pool</Link>
            <Link to="/host-ride" className='btn1'>Host Pool</Link>
          </div>
          {/* <button className=" btn1">Host Pool</button> */}
        </div>

      </div>

            <Footer></Footer>
        </Layout>
        </>
    )
}