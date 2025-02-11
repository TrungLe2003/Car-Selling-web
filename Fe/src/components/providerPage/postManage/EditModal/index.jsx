import { option } from "framer-motion/client";
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

const EditPostProviderModal = ({ openEditModal }) => {
  return (
    <div className="EditPostProviderModal">
      <div className="modal">
        <div className="EditPostProviderheader">
          <div className="nameCar">
            <h2>Honda civic đời 2021 viết dài để edit</h2>
            <div>(Tên và ảnh xe không thể thay thế)</div>
          </div>
          <div className="closeModal" onClick={openEditModal}>
            X
          </div>
        </div>
        <form action="" className="editInfoForm">
          <div className="section1 section">
            <div className="sq">
              <label htmlFor="Price">Giá</label>
              <input
                type="number"
                id="Price"
                placeholder="100000000 (100.000.000vnđ)"
              />
            </div>
            <div className="sq">
              <label htmlFor="brand">Thương hiệu</label>

              <select name="" id="brand">
                {listBrand.map((brand, index) => (
                  <option value={brand} key={index}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
            <div className="sq">
              <label htmlFor="color">Màu sắc</label>

              <select name="" id="color">
                {listColor.map((color, index) => (
                  <option value={color} key={index}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
            <div className="sq">
              <label htmlFor="sitChairs">Ghế</label>
              <input type="number" id="sitChairs" placeholder="Số ghế" />
            </div>
            <div className="sq">
              <label htmlFor="state">Trạng thái</label>

              <select name="" id="state">
                {["Cũ", "Mới"].map((state, index) => (
                  <option value={state} key={index}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div className="sq">
              <label htmlFor="ODO">Số Km</label>
              <input type="number" id="ODO" placeholder="100000 (100.000 Km)" />
            </div>
            <div className="sq">
              <label htmlFor="origin">Xuất xứ</label>
              <input type="text" id="origin" placeholder="Nước" />
            </div>
            <div className="sq">
              <label htmlFor="year">Năm</label>
              <select name="" id="year">
                {listYear.map((y, index) => (
                  <option key={index} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="section2 section">
            <div className="sq">
              <label htmlFor="gearBox">Hộp số</label>
              <select name="" id="gearBox">
                {["Số tự động", "Số sàn"].map((y, index) => (
                  <option key={index} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <div className="sq">
              <label htmlFor="driveSystem">Hệ dẫn động</label>
              <input type="text" id="driveSystem" placeholder="Dẫn động" />
            </div>
            <div className="sq">
              <label htmlFor="torque">Momen xoắn</label>
              <input type="text" id="torque" placeholder="Momen" />
            </div>
            <div className="sq">
              <label htmlFor="engine">Động cơ</label>
              <input type="text" id="engine" placeholder="Động cơ" />
            </div>
            <div className="sq">
              <label htmlFor="horsePower">Mã lực</label>
              <input type="text" id="horsePower" placeholder="Mã lực" />
            </div>
            <div className="sq">
              <label htmlFor="power">Năng lượng</label>
              <input type="text" id="power" placeholder="Nguyên liệu" />
            </div>
          </div>
          <div className="sq describe">
            <label htmlFor="describe">Miêu tả chi tiết</label>
            <textarea id="describe" placeholder="Viết gì đó"></textarea>
          </div>
          <button type="submit">Gửi</button>
        </form>
      </div>
    </div>
  );
};

export default EditPostProviderModal;
