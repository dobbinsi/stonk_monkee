import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { NavLink as Link } from "react-router-dom";
import Header from "./Header";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'


const DisplayOne = () => {
    const { id } = useParams();
    const [stonk, setStonk] = useState({});
    const [imageData, setImageData] = useState({});
    const [priceData, setPriceData] = useState({});
    const [capData, setCapData] = useState({});
    const [chartData, setChartData] = useState([]);
    const [sevenData, setSevenData] = useState([]);
    const [thirtyData, setThirtyData] = useState([]);
    const [sixtyData, setSixtyData] = useState([]);
    const [twoHundredData, setTwoHundredData] = useState([]);
    const [oneYearData, setOneYearData] = useState([]);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setStonk(res.data);
                setImageData(res.data.image.small);
                setPriceData(res.data.market_data.current_price);
                setCapData(res.data.market_data.market_cap);
                setSevenData(res.data.market_data.price_change_percentage_7d);
                setThirtyData(res.data.market_data.price_change_percentage_30d);
                setSixtyData(res.data.market_data.price_change_percentage_60d);
                setTwoHundredData(res.data.market_data.price_change_percentage_200d);
                setOneYearData(res.data.market_data.price_change_percentage_1y);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=365&interval=daily`)
            .then((res) => {
                console.log(res);
                console.log(res.data.prices);
                console.log(res.data.prices[0]);
                setChartData(res.data.prices);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        setUserId(localStorage.getItem("userId"));
        console.log(localStorage.getItem("userId"));
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
                <div className="name-ticker">
                    <img src={imageData} alt="coin" className="img-details" />
                    <h1>{stonk.name}</h1>
                    <h2 className="coin-ticker">({stonk.symbol})</h2>
                </div>
                <h2 className="big-price">${priceData.usd}</h2>
                <p className="big-mktcap">Market Cap: ${capData.usd}</p>
                <div className="chart-area">
                    <Line
                        data={{
                            labels: chartData.map((coin) => {
                                let date = new Date(coin[0]);
                                return date.toLocaleDateString();
                            }),
                            datasets: [
                                {
                                    data: chartData.map((coin) => coin[1]),
                                    label: "Price (USD)",
                                    borderColor: "gold",
                                },
                            ],
                        }}
                        options={{
                            elements: {
                                point: {
                                    radius: 2,
                                },
                            },
                        }}
                    />
                </div>
                <div className="price-change">
                    <table className="price-table">
                        <tr>
                            <th>7d</th>
                            <th>30d</th>
                            <th>60d</th>
                            <th>200d</th>
                            <th>1y</th>
                        </tr>
                        <tr>
                            {
                                sevenData < 0 ?
                                    <td className="red-numbers">{sevenData} %</td>
                                    : <td>{sevenData} %</td>
                            }
                            {
                                thirtyData < 0 ?
                                    <td className="red-numbers">{thirtyData} %</td>
                                    : <td>{thirtyData} %</td>
                            }
                            {
                                sixtyData < 0 ?
                                    <td className="red-numbers">{sixtyData} %</td>
                                    : <td>{sixtyData} %</td>
                            }
                            {
                                twoHundredData < 0 ?
                                    <td className="red-numbers">{twoHundredData} %</td>
                                    : <td>{twoHundredData} %</td>
                            }
                            {
                                oneYearData < 0 ?
                                    <td className="red-numbers">{oneYearData} %</td>
                                    : <td>{oneYearData} %</td>
                            }
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DisplayOne;