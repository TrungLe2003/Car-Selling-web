import { useNavigate } from 'react-router-dom';
//
import { listExploreCars } from '../../../data';
import BookIcon from '../../../Icons/newsPage/BookIcon';
import SearchIcon100px from '../../../Icons/newsPage/SearchIcon100px';

const NewsExploreCars = () => {
    const navigate = useNavigate();
    return (
        <div className='newsExploreCars list'>
            {listExploreCars.map((news) => {
                return <div className='news'>
                    <div className='leftNews' onClick={() => navigate("/news/details")}>
                        <img src={news.img} alt=""/>
                        <SearchIcon100px/>
                    </div>
                    <div className='rightNews'>
                        <h4>{news.title}</h4>
                        <div className='row'>
                            <h5>Khám phá xe</h5>
                            <p>• 13:00, 13/01/2025</p>
                        </div>
                        <p className='content'>{news.content}</p>
                        <div className='groupReadMore'>
                            <div className='readMore' onClick={() => navigate("/news/details")}>
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

export default NewsExploreCars