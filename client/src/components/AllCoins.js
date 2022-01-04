import React, { useState } from 'react';
import { NavLink as Link } from 'react-router-dom';


const AllCoins = ({name, image, symbol, price, market_cap, id}) => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
// ^^ NEED TO MODIFY HANDLECLICK => ADD TO FAVORITE LIST 

    return (
        <div className="coin-container">
            <div className="coin-row">
                <div className="coin">
                    <img src={image} alt="coin" />
                    <h2><Link to={`/stonks/${id}`} className='stonk-links'>{name}</Link></h2>
                    <h3 className="coin-ticker">{symbol}</h3>
                </div>
                <div className="coin-data">
                    <h3 className="coin-price">${price.toFixed(2)}</h3>
                    <p className="coin-marketcap">Market Cap: ${market_cap.toLocaleString()}</p>
                    <div className='fav-star' onClick={handleClick}>
                        <i  className={click? 'fas fa-star' : 'far fa-star'} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllCoins;
