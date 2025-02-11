import { useNavigate, useParams,  } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import axios from 'axios';
//
import { Store } from '../../Store';
//
import Avatar from '/public/imgs/avatar.png'
import CommentIcon from '../../icons/newsDetailsPage/CommentIcon'
//
import './style.css';

const NewsDetailPage = () => {
    // navigate
    const navigate = useNavigate();
    // store lấy accessToken crrUser
    const store = useContext(Store);
    const accessToken = store.currentUser.accessToken;
    //
    const { id } = useParams();
    const [news, setNews] = useState({});
    const [listNews, setListNews] = useState([]);
    const [listComments, setListComments] = useState([]);
    const queryNews = async () => {
        try {
            const queryNews = await axios.get(`http://localhost:8080/api/v1/news/${id}`);
            const data = queryNews.data.data;
            if (data) {
                axios.all([
                    axios.get(`http://localhost:8080/api/v1/news/publishedByCategory?limit=6&isCategory=${data.isCategory}`),
                    axios.get(`http://localhost:8080/api/v1/comments/commentByNewsId?newsId=${id}`),
                ])
                .then(axios.spread((response1, response2) => {
                    setListNews(response1.data.data);
                    setListComments(response2.data.data);
                }))
            };
            setNews(data);
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    useEffect(() => {
        queryNews();
    }, [id]);
    const [content, setContent] = useState('');
    const handleSubmit = async (e) => {
        const formData = {
            content,
            newsId: id,
        }
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/comments/create-comment', formData,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Content-type": "application/json",
                },
            });
            queryNews();
            setContent('');
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    return (
        <div className='newsDetailsPage'>
            <div className='left'>
                <h2>{news.title}</h2>
                <div className='row'>
                    {news.author
                    ? <div className='author'>
                        <img src={news.author.avatar} alt="" />
                        <h5>{news.author.username}</h5>
                    </div>
                    : ''}
                    <p className='time'>{moment(news.createdAt).format('HH:mm, DD/MM/YYYY')}</p>
                </div>
                <h5>{news.subTitle}</h5>
                <div className='content' dangerouslySetInnerHTML={{ __html: news.content }}></div>
                <div className='grComment'>
                    <div className='oldComment'>
                        <div className='title'>
                            <CommentIcon/>
                            {listComments.length !== 0 ?
                            <h5>{listComments.length} Comments</h5> :
                            <h5>0 Comment</h5>
                            }
                        </div>
                        <div className='listOldComment'>
                            {listComments.map((comment) => {
                                return <div className='comment'>
                                    <img src={comment.user.avatar} alt="" />
                                    <div className='rightComment'>
                                        <div className="row">
                                            <h4>{comment.user.username}</h4>
                                            <p>{moment(comment.createdAt).format('HH:mm, DD/MM/YYYY')}</p>
                                        </div>
                                        <p>{comment.content}</p>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                    <div className='newComment'>
                        <h5>Comment</h5>
                        <textarea name="" id="" placeholder='Hãy viết bình luận' value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                        <div className='grButton'>
                            <button onClick={handleSubmit}>Gửi</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='right'>
                <h3>Cùng danh mục</h3>
                <div className='listSameCategory'>
                    {listNews.map((item) => {
                        return <div className='item' onClick={() => navigate(`/news/details/${item._id}`)}>
                            <div className='leftItem'>
                                <img src={item.img} alt="" />
                            </div>
                            <div className='rightItem'>
                                <div className='background'></div>
                                <div className='content'>
                                    <h5>{item.title}</h5>
                                    <p>{moment(item.createdAt).format('HH:mm, DD/MM/YYYY')}</p>
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