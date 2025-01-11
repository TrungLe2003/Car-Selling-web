//Frame xe dạng nằm ngang
//icons
import CalendarIcon from "../../../icons/CarFrame/CarlendarIcon";
import EnergyIcon from "../../../icons/CarFrame/EnergyIcon";
import SittingChairIcon from "../../../icons/CarFrame/SittingChair";
import WheelIcon from "../../../icons/CarFrame/Wheelcon";
//css
import "./style.css";
const CarFrame1 = () => {
  return (
    //viết tên loằng ngoằng để không trùng cái đã có
    <div className="CarFrameComponent1">
      <div className="carImg">
        <img src="./public/imgs/carDetailPage/carDetail1.png" alt="" />
      </div>
      <div className="carInfo">
        <div className="state">Mới</div>
        <div className="nameCar">Mitsubishi Xpander 1.5 AT Premium 2022</div>
        <div className="Price">
          VNĐ: <span>100.000</span>
        </div>
        <div className="BrandAndCountry">
          Mitsubishi, <span>Nhật Bản</span>
        </div>
        {/* thông số */}
        <div className="parameter">
          <div className="parameterFrame">
            <CalendarIcon></CalendarIcon>
            <div className="title">2022</div>
          </div>
          <div className="parameterFrame">
            <WheelIcon></WheelIcon>
            <div className="title">Số tự động</div>
          </div>
          <div className="parameterFrame">
            <EnergyIcon></EnergyIcon>
            <div className="title">Xăng</div>
          </div>
          <div className="parameterFrame">
            <SittingChairIcon></SittingChairIcon>
            <div className="title">7</div>
          </div>
        </div>
        <div className="line"></div>
        <div className="votingStar">Phần đánh giá đang cập nhật</div>
      </div>
    </div>
  );
};

export default CarFrame1;
