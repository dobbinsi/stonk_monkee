import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import nanalogo from "../images/nanalogo.JPG";
import AllCoins from "./AllCoins";
import star from "../images/star_vector.png";

const DisplayAll = (props) => {
    const [stonkList, setStonkList] = useState([]);
    const [userId, setUserId] = useState("");
    const [coinData, setCoinData] = useState([]);
    const [search, setSearch] = useState("");
    useEffect(() => {
        setUserId(localStorage.getItem("userId", userId));
        console.log(localStorage.getItem("userId"));
    }, []);
    useEffect(() => {
        axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
            .then((res) => {
                setCoinData(res.data);
                console.log(res.data);
            })
            .catch((err) => console.log(err));
    }, []);
    useEffect(() => {
        axios.get("http://localhost:8000/api/stonks")
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setStonkList(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleChange = e => {
        setSearch(e.target.value)
    };

    const filteredCoins = coinData.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())
    );

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

    const deleteStonk = (idFromBelow) => {
        axios.delete(`http://localhost:8000/api/stonks/${idFromBelow}`)
            .then((res) => {
                console.log(res.data);
                const newList = stonkList.filter((stonk, index) => stonk._id !== idFromBelow);
                setStonkList(newList);
            })
            .catch((err) => {
                console.log(err);
            })
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
                        <Link to={"/stonks/new"} className="nav-links">Add Stonks</Link>
                        <Link to={`/users/portfolio/${userId}`} className="nav-links">My Portfolio</Link>
                        <Link to={"/stonks/home"} className="nav-links">All Stonks</Link>
                        <Link to={"/"} className="nav-links" onClick={logout} >Log Out</Link>
                    </div>
                </div>
            </div>
            <div class="body-main">
                <div className="body-content-search">
                    <h1>Find your favorite stonks!</h1>
                    <form>
                        <div>
                            <input className="login-input" type="text" placeholder="Search by Name..." onChange={handleChange} />
                        </div>
                    </form>
                </div>
                {
                    stonkList.map((stonk, index) => (
                        <div key={index}>
                            <div className="coin-container">
                                <div className="coin-row">
                                    <div className="coin">
                                        <img src={stonk.logo} alt="coin" />
                                        <h2><Link to={"/stonks/home"} className='stonk-links'>{stonk.stonkName}</Link></h2>
                                        <h3 className="coin-ticker">{stonk.ticker}</h3>
                                    </div>
                                    <div className="coin-data">
                                        <h3 className="coin-price">${stonk.price}</h3>
                                        <p className="coin-marketcap">Market Cap: ${stonk.mktcap}</p>
                                        <img src={star} className="star" />
                                        <button class="delete-button" onClick={(e) => deleteStonk(stonk._id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                },
                {
                    filteredCoins.map(coin => {
                        return (
                            <AllCoins key={coin.id} id={coin.id} name={coin.name} image={coin.image} symbol={coin.symbol} market_cap={coin.market_cap} price={coin.current_price} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default DisplayAll;
