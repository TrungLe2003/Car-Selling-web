import { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
//
import { Store } from '../../../../Store';

// imgs
import AddImg from '/public/imgs/addImg.png'
//
import './style.css';

const AddNews = () => {
    const store = useContext(Store);
    const accessToken = store.currentUser.accessToken;
    const quillRef = useRef(null);
    const [value, setValue] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        // content: '',
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
    const modules = {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, false] }],
          ['bold', 'italic', 'underline'],
          ['link', 'image', 'code-block'],
        ]
    };
    console.log(value, formData);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payloadFormData = new FormData();
        for (const key in formData) {
            payloadFormData.append(key, formData[key]);
        };
        payloadFormData.append('content', value);
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/news/create-news`, payloadFormData,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Content-type": "multipart/form-data",
                },
            });
            alert(response.data.message);
            // {
            //     const response1 = await axios.get('http://localhost:8080/api/v1/cars')
            //     const data = response1.data.data.filter((item) => item.isActive)
            //     store.setAllCar(data);
            // }
        } catch (error) {
            alert(error.response.data.message);
        }
    };
    return (
        <div className='addNews'>
            <h3>Thêm bài viết</h3>
            <div className='form'>
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
                                    <option value="Tin xe" >Tin xe</option>
                                    <option value="Tin thị trường" >Tin thị trường</option>
                                    <option value="Khám phá xe" >Khám phá xe</option>
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
                        <button type='submit' onClick={handleSubmit}>Xuất bản</button>
                        <button>Lưu nháp</button>
                        <button>Bỏ vào thùng rác</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNews