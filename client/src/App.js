import React from 'react';
import './App.css';
// import { Router } from '@reach/router';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DisplayAll from './components/DisplayAll';
import Login from './components/Login';
import Register from './components/Register';
import CreateStonk from './components/CreateStonk';
import PortfolioView from './components/PortfolioView';
import DisplayOne from './components/DisplayOne';
import UserProfile from './components/UserProfile';
import UpdateUser from './components/UpdateUser';
import { Line } from "react-chartjs-2";
import UserView from './view/UserView';

function App() {
  return (
    <div className='wrapper'>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/stonks/home" element={<DisplayAll />}></Route>
          <Route exact path="/stonks/new" element={<CreateStonk />}></Route>
          <Route exact path="/stonks/:id" element={<DisplayOne />}></Route>
          <Route exact path="/users/portfolio/:userId" element={<UserView />}></Route>
          <Route exact path="/users/update/:id" element={<UpdateUser />}></Route>
        </Routes>
      </Router>


      {/* <Login path="/" />
      <Register path="/register" />
      <DisplayAll path="/stonks/home" />
      <CreateStonk path="/stonks/new" />
      <DisplayOne path="/stonks/:id" />
      <UserProfile path="/users/:id" />
      <PortfolioView path="/users/portfolio/:id" />
      <UserView path="/users/portfolio/:userId" />
      <UpdateUser path="/users/update/:id" /> */}
    </div>
  );
}

export default App;
