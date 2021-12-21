import React from 'react';
import './App.css';
import { Router } from '@reach/router';
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
        <Login path="/" />
        <Register path="/register" />
        <DisplayAll path="/stonks/home" />
        <CreateStonk path="/stonks/new" />
        <DisplayOne path="/stonks/:id" />
        {/* <UserProfile path="/users/:id" />
        <PortfolioView path="/users/portfolio/:id" /> */}
        <UserView path="/users/portfolio/:userId"/>
        <UpdateUser path="/users/update/:id" />
      </Router>
    </div>
  );
}

export default App;
