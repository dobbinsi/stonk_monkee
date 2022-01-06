import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import StonkForm from "./StonkForm";


const CreateStonk = () => {
    const [errors, setErrors] = useState({});
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();
    const [newStonk, setNewStonk] = useState({
        stonkName: "",
        ticker: "",
        price: "",
        mktcap: "",
        logo: "",
    });

    const createSubmitHandler = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/stonks/new`, newStonk,
            { withCredentials: true })
            .then((res) => {
                navigate("/stonks/home");
            })
            .catch((err) => {
                setErrors(err.response.data.errors);
            })
    };

    useEffect(() => {
        setUserId(localStorage.getItem("userId"));
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
                    <StonkForm
                        submitHandler={createSubmitHandler}
                        stonk={newStonk}
                        setStonk={setNewStonk}
                        errors={errors}
                        buttonText={"Add Stonk!"}
                    />
                </div>
            </div>
        </div>
    )
}

export default CreateStonk;