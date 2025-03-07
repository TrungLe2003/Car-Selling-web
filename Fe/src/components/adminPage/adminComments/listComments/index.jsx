import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import axios from 'axios';
// Store
import { Store } from '../../../../Store';
// icons
import LeftArrowIcon from '../../../../icons/adminPage/LeftArrowIcon';
import RightArrowIcon from '../../../../icons/adminPage/RightArrowIcon';
//
import './style.css';

const div = 'div'
const activeDiv = 'activeDiv div'

const ListComments = () => {
    const navigate = useNavigate();
    const store = useContext(Store);
    let accessToken;
    if (store.currentUser) {
        accessToken = store.currentUser.accessToken
    };
    const pathname = useLocation().pathname;
    // màn hình hiển thị ở đầu trang khi mở trang lên, thiết lập thanh cuộn trên đầu trang
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    // queryCountComments
    const [totalComments, setTotalComments] = useState();
    const [approvedComments, setApprovedComments] = useState();
    const [spamComments, setSpamComments] = useState();
    const queryCountComments = async () => {
        try {
            const response = await axios.get('https://car-selling-web.onrender.com/api/v1/comments/countComments',
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                }
            );
            setTotalComments(response.data.totalComments);
            setApprovedComments(response.data.approvedComments);
            setSpamComments(response.data.spamComments);
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    useEffect(() => {
        queryCountComments();
    }, []);
    // queryListComments
    const {isStatus} = useParams();
    const [limit, setLimit] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [listComments, setListComments] = useState([]);
    const queryListComments = async () => {
        try {
            const response = await axios.get(`https://car-selling-web.onrender.com/api/v1/comments?limit=${limit}&currentPage=${currentPage}&isStatus=${isStatus}`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                }
            );
            setListComments(response.data.data);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    useEffect(() => {
        queryListComments();
    }, [currentPage, limit]);
    useEffect(() => {
        setCurrentPage(1);
        if (currentPage === 1) {
            queryListComments();
        }
    }, [isStatus]);
    // đổi tên trạng thái
    const getStatusName = (status) => {
        switch (status) {
          case 'approved':
            return 'Đã duyệt';
          case 'spam':
            return 'Bình luận rác';
          default:
            return 'Không xác định';
        }
    };
    // đổi trang
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
          setCurrentPage(newPage);
        }
    };
    // xóa bình luận
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`https://car-selling-web.onrender.com/api/v1/comments/deleteCommentById/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                }
            );
            queryCountComments();
            queryListComments();
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    // thay đổi trạng thái bình luận
    const handleChangeCommentStatus = async (id, newStatus) => {
        try {
            const response = await axios.put(`https://car-selling-web.onrender.com/api/v1/comments/changeCommentStatus`,
                {
                    commentId: id,
                    newStatus: newStatus
                },{
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                }
            );
            queryCountComments();
            queryListComments();
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    // chỉnh sửa bình luận
    const [a, setA] = useState(false)
    const [displayP, setDisplayP] = useState('');
    const [displayInput, setDisplayInput] = useState('');
    const [content, setContent] = useState('');
    const setDisplay = (p, input, content) => {
        setDisplayP(p);
        setDisplayInput(input);
        setContent(content);
    }
    // console.log(displayP);
    // console.log(displayInput);
    // console.log(content);
    const handleEdit = async (id) => {
        try {
            const response = await axios.put(`https://car-selling-web.onrender.com/api/v1/comments/edit-comment/${id}`,
                {
                    content: content
                }, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                }
            );
            setDisplayP('');
            setDisplayInput('');
            setContent('');
            queryListComments();
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    return (
        <div className="listComments">
            <h3>Bình luận</h3>
            <div className='commentsFilter'>
                <div className={pathname === '/admin/comments/all' ? activeDiv : div} onClick={() => navigate('/admin/comments/all')}>
                    <p>Tất cả</p>
                    <p>({totalComments ? totalComments : 0})</p>
                </div>
                |
                <div className={pathname === '/admin/comments/approved' ? activeDiv : div} onClick={() => navigate('/admin/comments/approved')}>
                    <p>Đã duyệt</p>
                    <p>({approvedComments ? approvedComments : 0})</p>
                </div>
                |
                <div className={pathname === '/admin/comments/spam' ? activeDiv : div} onClick={() => navigate('/admin/comments/spam')}>
                    <p>Bình luận rác</p>
                    <p>({spamComments ? spamComments : 0})</p>
                </div>
            </div>
            <div className='displayTable'>
                <div className='table'>
                    <div className='thead'>
                        <p className='theadAuthor'>Tác giả</p>
                        <p className='theadComment'>Bình luận</p>
                        <p className='theadNews'>Bình luận về</p>
                        <p className='theadTime'>Thời gian</p>
                        <p className='theadAction'>Hành động</p>
                    </div>
                    <div className='tbody'>
                        {listComments.map((comment, idx) => {
                            return <div key={idx + 1} className='tr' style={comment.isStatus === "spam" ? {backgroundColor:'#2271B120'} : {backgroundColor:'#FFFFFF'}}>
                                <div className='author'>
                                    <img src={comment.user.avatar} alt="" />
                                    <h5>{comment.user.username}</h5>
                                </div>
                                <div className='comment'>
                                    <p style={displayP === `p${idx}` ? {display:'none'} : {display:'block'}}>{comment.content}</p>
                                    <textarea style={displayInput === `input${idx}` ? {display:'block'} : {display:'none'}}  placeholder='Hãy viết bình luận'
                                    value={content} onChange={(e) => setContent(e.target.value)}/>
                                    <div style={displayInput === `input${idx}` ? {display:'flex'} : {display:'none'}} className='row' >
                                        <button onClick={() => handleEdit(comment._id)}>Cập nhật</button>
                                        <button onClick={() => setDisplay('', '', '')}>Hủy bỏ</button>
                                    </div>
                                </div>
                                <div className='news'>
                                    <h5 onClick={() => navigate(`/admin/news/editNews/${comment.news._id}`)}>{comment.news.title}</h5>
                                    <div className='row'>
                                        <p onClick={() => navigate(`/news/details/${comment.news._id}`)}>Xem tin tức</p>
                                        <p onClick={() => navigate(`/admin/comments/commentsByNews/all/${comment.news._id}`)}>Xem tất cả bình luận</p>
                                    </div>
                                </div>
                                <div className='time'>
                                    <p>{getStatusName(comment.isStatus)}</p>
                                    <p>{moment(comment.createdAt).format('HH:mm, DD/MM/YYYY')}</p>
                                </div>
                                <div className='action'>
                                    <button disabled={displayInput === `input${idx}`} onClick={() => setDisplay(`p${idx}`, `input${idx}`, comment.content)}>Chỉnh sửa</button>
                                    <button disabled={displayInput === `input${idx}`} onClick={() => handleDelete(comment._id)}>Xóa bỏ</button>
                                    {comment.isStatus === 'approved' ?
                                        <button disabled={displayInput === `input${idx}`} style={{color:'#B32D2E'}} onClick={() => handleChangeCommentStatus(comment._id, 'spam')}>Bình luận rác</button> :
                                        <button disabled={displayInput === `input${idx}`} style={{color:'#2271B1'}} onClick={() => handleChangeCommentStatus(comment._id, 'approved')}>Khôi phục</button>
                                    }
                                </div>
                            </div>
                        })}
                    </div>
                </div>
                <div className="pagination">
                    <select name="" id="" onChange={(e) => setLimit(e.target.value)}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        <LeftArrowIcon/>
                    </button>
                    <h5>Trang {currentPage}/{totalPages}</h5>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                        <RightArrowIcon/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ListComments
