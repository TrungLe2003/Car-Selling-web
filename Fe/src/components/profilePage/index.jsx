//
import { React } from 'react';
import './style.css';
import slider from "../../../public/imgs/background.png"
import { useParams } from 'react-router-dom';
import UserSidebar from './userprofile/UserSidebar.jsx';
import AccounSetting from './userprofile/AccountSetting.jsx';
import Account from './userprofile/Account.jsx';
import PostingCar from '../postingCarInfoPage/index.jsx'
import { Button } from 'antd';

const ProfilePage = () => {

    const { activepage } = useParams()

    // alert(activepage)
    return (

        <div className='profile'>
            <div className='heading'>
                <img className='bannerimg' src={slider} alt="" />
                <div className='bannerheading'>
                    <h1>My profile</h1>
                </div>
            </div>
            {/* UserProfile , showing {activepage}  */}
            <div className="profilein">
                <div className="left">
                    <UserSidebar activepage={activepage} />
                </div>
                <div className="right">
                    {activepage === 'account' && <Account />}
                    {activepage === 'accountsetting' && <AccounSetting />}
                </div>
            </div>
        </div>
    )
}

export default ProfilePage