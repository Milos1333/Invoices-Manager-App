import { useState } from "react";
import { Table } from "antd";
import "antd/dist/reset.css";
import "./invoices.style.css";
import ActionIcons from "../../components/actionIcons/ActionIcons";

const Invoices = ({ invoices }) => {
  const [selectedRowId, setSelectedRowId] = useState(null);

  const columns = [
    {
      title: "Seller",
      dataIndex: "sellerName",
      key: "sellerName",
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `$${amount.toFixed(2)}`,
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
        <h2>INVOICES</h2>
      </div>
      <div className="action-icons-container">
        <ActionIcons
          selectedRowId={selectedRowId}
          data={invoices}
          type="invoice"
        />
      </div>
      <div className="invoices-table-container">
        {invoices.length > 0 ? (
          <Table
            dataSource={invoices}
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
          <p>No invoices available</p>
        )}
      </div>
    </div>
  );
};

export default Invoices;
