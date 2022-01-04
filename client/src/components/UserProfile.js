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
        axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=05&page=1&sparkline=false")
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
                    <div>
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
            </div>
        </div>
    )
}

export default UserProfile;

