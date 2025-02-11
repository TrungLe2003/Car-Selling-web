//
import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
//
import './style.css';

const component = "component";
const activeComponent = "component activeComponent";
const subComponent = "subComponent";
const activeSubComponent = "subComponent activeSubComponent";
const div = "div";
const activeDiv = "activeDiv";

const AdminPage = () => {
    // const navigate = useNavigate();
    // const [selectedComponent, setSelectedComponent] = useState('overview');
    // const [selectedSubComponent, setSelectedSubComponent] = useState('');
    // const handleClick1 = (component, subComponent) => {
    //     if (component === 'overview') {
    //         navigate('');
    //     } else {
    //         navigate(`${component}`);
    //     }
    //     setSelectedComponent(component);
    //     setSelectedSubComponent(subComponent);
    // };
    // const handleClick2 = (subComponent) => {
    //     navigate(`${subComponent}`);
    //     setSelectedSubComponent(subComponent);
    // };
    // return (
    //     <div className='adminPage'>
    //         <div className='left'>
    //             <h5 
    //                 onClick={() => handleClick1('overview')}
    //                 className={selectedComponent === "overview" ? activeComponent : component}
    //                 >Trang quản trị</h5>
    //             <h5 onClick={() => handleClick1('users')}
    //                 className={selectedComponent === "users" ? activeComponent : component}
    //                 >Thành viên</h5>
    //             <h5 onClick={() => handleClick1('cars')}
    //                 className={selectedComponent === "cars" ? activeComponent : component}
    //                 >Xe</h5>
    //             <h5 onClick={() => handleClick1('news/all', 'news/all')}
    //                 className={selectedComponent === "news/all" ? activeComponent : component}
    //                 >Bài viết</h5>
    //             <div className={selectedComponent === "news/all" ? activeDiv : div}>
    //                 <p 
    //                     onClick={() => handleClick2('news/all')}
    //                     className={selectedSubComponent === "news/all" ? activeSubComponent : subComponent}
    //                     >Tất cả bài viết</p>
    //                 <p
    //                     onClick={() => handleClick2('news/addNews')}
    //                     className={selectedSubComponent === "news/addNews" ? activeSubComponent : subComponent}
    //                     >Thêm bài viết</p>
    //             </div>
    //             <h5 onClick={() => handleClick1('comments')}
    //                 className={selectedComponent === "comments" ? activeComponent : component}
    //                 >Bình luận</h5>
    //         </div>
    //         <div className='right'>
    //             <Outlet/>
    //         </div>
    //     </div>
    // )

    const navigate = useNavigate();
    const pathname = useLocation().pathname;
    console.log(pathname);
    return (
        <div className='adminPage'>
            <div className='left'>
                <h5
                    onClick={() => navigate('')}
                    className={pathname === "/admin" ? activeComponent : component}
                    >Trang quản trị
                </h5>
                <h5
                    onClick={() => navigate('users')}
                    className={pathname === "/admin/users" ? activeComponent : component}
                    >Thành viên
                </h5>
                <h5
                    onClick={() => navigate('cars')}
                    className={pathname === "/admin/cars" ? activeComponent : component}
                    >Xe
                </h5>
                <h5
                    onClick={() => navigate('news/all')}
                    className={pathname === "/admin/news/all" || pathname === "/admin/news/published" || pathname === "/admin/news/draft" || pathname === "/admin/news/addNews" ? activeComponent : component}
                    >Bài viết
                </h5>
                <div className={pathname === "/admin/news/all" || pathname === "/admin/news/published" || pathname === "/admin/news/draft" || pathname === "/admin/news/addNews" ? activeDiv : div}>
                    <p 
                        onClick={() => navigate('news/all')}
                        className={pathname === "/admin/news/all" || pathname === "/admin/news/published" || pathname === "/admin/news/draft" ? activeSubComponent : subComponent}
                        >Tất cả bài viết
                    </p>
                    <p 
                        onClick={() => navigate('news/addNews')}
                        className={pathname === "/admin/news/addNews" ? activeSubComponent : subComponent}
                        >Thêm bài viết
                    </p>
                </div>
                <h5 
                    onClick={() => navigate('comments')}
                    className={pathname === "/admin/comments" ? activeComponent : component}
                    >Bình luận
                </h5>
            </div>
            <div className='right'>
                <Outlet/>
            </div>
        </div>
    )
}

export default AdminPage