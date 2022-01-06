import React from 'react';
import UserProfile from '../components/UserProfile';
import PortfolioView from '../components/PortfolioView';

const UserView = (props) => {
    const { userId } = props;

    return (
        <div>
            <UserProfile userId={userId}/>
            {/* <PortfolioView userId={userId}/> */}
        </div>
    )
}

export default UserView;
