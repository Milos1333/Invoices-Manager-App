import { Modal, Button } from "antd";
import "./deleteModal.style.css";

const DeleteModal = ({ isVisible, onConfirm, onCancel }) => {
  return (
    <Modal
      title="Are you sure ?"
      open={isVisible}
      onCancel={onCancel}
      wrapClassName="delete-wrap"
      footer={[
        <Button key="confirm" type="primary" onClick={onConfirm}>
          Yes
        </Button>,
        <Button key="cancel" onClick={onCancel}>
          No
        </Button>,
      ]}
    ></Modal>
  );
};

export default DeleteModal;
