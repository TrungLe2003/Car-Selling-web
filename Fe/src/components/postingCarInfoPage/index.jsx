//svgs
import FolderIcon from "../../icons/carDetailPage/FolderIcon";
import LogoutIcon from "../../icons/header/LogoutIcon";
// librarys
import { useState } from "react";
import axios from "axios";
import { message } from "antd"; //Thông báo
import { useNavigate } from "react-router-dom";

//
import "./style.css";

const listBrand = [
  "Honda",
  "Mitsubishi",
  "Vinfast",
  "Toyota",
  "Nissan",
  "Volvo",
  "Mazda",
  "Ford",
  "Subaru",
];

const listYear = [
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
];

const listColor = ["Đỏ", "Đen", "Trắng", "Ghi", "Xanh lá", "Xanh dương", "Nâu"];

const PostingCarInfoPage = () => {
  const nav = useNavigate();
  const [fileCount, setFileCount] = useState(0); //đếm số lượng ảnh
  const [carName, setCarName] = useState(null);
  const [carPrice, setCarPrice] = useState(null);
  const [brand, setBrand] = useState(listBrand[0]);
  const [color, setColor] = useState(listColor[0]);
  const [images, setImages] = useState([]);
  const [sitChairs, setSitChairs] = useState("");
  const [state, setState] = useState("Mới");
  const [ODO, setODO] = useState("");
  const [origin, setOrigin] = useState("");
  const [year, setYear] = useState(listYear[0]);
  const [version, setVersion] = useState("");
  const [gearBox, setGearBox] = useState("Số tự động"); //hộp số
  const [driveSystem, setDriveSystem] = useState(""); //dẫn động
  const [torque, setTorque] = useState(""); //momen
  const [engine, setEngine] = useState(""); //động cơ
  const [horsePower, setHorsePower] = useState(""); //mã lực
  const [power, setPower] = useState("Xăng"); // năng lượng
  const [describe, setDescribe] = useState("");
  //Lấy token
  const crrUser = localStorage.getItem("currentUser");
  const userObj = JSON.parse(crrUser); // Chuyển chuỗi JSON thành object
  const accessToken = userObj.accessToken;
  const idUser = userObj._id;
  //Hàm thay đổi file ảnh
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      message.warning("Chỉ được chọn tối đa 5 hình ảnh!");
      return;
    }
    setImages(files);
    setFileCount(event.target.files.length);
  };
  //Hàm đăng tải
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Kiểm tra gửi thông báo này
    if (!carName) {
      message.error("Vui lòng nhập tên xe!");
      return;
    }
    if (!carPrice || isNaN(carPrice) || carPrice <= 1000) {
      message.error("Vui lòng nhập giá xe hợp lệ!");
      return;
    }
    if (images.length === 0) {
      message.error("Vui lòng chọn ít nhất một hình ảnh!");
      return;
    }
    if (images.length > 5) {
      message.error("Chỉ được tải lên tối đa 5 hình ảnh!");
      return;
    }

    //form dữ liệu để gửi ttin xe
    const formData = new FormData();
    formData.append("carName", carName);
    formData.append("carPrice", carPrice);
    formData.append("brand", brand);
    formData.append("color", color);
    formData.append("sitChairs", sitChairs);
    formData.append("state", state);
    formData.append("ODO", ODO);
    formData.append("origin", origin);
    formData.append("year", year);
    formData.append("version", version);
    formData.append("gearBox", gearBox);
    formData.append("driveSystem", driveSystem);
    formData.append("torque", torque);
    formData.append("engine", engine);
    formData.append("horsePower", horsePower);
    formData.append("power", power);
    formData.append("describe", describe);

    //thêm từng file ảnh
    images.forEach((image) => {
      formData.append("carImg", image);
    });

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/cars/create-car",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      message.success("Đăng bán xe thành công!");
      console.log(response.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(Lỗi);
    }
  };
  return (
    <div className="PostingCarInfoPage">
      <div
        className="returnProviderManagePage"
        onClick={() => nav(`/provider/${idUser}/postmanage`)}
      >
        {" "}
        <LogoutIcon></LogoutIcon> Quay lại trang quản lý{" "}
      </div>
      <div className="title">
        <h1>ĐĂNG THÔNG TIN BÁN XE</h1>
      </div>
      <form action="" className="postingForm" onSubmit={handleSubmit}>
        <div className="content1">
          <div className="left">
            <div className="gr">
              <label htmlFor="carName">
                Tên xe <sup>*</sup>
              </label>
              <input
                type="text"
                id="carName"
                value={carName}
                onChange={(e) => setCarName(e.target.value)}
                required
                placeholder="Tên xe đăng bán"
              />
            </div>
            <div className="gr">
              <label htmlFor="Price">
                Giá xe <sup>*</sup>
              </label>
              <input
                type="number"
                id="Price"
                value={carPrice}
                onChange={(e) => setCarPrice(e.target.value)}
                placeholder="100000000 (100.000.000vnđ)"
              />
            </div>
            <div className="gr">
              <label htmlFor="brand">
                Chọn thương hiệu <sup>*</sup>
              </label>
              <select
                name=""
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              >
                {listBrand.map((brand, index) => (
                  <option key={index} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="right">
            <div className="gr">
              <label>
                Hình ảnh <sup>*</sup>
              </label>
              <div className="file-upload">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  id="fileInput"
                  className="hidden-input"
                  onChange={handleFileChange}
                />
                <label htmlFor="fileInput" className="file-label">
                  <FolderIcon />
                </label>
                {fileCount > 0 && (
                  <span className="file-count">{fileCount} ảnh đã chọn</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="content2">
          <div className="gr">
            <label htmlFor="color">Màu sắc</label>
            <select
              name=""
              id=""
              value={color}
              onChange={(e) => setColor(e.target.value)}
            >
              {listColor.map((color, index) => (
                <option value={color} key={index}>
                  {color}
                </option>
              ))}
            </select>
          </div>
          <div className="gr">
            <label htmlFor="sitChairs">Ghế</label>
            <input
              type="number"
              placeholder="Số ghế"
              id="sitChairs"
              value={sitChairs}
              onChange={(e) => setSitChairs(e.target.value)}
            />
          </div>
          <div className="gr">
            <label htmlFor="state">Trạng thái</label>
            <select
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              {["Cũ", "Mới"].map((state, index) => (
                <option value={state} key={index}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="gr">
            <label htmlFor="ODO">Số KM đã đi</label>
            <input
              type="number"
              id="ODO"
              placeholder="100000 (100.000 Km)"
              value={ODO}
              onChange={(e) => setODO(e.target.value)}
            />
          </div>
          <div className="gr">
            <label htmlFor="origin">Xuất xứ</label>
            <input
              type="text"
              id="origin"
              placeholder="Nước"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </div>
          <div className="gr">
            {" "}
            <label>Năm sản xuất</label>
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              {listYear.map((y, index) => (
                <option key={index} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <div className="gr">
            <label htmlFor="version">Phiên bản</label>
            <input
              type="text"
              id="version"
              placeholder="Phiên bản"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
            />
          </div>
        </div>
        <h3>Thông số chi tiết</h3>
        <div className="content3">
          <div className="gr">
            <label htmlFor="gearBox">Hộp số</label>
            <select
              name=""
              id="gearBox"
              value={gearBox}
              onChange={(e) => setGearBox(e.target.value)}
            >
              {["Số tự động", "Số sàn"].map((g, index) => (
                <option value={g}>{g}</option>
              ))}
            </select>
          </div>
          <div className="gr">
            <label htmlFor="driveSystem">Hệ dẫn động</label>
            <input
              type="text"
              id="driveSystem"
              placeholder="Dẫn động"
              value={driveSystem}
              onChange={(e) => setDriveSystem(e.target.value)}
            />
          </div>
          <div className="gr">
            <label htmlFor="torque">Momen xoắn</label>
            <input
              type="text"
              id="torque"
              placeholder="Momen"
              value={torque}
              onChange={(e) => setTorque(e.target.value)}
            />
          </div>
          <div className="gr">
            <label htmlFor="engine">Động cơ</label>
            <input
              type="text"
              id="engine"
              placeholder="Động cơ"
              value={engine}
              onChange={(e) => setEngine(e.target.value)}
            />
          </div>
          <div className="gr">
            <label htmlFor="horsePower">Mã lực</label>
            <input
              type="text"
              id="horsePower"
              placeholder="Mã lực"
              value={horsePower}
              onChange={(e) => setHorsePower(e.target.value)}
            />
          </div>
          <div className="gr">
            <label htmlFor="power">Năng lượng</label>
            <input
              type="text"
              id="power"
              placeholder="Nguyên liệu"
              value={power}
              onChange={(e) => setPower(e.target.value)}
            />
          </div>
        </div>
        <div className="gr describe">
          <label htmlFor="describe">Miêu tả chi tiết</label>
          <textarea
            id="describe"
            placeholder="Viết gì đó"
            value={describe}
            onChange={(e) => setDescribe(e.target.value)}
          ></textarea>
        </div>
        <div className="gr">
          <button type="submit">Gửi</button>
        </div>
      </form>
    </div>
  );
};

export default PostingCarInfoPage;
