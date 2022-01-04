import React, { useState } from "react";
import axios from "axios";
import { NavLink as Link } from "react-router-dom";
import Header from "./Header";

const Register = () => {
    const [confirmReg, setConfirmReg] = useState("");
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        picture: "",
        experience: "",
        quote: "",
    });
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
    const register = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/register", user,
            {
                withCredentials: true,
            },
        )
            .then((res) => {
                console.log("res.data", res.data);
                setUser({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    picture: "",
                    experience: "",
                    quote: "",
                });
                setConfirmReg(
                    "Thank you for registering! You can now login."
                );
                setErrors({});
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
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
                    <h1>Register</h1>
                    {confirmReg ? <h4>{confirmReg}</h4> : null}
                    <form onSubmit={register}>
                        <div className="logregform">
                            <label className="form-labels">Username:</label>
                            <input className="login-input" type="text" name="username" value={user.username} onChange={handleChange} />
                            {errors.username ? (
                                <span className="error-text">
                                    {errors.username.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="logregform">
                            <label className="form-labels">Email:</label>
                            <input className="login-input" type="text" name="email" value={user.email} onChange={handleChange} />
                            {errors.email ? (
                                <span className="error-text">
                                    {errors.email.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="logregform">
                            <label className="form-labels">Password:</label>
                            <input className="login-input" type="password" name="password" value={user.password} onChange={handleChange} />
                            {errors.password ? (
                                <span className="error-text">
                                    {errors.password.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="logregform">
                            <label className="form-labels">Confirm Password:</label>
                            <input className="login-input" type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} />
                            {errors.confirmPassword ? (
                                <span className="error-text">
                                    {errors.confirmPassword.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="logregform">
                            <label className="form-labels">Profile Picture (Img URL):</label>
                            <input className="login-input" type="text" name="picture" value={user.picture} onChange={handleChange} />
                            {errors.picture ? (
                                <span className="error-text">
                                    {errors.picture.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="logregform">
                            <label className="form-labels">Trading Experience (yrs):</label>
                            <input className="login-input" type="number" name="experience" value={user.experience} onChange={handleChange} />
                            {errors.experience ? (
                                <span className="error-text">
                                    {errors.experience.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="logregform">
                            <label className="form-labels">Favorite Quote:</label>
                            <textarea className="login-input" rows="4" type="text" name="quote" value={user.quote} onChange={handleChange} />
                            {errors.quote ? (
                                <span className="error-text">
                                    {errors.quote.message}
                                </span>
                            ) : null}
                        </div>
                        <div className="center-button">
                            <button class="hover-button" type="submit">Register Now!</button>
                        </div>
                    </form>
                </div>
                <Link to={"/"} className="logreg-links">Already signed up? Login here!</Link>
            </div>
        </div>
    )
}

export default Register;
