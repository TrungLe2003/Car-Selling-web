import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
//
import { listCarNews } from '../../data';
import Avatar from '/public/imgs/avatar.png'
import CommentIcon from '../../icons/newsDetailsPage/CommentIcon'
//
import './style.css';

const NewsDetailPage = () => {
    const [news, setNews] = useState([]);
    const queryNews = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/news/678b69e94a1a331d6056749d');
            const data = response.data.data;
            setNews(data);
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    useEffect(() => {
        queryNews();
    }, []);
    return (
        <div className='newsDetailsPage'>
            <div className='left'>
                <h2>{news.title}</h2>
                <div className='row'>
                    <div className='author'>
                        <img src={news.avatarAuthor} alt="" />
                        <h5>{news.usernameAuthor}</h5>
                    </div>
                    <p className='time'>{moment(news.createdAt).format('HH:mm, DD/MM/YYYY')}</p>
                </div>
                <div className='content' dangerouslySetInnerHTML={{ __html: news.content }}></div>
                <div className='grComment'>
                    <div className='oldComment'>
                        <div className='title'>
                            <CommentIcon/>
                            <h5>3 Comments</h5>
                        </div>
                        <div className='listOldComment'>
                            <div className='comment'>
                                <img src={Avatar} alt="" />
                                <div className='rightComment'>
                                    <div className="row">
                                        <h4>PhuongNguyen</h4>
                                        <p>13:00, 13/01/2025</p>
                                    </div>
                                    <p>comment comment comment comment comment comment comment comment comment comment comment comment comment comment</p>
                                </div>
                            </div>
                            <div className='comment'>
                                <img src={Avatar} alt="" />
                                <div className='rightComment'>
                                    <div className="row">
                                        <h4>PhuongNguyen</h4>
                                        <p>13:00, 13/01/2025</p>
                                    </div>
                                    <p>comment comment comment comment comment comment comment comment comment comment comment comment comment comment</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='newComment'>
                        <h5>Comment</h5>
                        <textarea name="" id="" placeholder='Hãy viết bình luận'></textarea>
                        <div className='grButton'>
                            <button>Gửi</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='right'>
                <h3>Cùng danh mục</h3>
                <div className='listSameCategory'>
                    {listCarNews.map((item) => {
                        return <div className='item'>
                            <div className='leftItem'>
                                <img src={item.img} alt="" />
                            </div>
                            <div className='rightItem'>
                                <div className='background'></div>
                                <div className='content'>
                                    <h5>{item.title}</h5>
                                    <p>13:00, 13/01/2025</p>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default NewsDetailPage