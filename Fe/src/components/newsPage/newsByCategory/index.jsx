import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
// icon
import LeftArrowIcon from "../../../icons/newsPage/LeftArrowIcon";
import RightArrowIcon from "../../../icons/newsPage/RightArrowIcon";
import BookIcon from '../../../Icons/newsPage/BookIcon';
import SearchIcon100px from '../../../Icons/newsPage/SearchIcon100px';
//
import './style.css';

const NewsByCategory = () => {
    const navigate = useNavigate();
    const {isCategory} = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [listNews, setListNews] = useState([]);
    const queryNewsByCategory = async () => {
        try {
            const response = await axios.get(`https://car-selling-web.onrender.com/api/v1/news/publishedByCategory?limit=4&currentPage=${currentPage}&isCategory=${isCategory}`);
            const data = response.data.data
            setListNews(data);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    useEffect(() => {
        queryNewsByCategory();
    }, [currentPage]);
    useEffect(() => {
        setCurrentPage(1);
        if (currentPage === 1) {
            queryNewsByCategory();
        }
    }, [isCategory]);
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
          setCurrentPage(newPage);
        }
    };
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
    return (
        <div className='newsByCategory'>
            {listNews.map((news, idx) => {
                return <div key={idx + 1} className='news'>
                    <div className='leftNews' onClick={() => navigate(`/news/details/${news._id}`)}>
                        <img src={news.img} alt=""/>
                        <SearchIcon100px/>
                    </div>
                    <div className='rightNews'>
                        <h4>{news.title}</h4>
                        <div className='row'>
                            <h5>{getCategoryName(news.isCategory)}</h5>
                            <p>• {moment(news.createdAt).format('HH:mm, DD/MM/YYYY')}</p>
                        </div>
                        <h5 className='subTitle'>{news.subTitle}</h5>
                        <div className='groupReadMore' onClick={() => navigate(`/news/details/${news._id}`)}>
                            <div className='readMore'>
                                <BookIcon />
                                <h5>Read more</h5>
                            </div>
                        </div>
                    </div>
                </div>
            })}
            <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    <LeftArrowIcon/>
                </button>
                <h4>Trang {currentPage}/{totalPages}</h4>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    <RightArrowIcon/>
                </button>
            </div>
        </div>
    )
}

export default NewsByCategory
