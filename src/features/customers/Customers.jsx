import { Table } from "antd";
import "antd/dist/reset.css";
import "./customers.style.css";
import ActionIcons from "../../components/actionIcons/ActionIcons";

const Customers = ({ customers }) => {
  // Definiši kolone za tabelu
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

  return (
    <div className="invoices-wrapper">
      <div className="header-container">
        <h2>CUSTOMERS</h2>
      </div>
      <div className="action-icons-container">
        <ActionIcons />
      </div>
      <div className="invoices-table-container">
        {customers.length > 0 ? (
          <Table
            dataSource={customers}
            columns={columns}
            rowKey="id" // Jedinstveni identifikator za svaki red
            pagination={{ pageSize: 5 }} // Broj redova po stranici
          />
        ) : (
          <p>No customers available</p>
        )}
      </div>
    </div>
  );
};

export default Customers;
