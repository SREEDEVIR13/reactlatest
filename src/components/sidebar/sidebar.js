import React, { useState } from 'react';
import "./sidebar.css"
import { Link, useNavigate } from 'react-router-dom';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';


function Sidebar(props){

    const  adminlogoutHandler = (e) => {
        e.preventDefault ()
        localStorage.clear();
        window.location.reload();
        navigate('/admin-login');  
      }

      const navigate=useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: "/admin-dashboard",
            name: "Dashboard",
        },
        
        {
            path: "/admin-users",
            name: "Users",
        },
        {
            path: "/admin-trips-current",
            name: "Trips",
        },
    ]
    return (
        <>
        <div className='navbar-css'>
          <div className='ImageContainerClassLayout'>
          <img src="/img/Ride Buddy-logo.png" height="80px" width="200px"></img>
          </div>
          
            <div className='HeaderProfileClass'>
              <div className='profile-div'>
              {/* <FaUserAlt/>
              <Link>Profile</Link>
              <h2>Profile</h2> */}
              {localStorage.getItem("token")===null?
              <Link className='link' to="/admin-login">
              LOGIN
          </Link>:
          <button className='link' onClick={adminlogoutHandler}>Logout</button>
              }


              </div>
              
              </div>
          

        </div>
        <div className='body-div'>
        <div className="sidebar-div">
                
                {
                    menuItem.map((item, index) => (
                        
                        <NavLink to={item.path} key={index} className="sidebar-link" activeclassName="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{ display: "block" }} className="link_text">{item.name}</div>
                        </NavLink>
                        
                    ))
                }
            </div>
            <div className='main-div-sidebar'>{props.children}</div>

        </div>
            
            </>
    
    );
};

export default Sidebar;