import { useNavigate } from 'react-router-dom';
//
import { listCarNews } from '../../../data';
import BookIcon from '../../../Icons/newsPage/BookIcon';
import SearchIcon100px from '../../../Icons/newsPage/SearchIcon100px';

const NewsCarNews = () => {
    const navigate = useNavigate();
    return (
        <div className='newsCarNews list'>
            {listCarNews.map((news) => {
                return <div className='news'>
                    <div className='leftNews' onClick={() => navigate("/news/details")}>
                        <img src={news.img} alt=""/>
                        <SearchIcon100px/>
                    </div>
                    <div className='rightNews'>
                        <h4>{news.title}</h4>
                        <div className='row'>
                            <h5>Tin xe</h5>
                            <p>• 13:00, 13/01/2025</p>
                        </div>
                        <p className='content'>{news.content}</p>
                        <div className='groupReadMore' onClick={() => navigate("/news/details")}>
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

export default NewsCarNews