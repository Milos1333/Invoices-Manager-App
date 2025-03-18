import { useState } from "react";
import removeIcon from "../../../assets/remove.png";
import DeleteModal from "../../deleteModal/DeleteModal";
import { deleteData } from "../../../core/ApiService";
import { useNotificationStore } from "../../../stores/notification.store";

const DeleteIcon = ({
  selectedRowIds,
  type,
  setData,
  data,
  setSelectedRowIds,
}) => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const { setNotification } = useNotificationStore();

  const showDeleteModal = () => {
    if (selectedRowIds.length > 0) {
      setIsDeleteModalVisible(true);
    }
  };

  // Handle entity deletion
  const handleDelete = async () => {
    let result = false;

    for (const selectedRowId of selectedRowIds) {
      if (type === "seller") {
        // Check if there are invoices associated with the seller
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
      }

      if (type === "customer") {
        // Check if there are invoices associated with the customer
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

      if (type === "invoice") {
        // For invoices, no check is needed
        result = await deleteData("invoices", selectedRowId);
      }

      if (!result) {
        setNotification(
          true,
          "error",
          "Deletion Failed",
          "An error occurred while trying to delete the item.",
          "#f5c6c6"
        );
        setIsDeleteModalVisible(false);
        return;
      }
    }

    // Remove deleted items from state
    setData((prevData) =>
      prevData.filter((item) => !selectedRowIds.includes(item.id))
    );

    setNotification(
      true,
      "success",
      `${type.charAt(0).toUpperCase() + type.slice(1)} Deleted`,
      `${
        type.charAt(0).toUpperCase() + type.slice(1)
      }(s) have been successfully deleted.`,
      "#d5ffd0"
    );

    setSelectedRowIds([]); // Clear selected rows
    setIsDeleteModalVisible(false);
  };

  const handleCancel = () => {
    setIsDeleteModalVisible(false);
    setSelectedRowIds([]);
  };

  return (
    <>
      <li
        className={selectedRowIds.length > 0 ? "active-remove-icon" : ""}
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
