import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
//
import BookIcon from '../../../Icons/newsPage/BookIcon';
import SearchIcon100px from '../../../Icons/newsPage/SearchIcon100px';
//
import './style.css';

const NewsCategory = () => {
    const navigate = useNavigate();
    const { isCategory } = useParams();
    console.log(isCategory);
    
    const [listNews, setListNews] = useState([]);
    const queryNewsByCategory = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/news/published?limit=4&isCategory=${isCategory}`);
            const data = response.data.data
            setListNews(data);
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    useEffect(() => {
        queryNewsByCategory();
    }, [isCategory]);
    return (
        <div className='newsByCategory'>
            {listNews.map((news) => {
                return <div className='news'>
                    <div className='leftNews' onClick={() => navigate(`/news/details/${news._id}`)}>
                        <img src={news.img} alt=""/>
                        <SearchIcon100px/>
                    </div>
                    <div className='rightNews'>
                        <h4>{news.title}</h4>
                        <div className='row'>
                            <h5>Tin xe</h5>
                            <p>• {moment(news.createdAt).format('HH:mm, DD/MM/YYYY')}</p>
                        </div>
                        <div className='content' dangerouslySetInnerHTML={{ __html: news.content }}></div>
                        <div className='groupReadMore' onClick={() => navigate(`/news/details/${news._id}`)}>
                            <div className='readMore'>
                                <BookIcon />
                                <h5>Read more</h5>
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </div>
    )
}

export default NewsCategory