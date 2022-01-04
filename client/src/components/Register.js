import React, { useState } from "react";
import axios from "axios";
import { NavLink as Link } from "react-router-dom";
import Header from "./Header";
import UserForm from "./UserForm";


const Register = () => {
    const [confirmReg, setConfirmReg] = useState("");
    const [errors, setErrors] = useState({});
    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        picture: "",
        experience: "",
        quote: "",
    });

    const registerSubmitHandler = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/users/register`, newUser,
            { withCredentials: true })
            .then((res) => {
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
                    <UserForm
                        submitHandler={registerSubmitHandler}
                        user={newUser}
                        setUser={setNewUser}
                        errors={errors}
                        buttonText={"Register Now!"}
                    />
                </div>
                <Link to={"/"} className="logreg-links">Already signed up? Login here!</Link>
            </div>
        </div>
    )
}

export default Register;
