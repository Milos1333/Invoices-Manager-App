import { useState } from "react";
import { useNotificationStore } from "../../../stores/notification.store"; // Import the notification store
import EditModal from "../../editModal/EditModal";
import editIcon from "../../../assets/edit.png";
import { putData } from "../../../core/ApiService";

const EditIcon = ({
  type,
  setData,
  selectedRowIds,
  data,
  setInvoices,
  setSelectedRowIds,
}) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedEntities, setSelectedEntities] = useState([]);
  const { setNotification } = useNotificationStore();

  // Function to get entity data based on type (invoice, seller, customer)
  const getEntityData = (type, entityData) => {
    switch (type) {
      case "invoice":
        return entityData.invoices;
      case "seller":
        return entityData.sellers;
      case "customer":
        return entityData.customers;
      default:
        return [];
    }
  };

  const showEditModal = () => {
    if (selectedRowIds.length === 1) {
      const entityData = getEntityData(type, data);
      const selectedEntities = entityData.filter((item) =>
        selectedRowIds.includes(item.id)
      );
      setSelectedEntities(selectedEntities);
      setIsEditModalVisible(true);
    }
  };

  // Handle entity editing
  const handleEdit = async (updatedValues) => {
    const endpoint = type + "s";

    try {
      const updatedEntities = await Promise.all(
        selectedEntities.map(async (entity) => {
          const updatedEntity = await putData(
            endpoint,
            entity.id,
            updatedValues
          );
          if (!updatedEntity) {
            throw new Error("Failed to update seller on the server.");
          }
          return updatedEntity;
        })
      );

      if (type === "seller") {
        const updatedSellers = data.sellers.map((seller) =>
          selectedEntities.some((entity) => entity.id === seller.id)
            ? { ...seller, ...updatedValues }
            : seller
        );
        setData(updatedSellers);

        const updatedInvoices = data.invoices.map((invoice) =>
          selectedEntities.some((entity) => invoice.sellerId === entity.id)
            ? { ...invoice, sellerName: updatedValues.companyName }
            : invoice
        );

        setInvoices(updatedInvoices);
      } else if (type === "customer") {
        const updatedCustomers = data.customers.map((customer) =>
          selectedEntities.some((entity) => entity.id === customer.id)
            ? { ...customer, ...updatedValues }
            : customer
        );
        setData(updatedCustomers);

        const updatedInvoices = data.invoices.map((invoice) =>
          selectedEntities.some((entity) => invoice.customerId === entity.id)
            ? { ...invoice, customerName: updatedValues.name }
            : invoice
        );
        setInvoices(updatedInvoices);
      } else if (type === "invoice") {
        const updatedInvoices = data.invoices.map((invoice) =>
          selectedEntities.some((entity) => invoice.id === entity.id)
            ? { ...invoice, ...updatedValues }
            : invoice
        );
        setData(updatedInvoices);
      }

      // Display notification for successful update
      setNotification(
        true,
        "success",
        "Update Successful",
        "The entity has been successfully updated.",
        "#d5ffd0"
      );
      setIsEditModalVisible(false);
      setSelectedRowIds([]);
    } catch (error) {
      setNotification(
        true,
        "error",
        "Update Failed",
        "An error occurred while updating the entity.",
        "#f5c6c6"
      );
    }
  };

  return (
    <>
      <li
        className={selectedRowIds.length === 1 ? "active-edit-icon" : ""}
        onClick={showEditModal}
      >
        <img src={editIcon} width="20px" alt="Edit Icon" />
      </li>

      {isEditModalVisible && (
        <EditModal
          isVisible={isEditModalVisible}
          onClose={() => {
            setIsEditModalVisible(false);
            setSelectedRowIds([]);
          }}
          onEdit={handleEdit}
          type={type}
          data={data}
          initialValues={selectedEntities[0]}
        />
      )}
    </>
  );
};

export default EditIcon;
