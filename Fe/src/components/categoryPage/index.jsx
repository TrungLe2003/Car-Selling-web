// svgs
import ArrowRightIcon from "../../icons/homePage/ArrowRightIcon";

//components
//library
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
//css
import "./style.css";

const CategoryPage = () => {
  const nav = useNavigate();
  const [crrBrand, setCrrBrand] = useState(null);
  //Phần chọn brand xe
  const handleFilterClick = (brand) => {
    if (brand === "Tất cả") {
      nav("/cars/all");
    } else {
      nav(`/cars/brand/${brand}`);
    }
  };
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
  return (
    <div className="allCarPage">
      <div className="container1">
        <div className="sortsCarByBrand section1">
          <div className="title">Theo hãng xe:</div>
          <div className="brandList">
            <div
              className="allCar brandCar"
              onClick={() => handleFilterClick("Tất cả")}
            >
              Tất cả
            </div>

            {listBrand.map((brand, index) => (
              <div
                key={index}
                className="brandCar"
                onClick={() => {
                  handleFilterClick(brand);
                  setCrrBrand(index);
                }}
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
        <div className="section2">
          <div className="title">Theo trạng thái:</div>
          <div className="stateList">
            <div className="carState">Xe cũ</div>
            <div className="carState">Xe mới</div>
          </div>
        </div>
        <div className="section3">
          <div className="toSearchPageFrame" onClick={() => nav("/search")}>
            <div className="title">Tìm kiếm xe</div>
            <ArrowRightIcon
              style={{ width: "30px", height: "30px", fill: "#5be239" }}
            />
          </div>
          <div className="compareBtn">
            <div className="title">So sánh</div>
            <input type="checkbox" id="checkboxInput" />
            <label for="checkboxInput" className="toggleSwitch"></label>
          </div>
        </div>
      </div>
      <div className="container2">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default CategoryPage;
