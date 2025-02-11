import CarFrame1 from "../../carFrame/carFrameStyle1";
import EditPostProviderModal from "./EditModal";
//icons
import EditIcon from "../../../icons/provider/EditIcon";
import BinIcon from "../../../icons/provider/BinIcon";
//library
import { useState } from "react";
//css
import "./style.css";
const PostManage = () => {
  const [onOpenEditModal, setOnOpenEditModal] = useState(false);
  const [onOpenDeleteModal, setOnOpenDeleteModal] = useState(false);
  const openEditModal = () => {
    if (onOpenEditModal) {
      setOnOpenEditModal(false);
    } else {
      setOnOpenEditModal(true);
    }
  };
  const openDeleteModal = () => {
    if (onOpenDeleteModal) {
      setOnOpenDeleteModal(false);
    } else {
      setOnOpenDeleteModal(true);
    }
  };
  return (
    <div className="PostProviderManage">
      <div className="item">
        <CarFrame1></CarFrame1>
        <div className="actionFrame">
          <div className="editBtn btn" onClick={openEditModal}>
            <EditIcon></EditIcon>
          </div>
          <div className="line"></div>
          <div className="deleteBtn btn" onClick={openDeleteModal}>
            {" "}
            <BinIcon></BinIcon>
          </div>
        </div>
        {onOpenDeleteModal && (
          <div className="DeletePostProviderModal">
            <div className="title">Bạn có thực sự muốn xóa bài đăng</div>
            <div className="deleteActionFrame">
              <div className="acceptBtn">Có</div>/
              <div className="rejectBtn" onClick={openDeleteModal}>
                Không
              </div>
            </div>
          </div>
        )}
      </div>
      {onOpenEditModal && (
        <EditPostProviderModal
          openEditModal={openEditModal}
        ></EditPostProviderModal>
      )}
    </div>
  );
};

export default PostManage;
