import { useState } from "react";
import EditModal from "../../editModal/EditModal";
import editIcon from "../../../assets/edit.png";
import { putData } from "../../../core/ApiService";

const EditIcon = ({ type, setData, selectedRowId, data, setInvoices }) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);

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

    const updatedEntity = await putData(endpoint, id, updatedValues);

    if (updatedEntity) {
      if (type === "seller") {
        const updatedSellers = data.sellers.map((seller) =>
          seller.id === selectedEntity.id
            ? { ...seller, ...updatedValues }
            : seller
        );

        const updatedInvoices = data.invoices.map((invoice) =>
          invoice.sellerId === selectedRowId
            ? { ...invoice, sellerName: updatedValues.companyName }
            : invoice
        );

        setData(updatedSellers);
        setInvoices(updatedInvoices);
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

      setIsEditModalVisible(false);
    } else {
      console.error("Failed to update data.");
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
          onClose={() => setIsEditModalVisible(false)}
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
