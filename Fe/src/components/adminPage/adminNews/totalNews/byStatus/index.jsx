import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import axios from 'axios';
// Store
import { Store } from '../../../../../Store';
//
import LeftArrowIcon from '../../../../../icons/adminPage/LeftArrowIcon'
import RightArrowIcon from '../../../../../icons/adminPage/RightArrowIcon'
//
import './style.css';

const TotalNewsByStatus = () => {
    // navigate
    const navigate = useNavigate();
    // store lấy accessToken crrUser
    const store = useContext(Store);
    const accessToken = store.currentUser.accessToken;
    const {isStatus} = useParams();
    const [limit, setLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [listNews, setListNews] = useState([]);
    const queryListNews = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/news?limit=${limit}&currentPage=${currentPage}&isStatus=${isStatus}`);
            setListNews(response.data.data);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    useEffect(() => {
        queryListNews();
    }, [currentPage, limit]);
    useEffect(() => {
        setCurrentPage(1)
        queryListNews();
    }, [isStatus]);
    const getCategoryName = (category) => {
        switch (category) {
          case 'carNews':
            return 'Tin xe';
          case 'marketNews':
            return 'Tin thị trường';
          case 'explore':
            return 'Khám phá';
          default:
            return 'Không xác định';
        }
    };
    const getStatusName = (status) => {
        switch (status) {
          case 'published':
            return 'Đã xuất bản';
          case 'draft':
            return 'Đã lưu nháp';
          default:
            return 'Không xác định';
        }
    };
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
          setCurrentPage(newPage);
        }
    };
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/v1/news/deleteNewsById/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            const queryCountNews = await axios.get('http://localhost:8080/api/v1/news/countNews');
            store.setTotalNews(queryCountNews.data.totalNews);
            store.setPublishedNews(queryCountNews.data.publishedNews);
            store.setDraftNews(queryCountNews.data.draftNews);
            queryListNews();
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    return (
        <div className='totalNewsTotal'>
            <div className='table'>
                <div className='thead'>
                    <p className='theadTitle'>Tiêu đề</p>
                    <p className='theadAuthor'>Tác giả</p>
                    <p className='theadCategory'>Danh mục</p>
                    <p className='theadTime'>Thời gian</p>
                    <p className='theadAction'>Hành động</p>
                </div>
                <div className='tbody'>
                    {listNews.map((news) => {
                        return <div className='tr'>
                            {news.title ?
                            <h5 className='title'>{news.title}</h5> :
                            <h5 className='title'>Không có tiêu đề</h5>
                            }
                            <p className='author'>{news.author.username}</p>
                            <p className='category'>{getCategoryName(news.isCategory)}</p>
                            <div className='time'>
                                <p>{getStatusName(news.isStatus)}</p>
                                <p>{moment(news.createdAt).format('HH:mm, DD/MM/YYYY')}</p>
                            </div>
                            <div className='action'>
                                {news.isStatus === 'published' ?
                                    <p onClick={() => navigate(`/news/details/${news._id}`)}>Xem</p> :
                                    <p onClick={() => navigate(`/news/details/${news._id}`)}>Xem trước</p>
                                }
                                <p onClick={() => navigate(`/admin/news/editNews/${news._id}`)}>Chỉnh sửa</p>
                                <p onClick={() => handleDelete(news._id)}>Xóa bỏ</p>
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
    )
}

export default TotalNewsByStatus