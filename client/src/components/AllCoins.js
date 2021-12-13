import React from 'react';
import star from "../images/star_vector.png";
import { Link, navigate } from "@reach/router";


const AllCoins = ({name, image, symbol, price, market_cap, id}) => {
    return (
        <div className="coin-container">
            <div className="coin-row">
                <div className="coin">
                    <img src={image} alt="coin" />
                    <h1><Link to={`/stonks/${id}`} className='stonk-links'>{name}</Link></h1>
                    <h2 className="coin-ticker">{symbol}</h2>
                </div>
                <div className="coin-data">
                    <h3 className="coin-price">${price.toFixed(2)}</h3>
                    <p className="coin-marketcap">Market Cap: ${market_cap.toLocaleString()}</p>
                    <img src={star} className="star"/>
                </div>
            </div>
        </div>
    )
}

export default AllCoins;
