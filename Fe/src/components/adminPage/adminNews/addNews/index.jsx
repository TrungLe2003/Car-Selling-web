import { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
// Store
import { Store } from '../../../../Store';
// imgs
import AddImg from '/public/imgs/addImg.png'
//
import './style.css';

const AddNews = () => {
    // navigate
    const navigate = useNavigate();
    // store lấy accessToken crrUser
    const store = useContext(Store);
    const accessToken = store.currentUser.accessToken;
    // state cập nhật nội dung khi thay đổi (change)
    const [value, setValue] = useState('');
    const slice1 = value.split('</strong></p><p><br></p>');
    const slice2 = slice1[0].split('<strong>');
    const content = slice1[1];
    const subTitle = slice2[1];
    console.log(value);
    // console.log(content);
    // console.log(subTitle);
    const [formData, setFormData] = useState({
        title: '',
        isCategory: '',
        file: null
    });
    const [addImg, setAddImg] = useState(AddImg);
    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            file: e.target.files[0]
        });
        setAddImg(URL.createObjectURL(e.target.files[0]));
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    // react-quill
    const quillRef = useRef(null);
    const modules = {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, false] }],
          ['bold', 'italic', 'underline'],
          ['link', 'image', 'code-block'],
        ]
    };
    // submit
    const [isStatus, setIsStatus] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payloadFormData = new FormData();
        for (const key in formData) {
            payloadFormData.append(key, formData[key]);
        };
        {content ?
        payloadFormData.append('content', content) :
        payloadFormData.append('content', value)
        };
        {subTitle ?
        payloadFormData.append('subTitle', subTitle) :
        payloadFormData.append('subTitle', '')
        };
        payloadFormData.append('isStatus', isStatus);
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/news/create-news`, payloadFormData,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Content-type": "multipart/form-data",
                },
            });
            alert(response.data.message);
            navigate('/admin/news/all');
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    return (
        <div className='addNews'>
            <h3>Thêm bài viết</h3>
            <div className='formAddNews'>
                <div className='left'>
                    <div className='section1'>
                        <div className='grImg'>
                            <input type="file" id='file' onChange={handleFileChange}/>
                            <label htmlFor="file"><img src={addImg} alt="" /></label>
                        </div>
                        <div className='titleAndCategory'>
                            <div className='col'>
                                <label htmlFor="title">Tiêu đề</label>
                                <input type="text" id='title' placeholder='Thêm tiêu đề'
                                name='title' value={formData.title} onChange={handleChange} />
                            </div>
                            <div className='col'>
                                <label htmlFor="isCategory">Danh mục</label>
                                <select name="isCategory" id="isCategory" value={formData.isCategory} onChange={handleChange}>
                                    <option value="" disabled>---------- Chọn danh mục ----------</option>
                                    <option value="carNews" >Tin xe</option>
                                    <option value="marketNews" >Tin thị trường</option>
                                    <option value="explore" >Khám phá</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='section2'>
                        <ReactQuill
                            theme="snow"
                            value={value}
                            onChange={(newValue) => setValue(newValue)}
                            ref={quillRef}
                            modules={modules}
                        />
                    </div>
                </div>
                <div className='right'>
                    <h5>Xuất bản</h5>
                    <div className='grButton'>
                        <button type='submit' onMouseEnter={() => setIsStatus('published')} onClick={handleSubmit}>Xuất bản</button>
                        <button type='submit' onMouseEnter={() => setIsStatus('draft')} onClick={handleSubmit}>Lưu nháp</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNews