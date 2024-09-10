// src/components/actionIcons/ActionIcons.jsx

import { useState } from "react";
import removeIcon from "../../assets/remove.png";
import editIcon from "../../assets/edit.png";
import addIcon from "../../assets/add.png";
import "./actionIcons.style.css";
import CreateModal from "../createModal/CreateModal";
import { postData } from "../../core/ApiService"; // Import postData

const ActionIcons = ({ selectedRowId, data, type, setData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const getEntityData = () => {
    if (type === "invoice") {
      return data.invoices;
    }
    return data;
  };

  const getNextId = (entityData) => {
    if (entityData.length === 0) return 1;
    const maxId = entityData.reduce(
      (max, item) => (item.id > max ? item.id : max),
      0
    );
    return maxId + 1;
  };

  const handleCreate = async (newEntity) => {
    const entityData = getEntityData();

    let entityWithId;
    if (type === "invoice") {
      const selectedSeller = data.sellers.find(
        (seller) => seller.companyName === newEntity.sellerName
      );
      const selectedCustomer = data.customers.find(
        (customer) => customer.name === newEntity.customerName
      );

      // Format date before saving
      const formattedDate = newEntity.date.format("YYYY-MM-DD");

      entityWithId = {
        ...newEntity,
        id: getNextId(entityData),
        date: formattedDate,
        sellerId: selectedSeller ? selectedSeller.id : null,
        customerId: selectedCustomer ? selectedCustomer.id : null,
      };

      // Post data to API
      const result = await postData("invoices", entityWithId);
      if (result) {
        setData((prevData) => [...prevData, result]);
      }
    } else if (type === "seller") {
      entityWithId = {
        ...newEntity,
        id: getNextId(entityData),
      };

      // Post data to API
      const result = await postData("sellers", entityWithId);
      if (result) {
        setData((prevData) => [...prevData, result]);
      }
    } else if (type === "customer") {
      entityWithId = {
        ...newEntity,
        id: getNextId(entityData),
      };

      // Post data to API
      const result = await postData("customers", entityWithId);
      if (result) {
        setData((prevData) => [...prevData, result]);
      }
    }

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <ul className="action-icons-container">
        <li onClick={showModal}>
          <img src={addIcon} width="21px" alt="Add Icon" />
        </li>
        <li className={selectedRowId ? "active-edit-icon" : ""}>
          <img src={editIcon} width="20px" alt="Edit Icon" />
        </li>
        <li className={selectedRowId ? "active-remove-icon" : ""}>
          <img src={removeIcon} width="18px" alt="Remove Icon" />
        </li>
      </ul>

      <CreateModal
        isVisible={isModalVisible}
        onClose={handleCancel}
        onCreate={handleCreate}
        type={type}
        data={data}
      />
    </>
  );
};

export default ActionIcons;
