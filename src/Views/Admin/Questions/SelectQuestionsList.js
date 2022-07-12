import React, { useEffect, useState } from "react";
import GContainer from "../../../Components/GComponents/GContainer";
import GCard from "../../../Components/GComponents/GCard";
import DataTable from "../../../Components/DataTable/DataTable";
import LoadingModal from "../../../Components/LoadingModal/LoadingModal";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";

export default function SelectQuestionListPage(props) {

  const [pagination,setpagination]=useState({
    currentPage: 1,
    totalDocs: "",
    totalPages: "",
    prevPage: "",
    nextPage: ""
  });
  const [filterQuery, setfilterQuery] = useState({
    searchEnable: false,
    search: "",
    sort_by: -1,
    pagesize: 10,
    page: 1,
  });

  const handlepagination=(evt)=>{
    setpagination({
      ...pagination,
      currentPage: evt
    })
  }
  const handleSort=(evt)=>{
    setfilterQuery({
      ...filterQuery,
      sort_by: evt,
    });
    
  }
  const handleSearchChange = (e) => {
    let { name, value } = e.target;
    setfilterQuery({
      ...filterQuery,
      [name]: value,
    });
  };
  
  // States
  const [data, setData] = useState([]);

  // OnLoad
  useEffect(() => {
    loadData().then((res) => {
      setData(res);
    });
  }, []);

  const loadData = async () => {
    LoadingModal.show("Please wait...");
    let fdata = [];
    try {
      await HTTP.get(API.get_question, false).then((res) => {
        if (res && res.status && res.status.toString() === "200") {
          if (res.data.length > 0) {
            const rdata = res.data;

            rdata.forEach((element) => {
              fdata.push([
                element._id,
                element.qusTitle,
                element.qusType,
                element.isRequired ? "Yes" : "No",
                element.active ? "Active" : "Deactive",
              ]);
            });
            LoadingModal.hide();
            return fdata;
          }
        }
      });
    } catch (e) {
      console.log("error", e);
      LoadingModal.hide();
    }
    return fdata;
  };

  const searchClick = (data) => {};
  const radioChange = (data) => {
    props.callback(data);
  };
  return (
    <>
      <GContainer className="p-3">
        <span className="colorPara d-block mb5 pl10">
          Select question-set to map sub category.{" "}
        </span>
        <GCard
          direction="column"
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.3)"
          className="p-2"
        >
          <DataTable
            pagination={pagination}
            handlepaginationGetter={handlepagination}
            filterQuery={filterQuery}
            sortHandling={handleSort}
            handleSearchChange={handleSearchChange}
            headings={["Ref", "Question", "Type", "IsRequired", "Status"]}
            headerComponent={<></>}
            actions={false}
            data={data}
            showAddButton={false}
            onSearchClick={searchClick}
            enableRadio={true}
            onRadioChange={(data) => radioChange(data)}
            showIdColumn={false}
          />
        </GCard>
      </GContainer>
    </>
  );
}
