
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import {useNavigate} from "react-router-dom"
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList
} from "react-icons/fa";

import "./AdminNavbar.css"


function AdminLayout(props) {

    const navigate = useNavigate();
    const  logoutHandler = (e) => {
      e.preventDefault ()
      localStorage.clear();
      window.location.reload();
      navigate('/');  
    }


    return (
        <>

            <div className='navbar-css'>
                <div className='ImageContainerClassLayout'>
                    <img src="/img/rblogo (2).png" height="80px" width="200px"></img>
                </div>
                <div className='topCenter'>
                    
                </div>
                <div className='topRight'>
                    <ul className='topList'>
                        <li className='topListItem'>
                        { localStorage.getItem('token')===null?
                            <Link className='link' to="/user-login">
                                LOGIN
                            </Link>:
                            <button className='link' onClick={logoutHandler}>Logout</button>
                        }   
                        </li>
                    
                    </ul>
                </div>


            </div>


            <div className='below-navbar-div' >

                {props.children}

            </div>

        </>

    )
}
export default AdminLayout;