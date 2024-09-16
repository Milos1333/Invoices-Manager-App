import { useState } from "react";
import removeIcon from "../../../assets/remove.png";
import DeleteModal from "../../deleteModal/DeleteModal";
import { deleteData } from "../../../core/ApiService";

const DeleteIcon = ({ selectedRowId, type, setData, data }) => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [notification, setNotification] = useState("");

  const showDeleteModal = () => {
    if (selectedRowId) {
      setIsDeleteModalVisible(true);
    }
  };

  const handleDelete = async () => {
    let result = false;

    if (type === "invoice") {
      result = await deleteData("invoices", selectedRowId);
    } else if (type === "seller") {
      const hasAssociatedInvoices = data.invoices.some(
        (invoice) => invoice.sellerId === selectedRowId
      );

      if (hasAssociatedInvoices) {
        setNotification(
          "Cannot delete seller. Please remove all associated invoices first."
        );
        setIsDeleteModalVisible(false);
        return;
      }

      result = await deleteData("sellers", selectedRowId);
    } else if (type === "customer") {
      const hasAssociatedInvoices = data.invoices.some(
        (invoice) => invoice.customerId === selectedRowId
      );

      if (hasAssociatedInvoices) {
        setNotification(
          "Cannot delete customer. Please remove all associated invoices first."
        );
        setIsDeleteModalVisible(false);
        return;
      }

      result = await deleteData("customers", selectedRowId);
    }

    if (result) {
      setData((prevData) =>
        prevData.filter((item) => item.id !== selectedRowId)
      );
    }

    setIsDeleteModalVisible(false);
  };

  return (
    <>
      <li
        className={selectedRowId ? "active-remove-icon" : ""}
        onClick={showDeleteModal}
      >
        <img src={removeIcon} width="18px" alt="Remove Icon" />
      </li>
      <DeleteModal
        isVisible={isDeleteModalVisible}
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
        notification={notification}
      />
    </>
  );
};

export default DeleteIcon;
