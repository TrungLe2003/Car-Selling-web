//
import { useState } from 'react';
//
import AdminOverview from "./adminOverview";
import AdminUsers from "./adminUsers";
import AdminCars from "./adminCars";
import AdminNews from "./adminNews";
import AdminComments from "./adminComments";
//
import './style.css';

const component = "component";
const activeComponent = "component activeComponent";

const AdminPage = () => {
    const [selectedComponent, setSelectedComponent] = useState('overview');
    const handleClick = (component) => {
        setSelectedComponent(component);
    };

    return (
        <div className='adminPage'>
            <div className='left'>
                <h5 
                    onClick={() => handleClick('overview')}
                    className={selectedComponent === "overview" ? activeComponent : component}
                    >Trang quản trị</h5>
                <h5 onClick={() => handleClick('users')}
                    className={selectedComponent === "users" ? activeComponent : component}
                    >Thành viên</h5>
                <h5 onClick={() => handleClick('cars')}
                    className={selectedComponent === "cars" ? activeComponent : component}
                    >Xe</h5>
                <h5 onClick={() => handleClick('news')}
                    className={selectedComponent === "news" ? activeComponent : component}
                    >Tin tức</h5>
                <h5 onClick={() => handleClick('comments')}
                    className={selectedComponent === "comments" ? activeComponent : component}
                    >Bình luận</h5>
            </div>
            <div className='right'>
                {selectedComponent === "overview" && <AdminOverview/>}
                {selectedComponent === "users" && <AdminUsers/>}
                {selectedComponent === "cars" && <AdminCars/>}
                {selectedComponent === "news" && <AdminNews/>}
                {selectedComponent === "comments" && <AdminComments/>}
            </div>
        </div>
    )
}

export default AdminPage