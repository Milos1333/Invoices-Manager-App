import "./actionIcons.style.css";
import DeleteIcon from "./components/DeleteIcon";
import CreateIcon from "./components/CreateIcon";
import EditIcon from "./components/EditIcon";

const ActionIcons = ({
  selectedRowId,
  data,
  type,
  setData,
  setInvoices,
  setSelectedRow,
}) => {
  return (
    <>
      <ul className="action-icons-container">
        <CreateIcon
          type={type}
          setData={setData}
          data={data}
          setSelectedRow={setSelectedRow}
        />
        <EditIcon
          type={type}
          setData={setData}
          data={data}
          selectedRowId={selectedRowId}
          setInvoices={setInvoices}
          setSelectedRow={setSelectedRow}
        />

        <DeleteIcon
          selectedRowId={selectedRowId}
          type={type}
          setData={setData}
          data={data}
          setSelectedRow={setSelectedRow}
        />
      </ul>
    </>
  );
};

export default ActionIcons;
