import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import axios from 'axios';
// Store
import { Store } from '../../../../Store';
//
import './style.css';

const ViewUserInfo = () => {
    const navigate = useNavigate();
    const store = useContext(Store);
    let accessToken;
    if (store.currentUser) {
        accessToken = store.currentUser.accessToken
    };
    // màn hình hiển thị ở đầu trang khi mở trang lên, thiết lập thanh cuộn trên đầu trang
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    // queryUserInfo
    const {id} = useParams();
    const [info, setInfo] = useState({});
    const queryUserInfo = async () => {
        try {
            const response = await axios.get(`https://car-selling-web.onrender.com/api/v1/users/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                }
            );
            setInfo(response.data.data);
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    useEffect(() => {
        queryUserInfo();
    }, []);
    return (
        <div className='ViewEdit'>
            <h3>Hồ sơ</h3>
            <div className='grAvatar'>
                <h4>Ảnh đại diện</h4>
                <div className='avatar'>
                    <h5>Avatar</h5>
                    <img src={info.avatar} alt="" />
                </div>
            </div>
            <div className='baseInfo'>
                <h4>Thông tin cơ bản</h4>
                <div className='grUsername'>
                    <label htmlFor="username">Username</label>
                    <input type="text" id='username' value={info.username} disabled/>
                </div>
                <div className='grEmail'>
                    <label htmlFor="email">Email</label>
                    <input type="text" id='email' value={info.email} disabled/>
                </div>
            </div>
            <div className='grOtherInfo'>
                <h4>Thông tin khác</h4>
                <div className='grFullname'>
                    <label htmlFor="fullname">Họ tên</label>
                    {info.fullname ?
                    <input type="text" id='fullname' value={info.fullname} disabled/> :
                    <input type="text" id='fullname' value={'Chưa có thông tin'} disabled/>
                    }
                </div>
                <div className='grPhoneNumber'>
                    <label htmlFor="phoneNumber">Số điện thoại</label>
                    {info.phoneNumber ?
                    <input type="text" id='phoneNumber' value={info.phoneNumber} disabled/> :
                    <input type="text" id='phoneNumber' value={'Chưa có thông tin'} disabled/>
                    }
                </div>
                <div className='grAddress'>
                    <label htmlFor="address">Địa chỉ</label>
                    {info.address ?
                    <input type="text" id='address' value={info.address} disabled/> :
                    <input type="text" id='address' value={'Chưa có thông tin'} disabled/>
                    }
                </div>
                <div className='grDateOfBirth'>
                    <label htmlFor="dateOfBirth">Ngày sinh</label>
                    {info.dateOfBirth ?
                    <input type="date" id='dateOfBirth' value={moment(info.dateOfBirth).format('YYYY-MM-DD')} disabled/> :
                    <input type="text" id='dateOfBirth' value={'Chưa có thông tin'} disabled/>
                    }
                </div>
            </div>
            <div className='grButton'>
                <button onClick={() => navigate(`/admin/users/editUserInfo/${info._id}`)}>Chỉnh sửa</button>
                <button onClick={() => window.history.back()}>Quay lại</button>
            </div>
        </div>
    )
}

export default ViewUserInfo
