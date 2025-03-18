import { useState } from "react";
import { Table } from "antd";
import "antd/dist/reset.css";
import "./invoices.style.css";
import ActionIcons from "../../components/actionIcons/ActionIcons";

const Invoices = ({ invoices, sellers, customers, setInvoices }) => {
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const data = {
    invoices: invoices,
    sellers: sellers,
    customers: customers,
  };

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

  // Handle row click for multiple selections
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
        <h2>INVOICES</h2>
      </div>
      <div className="action-icons-container">
        <ActionIcons
          selectedRowIds={selectedRowIds}
          data={data}
          type="invoice"
          setData={setInvoices}
          setSelectedRowIds={setSelectedRowIds}
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
              selectedRowIds.includes(record.id) ? "selected-row" : ""
            }
          />
        ) : (
          <p style={{ textAlign: "center" }}>No invoices available</p>
        )}
      </div>
    </div>
  );
};

export default Invoices;
