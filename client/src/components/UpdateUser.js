import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, navigate } from "@reach/router";
import nanalogo from "../images/nanalogo.JPG";


const UpdateUser = (props) => {
    const { userId } = props;
    const [errors, setErrors] = useState({});
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [picture, setPicture] = useState("");
    const [experience, setExperience] = useState("");
    const [quote, setQuote] = useState("");
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${userId}`)
            .then((res) => {
                console.log(res.data);
                setUsername(res.data.username);
                setEmail(res.data.email);
                setPassword(res.data.password);
                setConfirmPassword(res.data.confirmPassword);
                setPicture(res.data.picture);
                setExperience(res.data.experience);
                setQuote(res.data.quote);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const updateSubmitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/users/update/${userId}`,
            {
                username,
                email,
                password,
                picture,
                experience,
                quote
            })
            .then((res) => {
                console.log(res.data);
                navigate(`/users/${userId}`);
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

    return (
        <div>
            <div className="header-main">
                <div className="brand-logo">
                    <img src={nanalogo} className="nana-logo" />
                    <h1>StonkMonkee</h1>
                </div>
                <div>
                    <div className="navbar">
                        <Link to={"/stonks/home"} className="nav-links">All Stonks</Link>
                        <Link to={"/stonks/new"} className="nav-links">Add Stonks</Link>
                        <Link to={`/users/portfolio/${userId}`} className="nav-links">My Portfolio</Link>
                        <Link to={"/"} className="nav-links">Log Out</Link>
                        <select>
                            <option value={"/"}>Navigation</option>
                            <option value={"/stonks/home"}>All Stonks</option>
                            <option value={"/stonks/new"}>Add Stonks</option>
                            <option value={`/users/portfolio/${userId}`}>My Portfolio</option>
                            <option value={"/"} onClick={logout}>Log Out</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="body-main">
                <div className="body-content-logreg">
                    <h1>Edit Profile</h1>
                    <form onSubmit={updateSubmitHandler}>
                        <div className="logregform">
                            <label className="form-labels">Username:</label>
                            <input className="login-input" type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            {errors.username ? (
                                <span className="error-text">
                                    {errors.username.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="logregform">
                            <label className="form-labels">Email:</label>
                            <input className="login-input" type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            {errors.email ? (
                                <span className="error-text">
                                    {errors.email.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="logregform">
                            <label className="form-labels">Password:</label>
                            <input className="login-input" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            {errors.password ? (
                                <span className="error-text">
                                    {errors.password.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="logregform">
                            <label className="form-labels">Confirm Password:</label>
                            <input className="login-input" type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            {errors.confirmPassword ? (
                                <span className="error-text">
                                    {errors.confirmPassword.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="logregform">
                            <label className="form-labels">Profile Picture (Img URL):</label>
                            <input className="login-input" type="text" name="picture" value={picture} onChange={(e) => setPicture(e.target.value)} />
                            {errors.picture ? (
                                <span className="error-text">
                                    {errors.picture.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="logregform">
                            <label className="form-labels">Trading Experience (yrs):</label>
                            <input className="login-input" type="number" name="experience" value={experience} onChange={(e) => setExperience(e.target.value)} />
                            {errors.experience ? (
                                <span className="error-text">
                                    {errors.experience.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="logregform">
                            <label className="form-labels">Favorite Quote:</label>
                            <textarea className="login-input" rows="4" type="text" name="quote" value={quote} onChange={(e) => setQuote(e.target.value)} />
                            {errors.quote ? (
                                <span className="error-text">
                                    {errors.quote.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="center-button">
                            <button class="hover-button" type="submit">Update Now!</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateUser;
