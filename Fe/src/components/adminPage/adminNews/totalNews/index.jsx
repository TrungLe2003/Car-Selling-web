import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import axios from 'axios';
// Store
import { Store } from '../../../../Store';
//
import './style.css';

const div = 'div'
const activeDiv = 'activeDiv div'

const TotalNews = () => {
    const naviagte = useNavigate();
    const store = useContext(Store);
    const pathname = useLocation().pathname;
    // const [totalNews, setTotalNews] = useState();
    // const [publishedNews, setPublishedNews] = useState();
    // const [draftNews, setDraftNews] = useState();
    const queryCountNews = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/v1/news/countNews');
            store.setTotalNews(response.data.totalNews);
            store.setPublishedNews(response.data.publishedNews);
            store.setDraftNews(response.data.draftNews);
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    useEffect(() => {
        queryCountNews();
    }, []);
    return (
        <div className='totalNews'>
            <h3>Bài viết</h3>
            <div className='newsFilter'>
                <div className={pathname === '/admin/news/all' ? activeDiv : div} onClick={() => naviagte('all')}>
                    <p>Tất cả</p>
                    <p>({store.totalNews ? store.totalNews : 0})</p>
                </div>
                |
                <div className={pathname === '/admin/news/published' ? activeDiv : div} onClick={() => naviagte('published')}>
                    <p>Đã xuất bản</p>
                    <p>({store.publishedNews ? store.publishedNews : 0})</p>
                </div>
                |
                <div className={pathname === '/admin/news/draft' ? activeDiv : div} onClick={() => naviagte('draft')}>
                    <p>Bản nháp</p>
                    <p>({store.draftNews ? store.draftNews : 0})</p>
                </div>
            </div>
            <Outlet/>
        </div>
    )
}

export default TotalNews