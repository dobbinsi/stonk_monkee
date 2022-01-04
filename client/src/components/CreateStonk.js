import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink as Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const CreateStonk = () => {
    const [errors, setErrors] = useState({});
    const [userId, setUserId] = useState("");
    const [stonkName, setStonkName] = useState("");
    const [ticker, setTicker] = useState("");
    const [logo, setLogo] = useState("");
    const [price, setPrice] = useState("");
    const [mktcap, setMktcap] = useState("");
    const navigate = useNavigate();


    const createSubmitHandler = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/stonks/new`,
            {
                stonkName,
                ticker,
                logo,
                price,
                mktcap
            }, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                navigate("/stonks/home");
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            })
    };

    useEffect(() => {
        setUserId(localStorage.getItem("userId", userId));
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
                <div className="body-content-logreg">
                    <h1>Add New Stonk</h1>
                    <form onSubmit={createSubmitHandler}>
                        <div className="logregform">
                            <label className="form-labels">Name:</label>
                            <input onChange={(e) => setStonkName(e.target.value)} className="login-input" type="text" name="stonkName" value={stonkName} />
                            {
                                errors.stonkName ?
                                    <span>{errors.stonkName.message}</span>
                                    : null
                            }
                        </div>
                        <div className="logregform">
                            <label className="form-labels">Ticker Symbol:</label>
                            <input className="login-input" type="text" name="ticker" value={ticker} onChange={(e) => setTicker(e.target.value)} />
                            {
                                errors.ticker ?
                                    <span>{errors.ticker.message}</span>
                                    : null
                            }
                        </div>
                        <div className="logregform">
                            <label className="form-labels">Current Price ($):</label>
                            <input className="login-input" type="text" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                            {
                                errors.price ?
                                    <span>{errors.price.message}</span>
                                    : null
                            }
                        </div>
                        <div className="logregform">
                            <label className="form-labels">Market Cap ($):</label>
                            <input className="login-input" type="text" name="mktcap" value={mktcap} onChange={(e) => setMktcap(e.target.value)} />
                            {
                                errors.mktcap ?
                                    <span>{errors.mktcap.message}</span>
                                    : null
                            }
                        </div>
                        <div className="logregform">
                            <label className="form-labels">Logo (Img URL):</label>
                            <input className="login-input" type="text" name="logo" value={logo} onChange={(e) => setLogo(e.target.value)} />
                            {
                                errors.logo ?
                                    <span>{errors.logo.message}</span>
                                    : null
                            }
                        </div>
                        <div className="center-button">
                            <button class="hover-button" type="submit">Add Stonk!</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateStonk;