import { useState } from "react";
import removeIcon from "../../assets/remove.png";
import editIcon from "../../assets/edit.png";
import addIcon from "../../assets/add.png";
import "./actionIcons.style.css";
import CreateModal from "../createModal/CreateModal";
import DeleteModal from "../deleteModal/DeleteModal"; // Import the DeleteModal
import { postData, deleteData } from "../../core/ApiService";

const ActionIcons = ({ selectedRowId, data, type, setData }) => {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const showCreateModal = () => {
    setIsCreateModalVisible(true);
  };

  const showDeleteModal = () => {
    if (selectedRowId) {
      setIsDeleteModalVisible(true);
    }
  };

  const handleCreate = async (newEntity) => {
    let entityData = data[type + "s"];
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

  const handleDelete = async () => {
    if (!selectedRowId) return;
    let result = false;

    if (type === "invoice") {
      result = await deleteData("invoices", selectedRowId);
    } else if (type === "seller") {
      result = await deleteData("sellers", selectedRowId);
    } else if (type === "customer") {
      result = await deleteData("customers", selectedRowId);
    }

    if (result) {
      setData((prevData) =>
        prevData.filter((item) => item.id !== selectedRowId)
      );
    }
    setIsDeleteModalVisible(false);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalVisible(false);
  };

  return (
    <>
      <ul className="action-icons-container">
        <li onClick={showCreateModal}>
          <img src={addIcon} width="21px" alt="Add Icon" />
        </li>
        <li className={selectedRowId ? "active-edit-icon" : ""}>
          <img src={editIcon} width="20px" alt="Edit Icon" />
        </li>
        <li
          className={selectedRowId ? "active-remove-icon" : ""}
          onClick={showDeleteModal} // Show delete confirmation modal
        >
          <img src={removeIcon} width="18px" alt="Remove Icon" />
        </li>
      </ul>

      <CreateModal
        isVisible={isCreateModalVisible}
        onClose={() => setIsCreateModalVisible(false)}
        onCreate={handleCreate}
        type={type}
        data={data}
      />

      <DeleteModal
        isVisible={isDeleteModalVisible}
        onConfirm={handleDelete} // Confirm delete action
        onCancel={handleCancelDelete} // Cancel delete action
      />
    </>
  );
};

export default ActionIcons;
