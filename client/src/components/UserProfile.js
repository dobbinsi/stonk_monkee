import React, {useEffect, useState} from 'react'
import axios from "axios";
import { Link, navigate } from "@reach/router";
import nanalogo from "../images/nanalogo.JPG";


const UserProfile = (props) => {
    const [userStonkList, setUserStonkList] = useState([]);
    const [oneUser, setOneUser] = useState({});
    const [userId, setUserId] = useState("");

    useEffect(() => {
        setUserId(localStorage.getItem("userId", userId));
        console.log(localStorage.getItem("userId"));
    }, []);
    
    // useEffect(() => {
    //     axios.get(`http://localhost:8000/api/users/pirates/${id}`)
    //         .then((res) => {
    //             console.log(res.data);
    //             setUserPirateList(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${userId}`)
            .then((res) => {
                console.log(res.data);
                setOneUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const logout = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/logout",
            {},
            {
                withCredentials: true,
            },
        )
            .then((res) => {
                console.log(res.data);
                localStorage.removeItem("userId");
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // const deletePirate = (idFromBelow) => {
    //     axios.delete(`http://localhost:8000/api/pirates/${idFromBelow}`)
    //         .then((res) => {
    //             console.log(res.data);
    //             const newList = pirateList.filter((pirate, index) => pirate._id !== idFromBelow);
    //             setPirateList(newList);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }

    return (
        <div>
            <div className="header-main">
                <div className="brand-logo">
                    <img src={nanalogo} className="nana-logo" />
                    <h1>StonkMonkee</h1>
                </div>
                <div>
                    <div className="navbar">
                        <Link to={"/stonks/new"} className="nav-links">Add Stonks</Link>
                        <Link to={`/users/portfolio/${userId}`} className="nav-links">My Portfolio</Link>
                        <Link to={"/stonks/home"} className="nav-links">All Stonks</Link>
                        <Link to={"/"} className="nav-links" onClick={logout} >Log Out</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;

