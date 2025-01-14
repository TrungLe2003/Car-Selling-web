import { listNews } from '../../../data';
//
import './style.css';

const NewsOverview = () => {
    return (
        <div className='newsOverview'>
            <div className='grListNews'>
                <h2>Tin xe</h2>
                <div className='listNews'>
                    {listNews.map((news) => {
                        return <div className='news'>
                            <img src={news.img} alt="" />
                            <h4>{news.title}</h4>
                        </div>
                    })}
                </div>
            </div>
            <div className='grListNews'>
                <h2>Tin thị trường</h2>
                <div className='listNews'>
                    {listNews.map((news) => {
                        return <div className='news'>
                            <img src={news.img} alt="" />
                            <h4>{news.title}</h4>
                        </div>
                    })}
                </div>
            </div>
            <div className='grListNews'>
                <h2>Khám phá xe</h2>
                <div className='listNews'>
                    {listNews.map((news) => {
                        return <div className='news'>
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