import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import axios from 'axios';
// Store
import { Store } from '../../../../Store';
// icons
import LeftArrowIcon from '../../../../icons/adminPage/LeftArrowIcon';
import RightArrowIcon from '../../../../icons/adminPage/RightArrowIcon';
//
import './style.css';

const div = 'div'
const activeDiv = 'activeDiv div'

const ListCars = () => {
    const navigate = useNavigate();
    const store = useContext(Store);
    let accessToken;
    if (store.currentUser) {
        accessToken = store.currentUser.accessToken
    };
    const pathname = useLocation().pathname;
    // màn hình hiển thị ở đầu trang khi mở trang lên, thiết lập thanh cuộn trên đầu trang
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    // queryCountCars
    const [totalCars, setTotalCars] = useState();
    const [approvedCars, setApprovedCars] = useState();
    const [pendingCars, setPendingCars] = useState();
    const queryCountCars = async () => {
        try {
            const response = await axios.get('https://car-selling-web.onrender.com/api/v1/cars/countCars',
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                }
            );
            setTotalCars(response.data.totalCars);
            setApprovedCars(response.data.approvedCars);
            setPendingCars(response.data.pendingCars);
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    useEffect(() => {
        queryCountCars();
    }, []);
    // queryListCars
    const {isStatus} = useParams();
    const [limit, setLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [listCars, setListCars] = useState([]);
    const queryListCars = async () => {
        try {
            const response = await axios.get(`https://car-selling-web.onrender.com/api/v1/cars/getAllCar?limit=${limit}&currentPage=${currentPage}&isStatus=${isStatus}`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                }
            );
            setListCars(response.data.data);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    useEffect(() => {
        queryListCars();
    }, [currentPage, limit]);
    useEffect(() => {
        setCurrentPage(1);
        if (currentPage === 1) {
            queryListCars();
        }
    }, [isStatus]);
    // đổi tên trạng thái
    const getStatusName = (status) => {
        switch (status) {
        case 'approved':
            return 'Đã duyệt';
        case 'pending':
            return 'Chưa duyệt';
        default:
            return 'Không xác định';
        }
    };
    // đổi trang
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
        }
    };
    // xóa xe
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`https://car-selling-web.onrender.com/api/v1/cars/deletecar/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                }
            );
            queryCountCars();
            queryListCars();
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    // duyệt đăng bán xe
    const handleApproveCar = async (id, newStatus) => {
        try {
            const response = await axios.put(`https://car-selling-web.onrender.com/api/v1/cars/changeStatusCar/${id}`,
                {
                    newStatus: newStatus,
                },{
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                }
            );
            queryCountCars();
            queryListCars();
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    // đổi tên tình trạng
    const getStateName = (state) => {
        switch (state) {
        case 'Cũ':
            return 'old';
        case 'Mới':
            return 'new';
        default:
            return 'Không xác định';
        }
    };
    return (
        <div className='listCars'>
            <h3>Xe</h3>
            <div className='carsFilter'>
                <div className={pathname === '/admin/cars/all' ? activeDiv : div} onClick={() => navigate('/admin/cars/all')}>
                    <p>Tất cả</p>
                    <p>({totalCars ? totalCars : 0})</p>
                </div>
                |
                <div className={pathname === '/admin/cars/approved' ? activeDiv : div} onClick={() => navigate('/admin/cars/approved')}>
                    <p>Đã duyệt</p>
                    <p>({approvedCars ? approvedCars : 0})</p>
                </div>
                |
                <div className={pathname === '/admin/cars/pending' ? activeDiv : div} onClick={() => navigate('/admin/cars/pending')}>
                    <p>Chưa duyệt</p>
                    <p>({pendingCars ? pendingCars : 0})</p>
                </div>
            </div>
            <div className='displayTable'>
                <div className='table'>
                    <div className='thead'>
                        <p className='theadName'>Tên xe</p>
                        <p className='theadBrand'>Tên hãng</p>
                        <p className='theadState'>Tình trạng</p>
                        <p className='theadProvider'>Nhà cung cấp</p>
                        <p className='theadTime'>Thời gian</p>
                        <p className='theadAction'>Hành động</p>
                    </div>
                    <div className='tbody'>
                        {listCars.map((car, idx) => {
                            return <div key={idx + 1} className='tr' style={car.isStatus === "pending" ? {backgroundColor:'#2271B120'} : {backgroundColor:'#FFFFFF'}}>
                                <p className='name'>{car.carName}</p>
                                <p className='brand' onClick={() => navigate(`/admin/cars/carsByBrand/all/${car.brand}`)}>{car.brand}</p>
                                <p className='state' onClick={() => navigate(`/admin/cars/carsByState/all/${getStateName(car.state)}`)}>{car.state}</p>    
                                <div className='provider'>
                                    {/* <img src={car.idProvider.avatar} alt="" /> */}
                                    <h5 onClick={() => navigate(`/admin/cars/carsByProvider/all/${car.idProvider._id}`)}>{car.idProvider.username}</h5>
                                </div>
                                <div className='time'>
                                    <p>{getStatusName(car.isStatus)}</p>
                                    <p>{moment(car.createdAt).format('HH:mm, DD/MM/YYYY')}</p>
                                </div>
                                <div className='action'>
                                    {car.isStatus === 'approved' ?
                                        <p onClick={() => navigate(`/car/${car._id}`)}>Xem</p> :
                                        <p onClick={() => navigate(`/car/${car._id}`)}>Xem trước</p>
                                    }
                                    <p onClick={() => navigate(`/admin/cars/editCarInfo/${car._id}`)}>Chỉnh sửa</p>
                                    <p onClick={() => handleDelete(car._id)}>Xóa bỏ</p>
                                    {car.isStatus === 'approved' ?
                                        <p onClick={() => handleApproveCar(car._id, 'pending')}>Bỏ duyệt</p> :
                                        <p onClick={() => handleApproveCar(car._id, 'approved')}>Duyệt</p>
                                    }
                                </div>
                            </div>
                        })}
                    </div>
                </div>
                <div className="pagination">
                    <select name="" id="" onChange={(e) => setLimit(e.target.value)}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        <LeftArrowIcon/>
                    </button>
                    <h5>Trang {currentPage}/{totalPages}</h5>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        <RightArrowIcon/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ListCars
