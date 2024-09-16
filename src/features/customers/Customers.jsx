import { Table } from "antd";
import "antd/dist/reset.css";
import "./customers.style.css";
import ActionIcons from "../../components/actionIcons/ActionIcons";
import { useState } from "react";

const Customers = ({ customers, setCustomers, invoices, setInvoices }) => {
  const [selectedRowId, setSelectedRowId] = useState(null);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
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
        <h2>CUSTOMERS</h2>
      </div>
      <div className="action-icons-container">
        <ActionIcons
          selectedRowId={selectedRowId}
          data={{ customers, invoices }}
          type="customer"
          setData={setCustomers}
          setInvoices={setInvoices}
        />
      </div>
      <div className="invoices-table-container">
        {customers.length > 0 ? (
          <Table
            dataSource={customers}
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
          <p style={{ textAlign: "center" }}>No customers available</p>
        )}
      </div>
    </div>
  );
};

export default Customers;
