import { Outlet } from "react-router-dom"
//
import "./style.css"

const AdminNews = () => {
    return (
        <div className="adminNews">
            <Outlet/>
        </div>
    )
}

export default AdminNews