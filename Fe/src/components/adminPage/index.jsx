//
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
//
import './style.css';

const component = "component";
const activeComponent = "component activeComponent";
const subComponent = "subComponent";
const activeSubComponent = "subComponent activeSubComponent";
const div = "div";
const activeDiv = "activeDiv";

const AdminPage = () => {
    const navigate = useNavigate();
    const [selectedComponent, setSelectedComponent] = useState('overview');
    const [selectedSubComponent, setSelectedSubComponent] = useState('');
    const handleClick1 = (component, subComponent) => {
        if (component === 'overview') {
            navigate('');
        } else {
            navigate(`${component}`);
        }
        setSelectedComponent(component);
        setSelectedSubComponent(subComponent);
    };
    const handleClick2 = (subComponent) => {
        navigate(`${subComponent}`);
        setSelectedSubComponent(subComponent);
    };
    return (
        <div className='adminPage'>
            <div className='left'>
                <h5 
                    onClick={() => handleClick1('overview')}
                    className={selectedComponent === "overview" ? activeComponent : component}
                    >Trang quản trị</h5>
                <h5 onClick={() => handleClick1('users')}
                    className={selectedComponent === "users" ? activeComponent : component}
                    >Thành viên</h5>
                <h5 onClick={() => handleClick1('cars')}
                    className={selectedComponent === "cars" ? activeComponent : component}
                    >Xe</h5>
                <h5 onClick={() => handleClick1('news', 'news')}
                    className={selectedComponent === "news" ? activeComponent : component}
                    >Bài viết</h5>
                <div className={selectedComponent === "news" ? activeDiv : div}>
                    <p 
                        onClick={() => handleClick2('news')}
                        className={selectedSubComponent === "news" ? activeSubComponent : subComponent}
                        >Tất cả bài viết</p>
                    <p
                        onClick={() => handleClick2('news/addNews')}
                        className={selectedSubComponent === "news/addNews" ? activeSubComponent : subComponent}
                        >Thêm bài viết</p>
                </div>
                <h5 onClick={() => handleClick1('comments')}
                    className={selectedComponent === "comments" ? activeComponent : component}
                    >Bình luận</h5>
            </div>
            <div className='right'>
                <Outlet/>
            </div>
        </div>
    )
}

export default AdminPage