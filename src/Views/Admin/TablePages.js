import GCard from "../../Components/GComponents/GCard";
import DataTable from "../../Components/DataTable/DataTable";

export default function TablePages() {

  const searchClick = (data) => {alert(data)};
  const clearClick = () => {};
  const goClick = () => {};
  const editClick = () => {};
  const deleteClick = () => {};

  return (
    <GCard direction="column">
      {/* <DataTable
        columns={columns}
        data={rows}
        pagination
        responsive
        striped={true}
        highlightOnHover
        pointerOnHover
        keyField="id"
      /> */}

      <DataTable
        headings={[
          "Report No.",
          "Rep. Date",
          "Incident Date",
          "Type",
          "Location",
          "Action",
        ]}
        headerComponent={<></>}
        actions={false}
        data={[]}
        onSearchClick={searchClick}
        onClearClick={clearClick}
        onGoClick={goClick}
        onEditClick={editClick}
        onDeleteClick={deleteClick}
      />
    </GCard>
  );
}
