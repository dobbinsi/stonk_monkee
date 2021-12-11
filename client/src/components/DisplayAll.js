// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, navigate } from "@reach/router";

// const DisplayAll = (props) => {
//     const [stonkList, setStonkList] = useState([]);
//     const [userId, setUserId] = useState("");
//     useEffect(() => {
//         axios.get("http://localhost:8000/api/stonks")
//             .then((res) => {
//                 console.log(res);
//                 console.log(res.data);
//                 setStonkList(res.data);
//             })
//             .catch((err) => console.log(err));
//     }, []);
//     useEffect(() => {
//         setUserId(localStorage.getItem("userId", userId));
//         console.log(localStorage.getItem("userId"));
//     }, [])

//     const logout = (e) => {
//         e.preventDefault();
//         axios.post("http://localhost:8000/api/users/logout",
//             {
//                 withCredentials: true,
//             },
//         )
//             .then((res) => {
//                 console.log(res.data);
//                 localStorage.removeItem("userId");
//                 navigate("/");
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     };

//     return (
//         <div>
//             <div className="header-main">
//                 <div className="brand-logo">
//                     <img className="nana-logo"></img>
//                     <h1>StonkMonkee</h1>
//                 </div>
//                 <div>
//                     <div className="navbar">
//                         <button className="nav-buttons"><Link to={"/stonks/new"}></Link>Add Stonks</button>
//                         <button className="nav-buttons"><Link to={`/users/portfolio/${userId}`}></Link>My Portfolio</button>
//                         <button className="nav-buttons"><Link to={"/stonks/home"}></Link>All Stonks</button>
//                         <button className="nav-buttons" onClick={logout}>Log Out</button>
//                     </div>
//                 </div>
//             </div>
//             <div class="body">
//                 {
//                     pirateList.map((pirate, index) => (
//                         <div class="content" key={index}>
//                             <div>
//                                 <img src={pirate.image} alt="pirate image" style={{ width: "150px", height: "150px" }}></img>
//                             </div>
//                             <div class="details">
//                                 <h2>{pirate.name}</h2>
//                                 <button class="maker-button"><Link to={`/user/profile/${pirate.createdBy?._id}`}>Added By: {pirate.createdBy?.username}</Link></button>
//                                 <button class="main-buttons"><Link to={`/pirates/${pirate._id}`}>View Pirate</Link></button>
//                                 <button class="plank-button" onClick={(e) => deletePirate(pirate._id)}>Walk the Plank</button>
//                             </div>
//                         </div>
//                     ))
//                 }
//             </div>
//         </div>
//     )
// }

// export default DisplayAll;
