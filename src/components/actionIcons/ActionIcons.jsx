import removeIcon from "../../assets/remove.png";
import editIcon from "../../assets/edit.png";
import addIcon from "../../assets/add.png";
import "./actionIcons.style.css";

const ActionIcons = ({ selectedRowId }) => {
  return (
    <>
      <ul className="action-icons-container">
        <li>
          <img src={addIcon} width="21px" alt="Add Icon" />
        </li>
        <li className={selectedRowId ? `active-edit-icon` : ""}>
          <img src={editIcon} width="20px" alt="Edit Icon" />
        </li>
        <li className={selectedRowId ? `active-remove-icon` : ""}>
          <img src={removeIcon} width="18px" alt="Remove Icon" />
        </li>
      </ul>
    </>
  );
};

export default ActionIcons;
