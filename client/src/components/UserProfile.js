import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link, navigate } from "@reach/router";
import nanalogo from "../images/nanalogo.JPG";
import AllCoins from "./AllCoins";

const UserProfile = (props) => {
    const { userId } = props;
    const [coinData, setCoinData] = useState([]);
    const [userStonkList, setUserStonkList] = useState([]);
    const [oneUser, setOneUser] = useState({});

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

    useEffect(() => {
        axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
            .then((res) => {
                setCoinData(res.data);
                console.log(res.data);
            })
            .catch((err) => console.log(err));
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

    return (
        <div>
            <div className="header-main">
                <div className="brand-logo">
                    <img src={nanalogo} className="nana-logo" />
                    <h1>StonkMonkee</h1>
                </div>
                <div>
                    <div className="navbar">
                        <Link to={"/stonks/home"} className="nav-links">All Stonks</Link>
                        <Link to={"/stonks/new"} className="nav-links">Add Stonks</Link>
                        <Link to={`/users/portfolio/${userId}`} className="nav-links">My Portfolio</Link>
                        <Link to={"/"} className="nav-links" onClick={logout} >Log Out</Link>
                        <select>
                            <option value={"/"}>Navigation</option>
                            <option value={"/stonks/home"}>All Stonks</option>
                            <option value={"/stonks/new"}>Add Stonks</option>
                            <option value={`/users/portfolio/${userId}`}>My Portfolio</option>
                            <option value={"/"} onClick={logout}>Log Out</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="body-main">
                <div className="username-edit">
                    <h1>{oneUser.username}'s Profile</h1>
                    <button className="edit-button"><Link to={`/users/update/${userId}`} className="edit-button">Edit Profile</Link></button>
                </div>
                <div className="body-profile">
                    <div className="body-profile-pic">
                        <img src={oneUser.picture} alt="user profile picture" />
                    </div>
                    <div className="profile-details">
                        <div className="profile-details-text">
                            <h1>About Me</h1>
                            <h2>Trading Experience:</h2>
                            <p>{oneUser.experience} years</p>
                            <h2>Favorite Quote:</h2>
                            <p>{oneUser.quote}</p>
                        </div>
                    </div>
                </div>
                <h1 className="port-header">Portfolio</h1>
                {
                    coinData.map(coin => {
                        return (
                            <AllCoins key={coin.id} id={coin.id} name={coin.name} image={coin.image} symbol={coin.symbol} market_cap={coin.market_cap} price={coin.current_price} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default UserProfile;

