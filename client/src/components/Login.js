import React, { useState } from "react";
import axios from "axios";
import { NavLink as Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "./Header";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

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
            <Header
                linkOne={"/."}
                textOne={"All Stonks"}
                linkTwo={"/."}
                textTwo={"Add Stonks"}
                linkThree={"/."}
                textThree={"My Portfolio"}
                linkFour={"/."}
                textFour={"Log Out"}
            />
            <div className="body-main">
                <div className="body-content-logreg">
                    <h1>Login</h1>
                    <form onSubmit={login}>
                        <div className="logregform">
                            <label className="form-labels">Email:</label>
                            <input className="login-input" type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="logregform">
                            <label className="form-labels">Password:</label>
                            <input className="login-input" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <span>{errorMessage ? errorMessage : ""}</span>
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
