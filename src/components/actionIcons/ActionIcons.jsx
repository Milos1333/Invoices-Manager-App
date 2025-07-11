import "./ActionIcons.style.css";
import DeleteIcon from "./components/DeleteIcon";
import CreateIcon from "./components/CreateIcon";
import EditIcon from "./components/EditIcon";

const ActionIcons = ({
  selectedRowIds,
  data,
  type,
  setData,
  setInvoices,
  setSelectedRowIds,
}) => {
  return (
    <>
      <ul className="action-icons-container">
        <CreateIcon
          type={type}
          setData={setData}
          data={data}
          setSelectedRowIds={setSelectedRowIds}
          selectedRowIds={selectedRowIds}
        />
        <EditIcon
          type={type}
          setData={setData}
          data={data}
          selectedRowIds={selectedRowIds}
          setInvoices={setInvoices}
          setSelectedRowIds={setSelectedRowIds}
        />
        <DeleteIcon
          selectedRowIds={selectedRowIds}
          type={type}
          setData={setData}
          data={data}
          setSelectedRowIds={setSelectedRowIds}
        />
      </ul>
    </>
  );
};

export default ActionIcons;
