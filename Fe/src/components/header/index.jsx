//library
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// store
import { Store } from '../../Store';
// imgs
import LogoWhite from '/public/imgs/logoWhite.png';
import LogoBlack from '/public/imgs/logoBlack.png';
// svgs
import ProfileIcon from '../../icons/header/ProfileIcon'
import LogoutIcon from '../../icons/header/LogoutIcon'
//
import './style.css';

const Header = () => {
    const navigate = useNavigate();
    const store = useContext(Store);
    const handleClick = () => {
        store.setCurrentUser(null)
        navigate('/');
    };
    return (
        <div className='header'>
            <div className='gr1'>
                <img src={LogoWhite} alt="" onClick={() => navigate('/')} className='logoWhite'/>
                <img src={LogoBlack} alt="" onClick={() => navigate('/')} className='logoBlack'/>
            </div>
            <div className='gr2'>
                <h5 onClick={() => navigate('/category')}>Sản phẩm</h5>
                <h5 onClick={() => navigate('/news')}>Tin tức</h5>
                <h5 onClick={() => navigate('/contact')}>Liên hệ</h5>
                <h5 onClick={() => navigate('/introduce')}>Giới thiệu</h5>
            </div>
            {!store.currentUser
            ? <div className='gr3_1'>
                <h5 onClick={() => navigate('/login')}>Login</h5>
                <div style={{width:'1px', height:'15px', margin:'0 10px'}} className='partition'></div>
                <h5 onClick={() => navigate('/register')}>Register</h5>
            </div>
            : <div className='gr3_2'>
                <div className='grDropdown'>
                    <div className='info'>
                        <div className='other'>
                            <h5>{store.currentUser.username}</h5>
                            <i>{store.currentUser.role}</i>
                        </div>
                        <img src={store.currentUser.avatar} alt="" />
                    </div>
                    <div className='dropdown'>
                        <div className='grProfile' onClick={() => navigate('/profile')}>
                            <p className='profileIcon'><ProfileIcon /></p>
                            <p className='profile'>Profile</p>
                        </div>
                        <div className='grLogout' onClick={handleClick}>
                            <p className='logoutIcon'><LogoutIcon /></p>
                            <p className='logout'>Logout</p>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Header