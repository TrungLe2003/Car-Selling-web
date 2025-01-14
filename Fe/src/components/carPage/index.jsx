//Icon
import NextBtnIcon from "../../icons/carDetailPage/nextBtnIcon";
import PreviousBtnIcon from "../../icons/carDetailPage/previousBtnIcon";
import EmailIcon from "../../icons/carDetailPage/emailIcon";
import PhoneIcon from "../../icons/carDetailPage/phoneIcon";
import ShareIcon from "../../icons/carDetailPage/shareIcon";
import HeartIcon from "../../icons/carDetailPage/Heart";
import LikedIcon from "../../icons/carDetailPage/Liked";
//react
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//css
import "./style.css";

//Chưa thêm phần vote sao cho xe
const CarDetailPage = () => {
  const [crrImg, setCrrImg] = useState(0); //hình ảnh to (ảnh hiện tại)
  const [btnLikeProduct, setBtnLikeProduct] = useState(false);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [comment, setComment] = useState(null);
  //dữ liệu xe
  const { idCar } = useParams();
  const [carData, setCarData] = useState(null);
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const carResponse = await axios.get(
          `http://localhost:8080/api/v1/cars/car/${idCar}`
        );
        setCarData(carResponse.data.data);
        console.log(carData);
      } catch (error) {
        console.error("Error fetching car data:", error.message);
      }
    };
    fetchCarData();
  }, [idCar]);

  const listImgRv = carData?.carImg;

  //hàm chuyển ảnh
  const nextRVImg = () => {
    setCrrImg((prev) => (prev - 1 + listImgRv.length) % listImgRv.length);
  };

  const previousRVImg = () => {
    setCrrImg((prev) => (prev + 1) % listImgRv.length);
  };
  // hàm thích sản phẩm (chưa kết hợp api để lưu - mới là ảnh động)
  const handleLikeProduct = () => {
    if (!btnLikeProduct) {
      setBtnLikeProduct(true);
    } else {
      setBtnLikeProduct(false);
    }
  };

  if (!carData) {
    return <div>...Loading</div>;
  }

  return (
    <div className="CarDetailPage">
      <div className="frame0">
        <h1 className="nameCar">
          {carData.carName} <span>({carData.state})</span>
        </h1>
        <div className="brand">- {carData.brand} -</div>
      </div>
      <div className="imgReviewCar Frame1">
        <div className="mainImgRV">
          <img src={listImgRv[crrImg]} alt="Car Detail" />
          <div className="changeImgFrame">
            <button className="nextImgRv" onClick={nextRVImg}>
              <NextBtnIcon />
            </button>
            <button className="previousImgRv" onClick={previousRVImg}>
              <PreviousBtnIcon />
            </button>
          </div>
        </div>
        <div className="listImgRV">
          {listImgRv.map((img, index) => (
            <div
              key={index}
              className={`item ${crrImg === index ? "active" : ""}`}
              onClick={() => setCrrImg(index)}
            >
              <img src={img} alt={`Car Detail ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      <div className="Frame2 allCarInformation">
        <div className="frameLeft">
          <div className="section1 loveAndShareFrame">
            <div className="likeFrame item" onClick={handleLikeProduct}>
              {!btnLikeProduct ? <HeartIcon /> : <LikedIcon></LikedIcon>}

              <div className="text">Yêu thích</div>
            </div>
            <div className="line"></div>
            <div className="shareFrame item">
              <ShareIcon></ShareIcon>
              <div className="text">Chia sẻ</div>
            </div>
          </div>
          <div className="section2 section">
            <h2>Miêu tả</h2>
            <div className="text">{carData.describe}</div>
          </div>
          <div className="section3 section">
            <h2>Thông tin người bán</h2>
            <div className="DealerInfo">
              <div className="item dealerNameAndAva">
                <div className="ava">
                  <img src={carData.idProvider.avatar} alt="" />
                </div>
                <div className="name">
                  <div className="text">{carData.idProvider.username}</div>
                  <div className="role">Người bán</div>
                </div>
              </div>
              <div className="line"></div>

              <div className="item dealerPhoneNumber">
                <div className="icon">
                  <PhoneIcon></PhoneIcon>
                </div>
                <div className="phoneNumber">
                  {carData.idProvider.phoneNumber}
                </div>
              </div>
              <div className="line"></div>

              <div className="item dealerEmail">
                <div className="icon">
                  <EmailIcon></EmailIcon>
                </div>
                <div className="email">{carData.idProvider.email}</div>
              </div>
            </div>
          </div>
          <div className="section4 section">
            <h2>Để lại thông tin liên hệ</h2>
            <form action="" className="contactForm">
              <div className="userNameAndEmail">
                <div className="userName item">
                  <h3>Tên</h3>
                  <input
                    type="text"
                    placeholder="Tên"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="userEmail item">
                  <h3>Email</h3>
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="item">
                <h3>Số điện thoại</h3>
                <input
                  type="number"
                  placeholder="Số điện thoại"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="item comment">
                <h3>Bình luận</h3>
                <input
                  type="text"
                  placeholder="Để loại bình luận"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <button>Liên hệ</button>
            </form>
          </div>
        </div>
        <div>
          <div className="frameRight">
            <h3>Thông tin về xe</h3>
            <p>
              Giá: <span>{carData.carPrice.toLocaleString()} vnđ</span>
            </p>
            <div className="line"></div>
            <div className="section section1">
              <h4>Tổng quan</h4>
              <div className="content">
                <div className="row">
                  <div className="title">Phiên bản</div>
                  <div className="text">{carData.version}</div>
                </div>
                <div className="row">
                  <div className="title">Màu</div>
                  <div className="text">Cập nhật</div>
                </div>
                <div className="row">
                  <div className="title">Số ghế</div>
                  <div className="text">Cập nhật</div>
                </div>
                <div className="row">
                  <div className="title">ODO</div>
                  <div className="text">{carData.ODO.toLocaleString()}km</div>
                </div>
                <div className="row">
                  <div className="title">Năm sản xuất</div>
                  <div className="text">{carData.year}</div>
                </div>
                <div className="row">
                  <div className="title">Xuất xứ</div>
                  <div className="text">{carData.origin}</div>
                </div>
              </div>
            </div>
            <div className="line"></div>

            <div className="section section2">
              <h4>Thông số chi tiết</h4>
              <div className="content">
                <div className="row">
                  <div className="title">Hộp số</div>
                  <div className="text">{carData.gearBox}</div>
                </div>
                <div className="row">
                  <div className="title">Hệ dẫn động</div>
                  <div className="text">{carData.driveSystem}</div>
                </div>
                <div className="row">
                  <div className="title">Momen xoắn</div>
                  <div className="text">{carData.torque}</div>
                </div>
                <div className="row">
                  <div className="title">Động cơ</div>
                  <div className="text">{carData.engine}</div>
                </div>
                <div className="row">
                  <div className="title">Mã lực</div>
                  <div className="text">{carData.horsePower}</div>
                </div>
                <div className="row">
                  <div className="title">Năng lượng</div>
                  <div className="text">{carData.power}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
