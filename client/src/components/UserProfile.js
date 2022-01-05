import React, { useEffect, useState } from 'react'
import axios from "axios";
import { NavLink as Link } from "react-router-dom";
import Header from './Header';
import { useParams } from "react-router-dom";
import AllCoins from "./AllCoins";


const UserProfile = () => {
    const { userId } = useParams();
    const [coinData, setCoinData] = useState([]);
    const [userStonkList, setUserStonkList] = useState([]);
    const [oneUser, setOneUser] = useState({});
    const [buyDate, setBuyDate] = useState("");
    const [sellDate, setSellDate] = useState("");
    const [trade, setTrade] = useState({
        buyData: {},
        sellData: {},
        pnl: 0,
        percent: 0
    });
    const [volume, setVolume] = useState(0);
    const [currency, setCurrency] = useState("");

    const tradeDateUrl = (currency, date) => {
        return `https://api.coingecko.com/api/v3/coins/${currency}/history?date=${date}&localization=false`;
    };

    const getTradeData = async (buy, currency, date) => {
        axios.get(tradeDateUrl(currency, date))
            .then((res) => {
                console.log(res.data);
                if (buy) {
                    setTrade({ ...trade, buyData: res.data });
                }
                else {
                    setTrade({ ...trade, sellData: res.data });
                }
                setBuyDate(res.data);
                setSellDate(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleCurrencyChange = (e) => {
        let val = e.target.value;
        setCurrency(val);
        getTradeData(null, currency, val);
    };

    const handleBuyChange = (e) => {
        let val = e.target.value;
        setBuyDate(val);
        getTradeData(true, currency, val);
    };

    const handleSellChange = (e) => {
        let val = e.target.value;
        setSellDate(val);
        getTradeData(false, currency, val);
    };

    const tradePnl = () => {
        setTrade({
            ...trade,
            pnl: (trade.sellData.market_data?.current_price.usd - trade.buyData.market_data?.current_price.usd) * volume,
            percent: (trade.sellData.market_data?.current_price.usd / trade.buyData.market_data?.current_price.usd) - 1,
        });
    };

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
        axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=03&page=1&sparkline=false")
            .then((res) => {
                setCoinData(res.data);
                console.log(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

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
            <div className="body-main">
                <div className="username-edit">
                    <h1>{oneUser.username}'s Profile</h1>
                    <div className='edit'>
                        <Link to={`/users/update/${userId}`} className="edit-button">
                            <i className='fas fa-edit' />
                        </Link>
                    </div>
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
                <h1 className="port-header">Trade Simulator</h1>
                <input placeholder="dd-mm-yyyy" defaultValue={buyDate} onChange={(val) => handleBuyChange(val)} />
                <h1>{trade.buyData.market_data?.current_price.usd.toLocaleString()} USD</h1>
                <input placeholder="dd-mm-yyyy" defaultValue={sellDate} onChange={(val) => handleSellChange(val)} />
                <h1>{trade.sellData.market_data?.current_price.usd.toLocaleString()} USD</h1>
                <input placeholder="insert number" onChange={(e) => setVolume(e.target.value)} />
                <h1>{volume}</h1>
                <button onClick={tradePnl}>Execute Trade</button>
                <div>
                    {
                        trade.pnl < 0 ?
                            <div>
                                <h1>Loss:</h1>
                                <h1 className='red-numbers'>{trade.pnl.toLocaleString()} USD</h1>
                            </div>
                            :
                            <div>
                                <h1>Profit:</h1>
                                <h1>{trade.pnl.toLocaleString()} USD</h1>
                            </div>
                    }
                    {
                        trade.percent < 0 ?
                            <h1 className='red-numbers'>{trade.percent.toLocaleString()} %</h1>
                            : <h1>{trade.percent.toLocaleString()} %</h1>
                    }
                </div>
                <input placeholder="currency (lowercase)" onChange={(val) => handleCurrencyChange(val)} />
            </div>
        </div>
    )
}

export default UserProfile;

