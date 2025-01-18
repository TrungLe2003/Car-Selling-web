import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
//
import { listCarNews, listMarketNews, listExploreCars } from '../../../data';
//
import './style.css';

const NewsOverview = () => {
    const [allNews, setAllNews] = useState([]);
    const queryAllNews = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/news');
            const data = response.data.data.filter((item) => item.isStatus === "Đã xuất bản");
            setAllNews(data);
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    useEffect(() => {
        queryAllNews();
    }, []);
    const navigate = useNavigate();
    return (
        <div className='newsOverview'>
            <div className='grListNews'>
                <h2>Tin xe</h2>
                <div className='listNews'>
                    {listCarNews.map((news) => {
                        return <div className='news' onClick={() => navigate("/news/details")}>
                            <img src={news.img} alt="" />
                            <h4>{news.title}</h4>
                        </div>
                    })}
                </div>
            </div>
            <div className='grListNews'>
                <h2>Tin thị trường</h2>
                <div className='listNews'>
                    {listMarketNews.map((news) => {
                        return <div className='news' onClick={() => navigate("/news/details")}>
                            <img src={news.img} alt="" />
                            <h4>{news.title}</h4>
                        </div>
                    })}
                </div>
            </div>
            <div className='grListNews'>
                <h2>Khám phá xe</h2>
                <div className='listNews'>
                    {listExploreCars.map((news) => {
                        return <div className='news' onClick={() => navigate("/news/details")}>
                            <img src={news.img} alt="" />
                            <h4>{news.title}</h4>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default NewsOverview