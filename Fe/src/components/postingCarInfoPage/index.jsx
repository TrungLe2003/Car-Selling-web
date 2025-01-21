// svgs
import PhoneIcon from "../../icons/contactPage/PhoneIcon";
import EmailIcon from "../../icons/contactPage/EmailIcon";
import AddressIcon from "../../icons/contactPage/AddressIcon";
//
import "./style.css";

const PostingCarInfoPage = () => {
  return (
    <div className="PostingCarInfoPage">
      <div className="title">
        <h1>ĐĂNG THÔNG TIN BÁN XE</h1>
      </div>
      <div className="content">
        <form action="" className="left">
          <div className="gr">
            <label htmlFor="carName">Tên xe</label>
            <input type="text" id="carName" placeholder="Tên xe đăng bán" />
          </div>
          <div className="gr">
            <label htmlFor="Price">Giá xe</label>
            <input type="text" id="Price" placeholder="Điền giá" />
          </div>
          <div className="gr">
            <label htmlFor="phoneNumber">Số điện thoại</label>
            <input
              type="text"
              id="phoneNumber"
              placeholder="Điền số điện thoại"
            />
          </div>
          <div className="gr">
            <label htmlFor="describe">Miêu tả chi tiết</label>
            <textarea id="describe" placeholder="Viết gì đó"></textarea>
          </div>
          <div className="gr">
            <button type="button">Gửi</button>
          </div>
        </form>
        <div className="right">
          <div className="contentRight">
            <div className="item">
              <div className="grIcon">
                <PhoneIcon />
                <h4>Phone</h4>
              </div>
              <h4>0123-456-789</h4>
            </div>
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#3563E9",
                margin: "20px 0",
              }}
            ></div>
            <div className="item">
              <div className="grIcon">
                <EmailIcon />
                <h4>Email</h4>
              </div>
              <h4>contact@procar.com</h4>
            </div>
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#3563E9",
                margin: "20px 0",
              }}
            ></div>
            <div className="item">
              <div className="grIcon">
                <AddressIcon />
                <h4>Address</h4>
              </div>
              <h4>22 Thanh Cong, Ba Dinh, Ha Noi</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostingCarInfoPage;
