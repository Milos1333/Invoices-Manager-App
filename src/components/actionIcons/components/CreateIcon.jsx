import { useState } from "react";
import { postData } from "../../../core/ApiService";
import addIcon from "../../../assets/add.png";
import CreateModal from "../../createModal/CreateModal";
import moment from "moment";
import { useNotificationStore } from "../../../stores/notification.store"; // Import the notification store

const CreateIcon = ({ type, data, setData, setSelectedRow }) => {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const { setNotification } = useNotificationStore(); // Access notification store

  const getEntityData = (type, data) => {
    switch (type) {
      case "invoice":
        return data.invoices;
      case "seller":
        return data.sellers;
      case "customer":
        return data.customers;
      default:
        return [];
    }
  };

  const handleCreate = async (newEntity) => {
    let entityData = getEntityData(type, data);
    let entityWithId;

    const getNextId = (entityData) => {
      if (entityData.length === 0) return "1";
      const maxId = entityData.reduce(
        (max, item) => (Number(item.id) > Number(max) ? item.id : max),
        "0"
      );
      return (Number(maxId) + 1).toString();
    };

    try {
      if (type === "invoice") {
        const selectedSeller = data.sellers.find(
          (seller) => seller.companyName === newEntity.sellerName
        );
        const selectedCustomer = data.customers.find(
          (customer) => customer.name === newEntity.customerName
        );

        const formattedDate = moment(newEntity.date).format("YYYY-MM-DD");

        entityWithId = {
          ...newEntity,
          id: getNextId(entityData),
          date: formattedDate,
          sellerId: selectedSeller.id,
          customerId: selectedCustomer.id,
        };

        let result = await postData("invoices", entityWithId);

        if (result) {
          setData((prevData) => [...prevData, result]);
          setNotification(
            true,
            "success",
            "Invoice Created",
            "The invoice has been successfully created.",
            "#d5ffd0" // Light green color for success
          );
        }
      } else if (type === "seller") {
        entityWithId = {
          ...newEntity,
          id: getNextId(entityData),
          isActive: newEntity.isActive ?? false,
        };

        let result = await postData("sellers", entityWithId);

        if (result) {
          setData((prevData) => [...prevData, result]);
          setNotification(
            true,
            "success",
            "Seller Created",
            "The seller has been successfully created.",
            "#d5ffd0" // Light green color for success
          );
        }
      } else if (type === "customer") {
        entityWithId = {
          ...newEntity,
          id: getNextId(entityData),
        };

        let result = await postData("customers", entityWithId);
        if (result) {
          setData((prevData) => [...prevData, result]);
          setNotification(
            true,
            "success",
            "Customer Created",
            "The customer has been successfully created.",
            "#d5ffd0" // Light green color for success
          );
        }
      }
    } catch (error) {
      setNotification(
        true,
        "error",
        "Creation Failed",
        "An error occurred while creating the entity.",
        "#f5c6c6" // Light red color for error
      );
    }
    setIsCreateModalVisible(false);
    setSelectedRow(null); // Reset selectedRowId after closing the modal
  };

  const showCreateModal = () => {
    setIsCreateModalVisible(true); // Ensure selectedRowId is reset when showing the modal
  };

  return (
    <>
      <li onClick={showCreateModal}>
        <img src={addIcon} width="21px" alt="Add Icon" />
      </li>

      <CreateModal
        isVisible={isCreateModalVisible}
        onClose={() => {
          setIsCreateModalVisible(false);
          setSelectedRow(null); // Ensure selectedRowId is reset when closing the modal
        }}
        onCreate={handleCreate}
        type={type}
        data={data}
      />
    </>
  );
};

export default CreateIcon;
