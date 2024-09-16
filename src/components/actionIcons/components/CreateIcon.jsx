import { useState } from "react";
import { postData } from "../../../core/ApiService";
import addIcon from "../../../assets/add.png";
import CreateModal from "../../createModal/CreateModal";

const CreateIcon = ({ type, data, setData }) => {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);

  // Obtaining appropriate data

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

  // Checking the following ID and creating a new entity

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

    if (type === "invoice") {
      const selectedSeller = data.sellers.find(
        (seller) => seller.companyName === newEntity.sellerName
      );
      const selectedCustomer = data.customers.find(
        (customer) => customer.name === newEntity.customerName
      );

      const formattedDate = newEntity.date.format("YYYY-MM-DD");

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
      }
    } else if (type === "customer") {
      entityWithId = {
        ...newEntity,
        id: getNextId(entityData),
      };

      let result = await postData("customers", entityWithId);
      if (result) {
        setData((prevData) => [...prevData, result]);
      }
    }
    setIsCreateModalVisible(false);
  };

  const showCreateModal = () => {
    setIsCreateModalVisible(true);
  };

  return (
    <>
      <li onClick={showCreateModal}>
        <img src={addIcon} width="21px" alt="Add Icon" />
      </li>

      <CreateModal
        isVisible={isCreateModalVisible}
        onClose={() => setIsCreateModalVisible(false)}
        onCreate={handleCreate}
        type={type}
        data={data}
      />
    </>
  );
};

export default CreateIcon;
