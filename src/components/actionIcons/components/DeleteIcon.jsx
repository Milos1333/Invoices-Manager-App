import { useState } from "react";
import removeIcon from "../../../assets/remove.png";
import DeleteModal from "../../deleteModal/DeleteModal";
import { deleteData } from "../../../core/ApiService";
import { useNotificationStore } from "../../../stores/notification.store";

const DeleteIcon = ({ selectedRowId, type, setData, data, setSelectedRow }) => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const { setNotification } = useNotificationStore();

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
          true,
          "warning",
          "Cannot Delete Seller",
          "Please remove all associated invoices first.",
          "#fff3cd"
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
          true,
          "warning",
          "Cannot Delete Customer",
          "Please remove all associated invoices first.",
          "#fff3cd"
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

      setNotification(
        true,
        "success",
        `${type.charAt(0).toUpperCase() + type.slice(1)} Deleted`,
        `${
          type.charAt(0).toUpperCase() + type.slice(1)
        } has been successfully deleted.`,
        "#d5ffd0"
      );

      setSelectedRow(null);
    } else {
      setNotification(
        true,
        "error",
        "Deletion Failed",
        "An error occurred while trying to delete the item.",
        "#f5c6c6"
      );
    }

    setIsDeleteModalVisible(false);
  };

  const handleCancel = () => {
    setIsDeleteModalVisible(false);
    setSelectedRow(null);
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
        onCancel={handleCancel}
      />
    </>
  );
};

export default DeleteIcon;
