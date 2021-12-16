import React, { useState, useEffect } from 'react';
import UserProfile from '../components/UserProfile';
import PortfolioView from '../components/PortfolioView';

const UserView = (props) => {
    const { userId } = props;
    // const [userStonkList, setUserStonkList] = useState([]);

    return (
        <div>
            <UserProfile userId={userId}/>
            {/* <PortfolioView userId={userId}/> */}
        </div>
    )
}

export default UserView;
