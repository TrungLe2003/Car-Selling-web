import { listNews } from '../../../data';
import BookIcon from '../../../Icons/newsPage/BookIcon';
import SearchIcon100px from '../../../Icons/newsPage/SearchIcon100px';

const NewsMarketNews = () => {
    return (
        <div className='newsMarketNews list'>
            {listNews.map((news) => {
                return <div className='news'>
                    <div className='leftNews'>
                        <img src={news.img} alt=""/>
                        <SearchIcon100px/>
                    </div>
                    <div className='rightNews'>
                        <h4>{news.title}</h4>
                        <div className='row'>
                            <h5>Tin xe</h5>
                            <p>- 13:00, 13/01/2025</p>
                        </div>
                        <p className='content'>{news.content}</p>
                        <div className='groupReadMore'>
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

export default NewsMarketNews