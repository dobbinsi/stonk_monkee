import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink as Link } from "react-router-dom";
import Header from "./Header";
import AllCoins from "./AllCoins";


const DisplayAll = () => {
    const [stonkList, setStonkList] = useState([]);
    const [userId, setUserId] = useState("");
    const [coinData, setCoinData] = useState([]);
    const [search, setSearch] = useState("");
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    useEffect(() => {
        setUserId(localStorage.getItem("userId"));
    }, []);

    useEffect(() => {
        axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=2000&page=1&sparkline=false")
            .then((res) => {
                setCoinData(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8000/api/stonks")
            .then((res) => {
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

    const deleteStonk = (idFromBelow) => {
        axios.delete(`http://localhost:8000/api/stonks/${idFromBelow}`)
            .then((res) => {
                const newList = stonkList.filter((stonk, index) => stonk._id !== idFromBelow);
                setStonkList(newList);
            })
            .catch((err) => {
                console.log(err);
            })
    };

    return (
        <div>
            <Header
                linkOne={"/stonks/home"}
                textOne={"All Stonks"}
                linkTwo={"/stonks/new"}
                textTwo={"Add Stonks"}
                linkThree={`/users/portfolio/${userId}`}
                textThree={"My Portfolio"}
                linkFour={"/"}
                textFour={"Log Out"}
            />
            <div class="body-main">
                <div className="body-content-search">
                    <h1>Find your favorite stonks!</h1>
                    <form className="search-form">
                        <div className="search-form">
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
                                        <div className='fav-star' onClick={handleClick}>
                                            <i className={click ? 'fas fa-star' : 'far fa-star'} />
                                        </div>
                                        <div className='trashcan' onClick={(e) => deleteStonk(stonk._id)}>
                                            <i className='fas fa-trash-alt' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
                {
                    filteredCoins.map(coin => {
                        return (
                            <AllCoins
                                key={coin.id}
                                id={coin.id}
                                name={coin.name}
                                image={coin.image}
                                symbol={coin.symbol}
                                market_cap={coin.market_cap}
                                price={coin.current_price}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default DisplayAll;
