import { Table } from "antd";
import "antd/dist/reset.css";
import "./sellers.style.css";
import ActionIcons from "../../components/actionIcons/ActionIcons";

const Sellers = ({ sellers }) => {
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

  return (
    <div className="invoices-wrapper">
      <div className="header-container">
        <h2>INVOICES</h2>
      </div>
      <div className="action-icons-container">
        <ActionIcons />
      </div>
      <div className="invoices-table-container">
        {sellers.length > 0 ? (
          <Table
            dataSource={sellers}
            columns={columns}
            rowKey="id" // Jedinstveni identifikator za svaki red
            pagination={{ pageSize: 5 }} // Broj redova po stranici
          />
        ) : (
          <p>No sellers available</p>
        )}
      </div>
    </div>
  );
};

export default Sellers;
