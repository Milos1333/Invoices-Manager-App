import { useState } from "react";
import { useNotificationStore } from "../../../stores/notification.store"; // Import the notification store
import EditModal from "../../editModal/EditModal";
import editIcon from "../../../assets/edit.png";
import { putData } from "../../../core/ApiService";

const EditIcon = ({
  type,
  setData,
  selectedRowId,
  data,
  setInvoices,
  setSelectedRow,
}) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const { setNotification } = useNotificationStore(); // Access notification store

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
    if (selectedRowId) {
      const entityData = getEntityData(type, data);
      const entity = entityData.find((item) => item.id === selectedRowId);

      if (entity) {
        setSelectedEntity(entity);
        setIsEditModalVisible(true);
      }
    }
  };

  const handleEdit = async (updatedValues) => {
    const endpoint = type + "s";
    const id = selectedEntity.id;

    try {
      const updatedEntity = await putData(endpoint, id, updatedValues);

      if (updatedEntity) {
        if (type === "seller") {
          const updatedSellers = data.sellers.map((seller) =>
            seller.id === selectedEntity.id
              ? { ...seller, ...updatedValues }
              : seller
          );

          const updatedInvoices = data.invoices.map((invoice) =>
            invoice.sellerId === selectedEntity.id
              ? { ...invoice, sellerName: updatedValues.companyName }
              : invoice
          );

          setData(updatedSellers);
          setInvoices(updatedInvoices);

          updatedInvoices.forEach(async (invoice) => {
            await putData("invoices", invoice.id, invoice);
          });
        } else if (type === "customer") {
          const updatedCustomers = data.customers.map((customer) =>
            customer.id === selectedEntity.id
              ? { ...customer, ...updatedValues }
              : customer
          );

          const updatedInvoices = data.invoices.map((invoice) =>
            invoice.customerId === selectedRowId
              ? { ...invoice, customerName: `${updatedValues.name}` }
              : invoice
          );

          setData(updatedCustomers);
          setInvoices(updatedInvoices);
          updatedInvoices.forEach(async (invoice) => {
            await putData("invoices", invoice.id, invoice);
          });
        } else if (type === "invoice") {
          const selectedSeller = data.sellers.find(
            (seller) => seller.companyName === updatedValues.sellerName
          );

          const selectedCustomer = data.customers.find(
            (customer) => customer.name === updatedValues.customerName
          );

          const updatedInvoices = data.invoices.map((invoice) =>
            invoice.id === selectedEntity.id
              ? {
                  ...invoice,
                  ...updatedValues,
                  sellerId: selectedSeller.id,
                  customerId: selectedCustomer.id,
                }
              : invoice
          );

          setData(updatedInvoices);
        }

        setNotification(
          true,
          "success",
          "Update Successful",
          "The entity has been successfully updated.",
          "#d5ffd0" // Light green color for success
        );
        setIsEditModalVisible(false);
        setSelectedRow(null); // Reset selectedRowId after closing the modal
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      setNotification(
        true,
        "error",
        "Update Failed",
        "An error occurred while updating the entity.",
        "#f5c6c6" // Light red color for error
      );
    }
  };

  return (
    <>
      <li
        className={selectedRowId ? "active-edit-icon" : ""}
        onClick={showEditModal}
      >
        <img src={editIcon} width="20px" alt="Edit Icon" />
      </li>

      {isEditModalVisible && (
        <EditModal
          isVisible={isEditModalVisible}
          onClose={() => {
            setIsEditModalVisible(false);
            setSelectedRow(null); // Ensure selectedRowId is reset when closing the modal
          }}
          onEdit={handleEdit}
          type={type}
          data={data}
          initialValues={selectedEntity}
        />
      )}
    </>
  );
};

export default EditIcon;
