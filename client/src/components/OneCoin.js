// import axios from 'axios';
// import React, {useEffect, useState} from 'react';


// // const OneCoin = ({ name, image, symbol, price, market_cap, id }) => {
// //     return (
// //         <div className="body-main">
// //             <div className="name-ticker">
// //                 <img src={image} alt="coin" className="img-details" />
// //                 <h1>{name}</h1>
// //                 <h2 className="coin-ticker">({symbol})</h2>
// //             </div>
// //             <h1>${price}</h1>
// //         </div>
// //     )
// // }
// const OneCoin = (props) => {
//     const { id } = props;
//     const [coin, setCoin] = useState({});
//     const getCoinData = async() => {
//         const {data} = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
//         setCoin(data);
//     };
//     useEffect(() => {
//         getCoinData();
//     }, []);
    
//     return (
//         <div className="body-main">
//             <div className="name-ticker">
//                 <img src={coin.image.thumb} alt="coin" className="img-details" />
//                 <h1>{coin.name}</h1>
//                 <h2 className="coin-ticker">({coin.symbol})</h2>
//             </div>
//             {/* <h1>${coin.market_data.current_price}</h1> */}
//         </div>
//     )
// }

// export default OneCoin;

