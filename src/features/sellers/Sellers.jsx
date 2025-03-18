import { Table } from "antd";
import "antd/dist/reset.css";
import "./sellers.style.css";
import ActionIcons from "../../components/actionIcons/ActionIcons";
import { useState } from "react";

const Sellers = ({ sellers, setSellers, invoices, setInvoices }) => {
  const [selectedRowIds, setSelectedRowIds] = useState([]);

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

  // Handle row click to select/deselect rows
  const handleRowClick = (record) => {
    setSelectedRowIds((prevSelectedRowIds) => {
      if (prevSelectedRowIds.includes(record.id)) {
        return prevSelectedRowIds.filter((id) => id !== record.id);
      }
      return [...prevSelectedRowIds, record.id];
    });
  };

  return (
    <div className="invoices-wrapper">
      <div className="header-container">
        <h2>SELLERS</h2>
      </div>
      <div className="action-icons-container">
        <ActionIcons
          selectedRowIds={selectedRowIds}
          data={{ sellers, invoices }}
          type="seller"
          setData={setSellers}
          setInvoices={setInvoices}
          setSelectedRowIds={setSelectedRowIds}
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
              selectedRowIds.includes(record.id) ? "selected-row" : ""
            }
          />
        ) : (
          <p style={{ textAlign: "center" }}>No sellers available</p>
        )}
      </div>
    </div>
  );
};

export default Sellers;
