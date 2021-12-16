import React, { useState } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import logo from "../images/nanalogo.JPG";


const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const login = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8000/api/users/login",
            {
                email: email,
                password: password,
            },
            {
                withCredentials: true,
            },
        )
            .then((res) => {
                console.log(res.data);
                console.log(res.data.userId);
                localStorage.setItem("userId", res.data.userId);
                navigate("/stonks/home");
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrorMessage(err.response.data.message);
            });
    };

    return (
        <div>
            <div className="header-main">
                <div className="brand-logo">
                    <img src={logo} className="nana-logo" />
                    <h1>StonkMonkee</h1>
                </div>
                <div>
                    <div className="navbar">
                        <Link to={"/"} className="nav-links">All Stonks</Link>
                        <Link to={"/"} className="nav-links">Add Stonks</Link>
                        <Link to={"/"} className="nav-links">My Portfolio</Link>
                        <Link to={"/"} className="nav-links">Log Out</Link>
                    </div>
                </div>
            </div>
            <div className="body-main">
                <div className="body-content-logreg">
                    <h1>Login</h1>
                    <span>{errorMessage ? errorMessage : ""}</span>
                    <form onSubmit={login}>
                        <div>
                            <label className="form-labels">Email:</label>
                            <input className="login-input" type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label className="form-labels">Password:</label>
                            <input className="login-input"type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="center-button">
                            <button class="hover-button" type="submit">Login!</button>
                        </div>
                    </form>
                </div>
            <Link to={"/register"} className="logreg-links">New user? Register here!</Link>
            </div>
        </div>
    )
}

export default Login;
