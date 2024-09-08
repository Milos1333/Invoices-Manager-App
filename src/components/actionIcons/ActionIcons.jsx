import { useState } from "react";
import removeIcon from "../../assets/remove.png";
import editIcon from "../../assets/edit.png";
import addIcon from "../../assets/add.png";
import "./actionIcons.style.css";
import CreateModal from "../createModal/CreateModal";

const ActionIcons = ({ selectedRowId, data, type }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCreate = (newEntity) => {
    console.log("Created Entity:", newEntity);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <ul className="action-icons-container">
        <li onClick={showModal}>
          <img src={addIcon} width="21px" alt="Add Icon" />
        </li>
        <li className={selectedRowId ? `active-edit-icon` : ""}>
          <img src={editIcon} width="20px" alt="Edit Icon" />
        </li>
        <li className={selectedRowId ? `active-remove-icon` : ""}>
          <img src={removeIcon} width="18px" alt="Remove Icon" />
        </li>
      </ul>

      <CreateModal
        isVisible={isModalVisible}
        onClose={handleCancel}
        onCreate={handleCreate}
        type={type}
      />
    </>
  );
};

export default ActionIcons;
