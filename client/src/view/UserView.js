import React, { useState, useEffect } from 'react';
import UserProfile from '../components/UserProfile';
import PortfolioView from '../components/PortfolioView';

const UserView = (props) => {
    const { id } = props;
    const [userId, setUserId] = useState("");
    const [userStonkList, setUserStonkList] = useState([]);

    return (
        <div>
            <UserProfile userId={userId} setUserId={setUserId} />
            <PortfolioView userId={userId} setUserId={setUserId} />
        </div>
    )
}

export default UserView;
