import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import nanalogo from "../images/nanalogo.JPG";

const CreateStonk = (props) => {
    const [errors, setErrors] = useState({});
    const [userId, setUserId] = useState("");
    const [stonkName, setStonkName] = useState("");
    const [ticker, setTicker] = useState("");
    const [logo, setLogo] = useState("");
    const createSubmitHandler = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/stonks/new`,
            {
                stonkName,
                ticker,
                logo
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
    useEffect(() => {
        setUserId(localStorage.getItem("userId", userId));
        console.log(localStorage.getItem("userId"));
    }, []);

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
            <div className="body-main">
                <div className="body-content-login">
                    <h1>Add New Stonk</h1>
                    <form onSubmit={createSubmitHandler}>
                        <div>
                            <label className="form-labels">Name:</label>
                            <input onChange={(e) => setStonkName(e.target.value)} className="login-input" type="text" name="stonkName" value={stonkName} />
                            {
                                errors.stonkName ?
                                    <span>{errors.stonkName.message}</span>
                                    : null
                            }
                        </div>
                        <div>
                            <label className="form-labels">Ticker Symbol:</label>
                            <input className="login-input" type="text" name="ticker" value={ticker} onChange={(e) => setTicker(e.target.value)} />
                            {
                                errors.ticker ?
                                    <span>{errors.ticker.message}</span>
                                    : null
                            }
                        </div>
                        <div>
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