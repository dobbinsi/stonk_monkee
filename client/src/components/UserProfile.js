// import React from 'react'
// import axios from "axios";
// import { Link } from "@reach/router";

// const UserProfile = (props) => {
//     const [userPirateList, setUserPirateList] = useState([]);
//     const [oneUser, setOneUser] = useState({});
//     const { id } = props;

//     useEffect(() => {
//         axios.get(`http://localhost:8000/api/user/pirates/${id}`)
//             .then((res) => {
//                 console.log(res.data);
//                 setUserPirateList(res.data);
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     }, []);
//     useEffect(() => {
//         axios.get(`http://localhost:8000/api/users/${id}`)
//             .then((res) => {
//                 console.log(res.data);
//                 setOneUser(res.data);
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     }, []);

//     const deletePirate = (idFromBelow) => {
//         axios.delete(`http://localhost:8000/api/pirates/${idFromBelow}`)
//             .then((res) => {
//                 console.log(res.data);
//                 const newList = pirateList.filter((pirate, index) => pirate._id !== idFromBelow);
//                 setPirateList(newList);
//             })
//             .catch((err) => {
//                 console.log(err);
//             })
//     }

//     return (
//         <div>
//             <div>
//                 <div class="header">
//                     <h1>{oneUser.username}'s Crew</h1>
//                     <button class="main-buttons"><Link to={"/pirates/new"}>Add Pirate</Link></button>
//                     <button class="main-buttons"><Link to={"/pirates/home"}>Crew Board</Link></button>
//                 </div>
//                 <div class="body">
//                     {
//                         userPirateList.map((pirate, index) => (
//                             <div class="content" key={index}>
//                                 <div>
//                                     <img src={pirate.image} alt="pirate image" style={{ width: "150px", height: "150px" }}></img>
//                                 </div>
//                                 <div class="details">
//                                     <h2>{pirate.name}</h2>
//                                     <button class="main-buttons"><Link to={`/pirates/${pirate._id}`}>View Pirate</Link></button>
//                                     {/* <button class="plank-button" onClick={(e) => deletePirate(pirate._id)}>Walk the Plank</button> */}
//                                 </div>
//                             </div>
//                         ))
//                     }
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default UserProfile;

