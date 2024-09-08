import { Table } from "antd";
import "antd/dist/reset.css";
import "./sellers.style.css";
import ActionIcons from "../../components/actionIcons/ActionIcons";
import { useState } from "react";

const Sellers = ({ sellers }) => {
  const [selectedRowId, setSelectedRowId] = useState(null);

  const columns = [
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "HQ Address",
      dataIndex: "hqAddress",
      key: "hqAddress",
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <span style={{ color: isActive ? "green" : "red" }}>
          {isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  const handleRowClick = (record) => {
    setSelectedRowId((prevSelectedRowId) =>
      prevSelectedRowId === record.id ? null : record.id
    );
  };

  return (
    <div className="invoices-wrapper">
      <div className="header-container">
        <h2>SELLERS</h2>
      </div>
      <div className="action-icons-container">
        <ActionIcons
          selectedRowId={selectedRowId}
          data={sellers}
          type="seller"
        />
      </div>
      <div className="invoices-table-container">
        {sellers.length > 0 ? (
          <Table
            dataSource={sellers}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
            rowClassName={(record) =>
              record.id === selectedRowId ? "selected-row" : ""
            }
          />
        ) : (
          <p>No sellers available</p>
        )}
      </div>
    </div>
  );
};

export default Sellers;
