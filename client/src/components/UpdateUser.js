import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "./Header";
import UserForm from "./UserForm";


const UpdateUser = () => {
    const { userId } = useParams();
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [updatedUser, setUpdatedUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        picture: "",
        experience: "",
        quote: "",
    });

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${userId}`)
            .then((res) => {
                setUpdatedUser(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const updateSubmitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/users/update/${userId}`, updatedUser,
            { withCredentials: true })
            .then((res) => {
                navigate(`/users/portfolio/${userId}`);
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            })
    };

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
                    <h1>Edit Profile</h1>
                    <UserForm
                        submitHandler={updateSubmitHandler}
                        user={updatedUser}
                        setUser={setUpdatedUser}
                        errors={errors}
                        buttonText={"Update Now!"}
                    />
                </div>
            </div>
        </div>
    )
}

export default UpdateUser;
