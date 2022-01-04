import React, { useState } from 'react';
import axios from "axios";
import { NavLink as Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import logo from "../images/nanalogo.JPG";


const Header = (props) => {
    const { linkOne, textOne, linkTwo, textTwo, linkThree, textThree, linkFour, textFour } = props;
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const navigate = useNavigate();

    const logout = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/logout",
            {},
            {
                withCredentials: true,
            },
        )
            .then((res) => {
                localStorage.removeItem("userId");
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="header-main">
            <nav className='navbar'>
                <div className='brand-logo'>
                    <Link to={linkOne} className="navbar-logo">
                        <img src={logo} className='nana-logo' alt='bananas' />
                    </Link>
                    <Link to={linkOne} className="navbar-logo">
                        <h1>StonkMonkee</h1>
                    </Link>
                </div>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to={linkOne} className='nav-links' onClick={closeMobileMenu}>
                            {textOne}
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to={linkTwo} className='nav-links' onClick={closeMobileMenu}>
                            {textTwo}
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to={linkThree} className='nav-links' onClick={closeMobileMenu}>
                            {textThree}
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to={linkFour} className='nav-links' onClick={logout}>
                            {textFour}
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Header;

