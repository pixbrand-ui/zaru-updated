import React, { useEffect, useState } from "react";
import GContainer from "../../../Components/GComponents/GContainer";
import GCard from "../../../Components/GComponents/GCard";
import DataTable from "../../../Components/DataTable/DataTable";
import Overview from "../Comman/Overview";
import FormModal from "../../../Components/FormModal/FormModal";
import { QuestionCircle, QuestionCircleFill } from "react-bootstrap-icons";
import AddQUestionsPage from "./AddQuestionsPage";
import LoadingModal from "../../../Components/LoadingModal/LoadingModal";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import AlertModal02 from "../../../Components/AlertModal02/AlertModal02";
import Auth from "../../../Helpers/Auth/Auth";
import EditQuestionForm from './EditQuestionForm'
export default function QuestionsPage() {
  const [data, setData] = useState([]);

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
  
  // OnLoad
  useEffect(() => {
    loadData().then((res) => {
      setData(res);
    });
  }, [pagination.currentPage,filterQuery.sort_by]);
  const refreshData = () => {
    loadData().then((res) => {
      setData(res);
    });
  };

  const loadData = async () => {
    LoadingModal.show("Please wait...");
    let fdata = [];
    const iData = {
      search: filterQuery.search,
      sort_by: { createdAt: filterQuery.sort_by },
      pagesize: 10,
      page: pagination.currentPage,
    };
    try {
       await HTTP.post(
        API.adminQuestionlist,
        iData,
        true,
        false,
        Auth.getToken()
      ).then((res) => {
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
            setpagination({
              ...pagination,
              totalDocs: res.totalDocs,
              prevPage: res.prevPage,
              nextPage: res.nextPage,
            })
            LoadingModal.hide();
            return fdata;
          }
        }
      });
    } catch (e) {
      console.log("error", e);
      LoadingModal.hide();
    }
    LoadingModal.hide();
    return fdata;
  };

  const searchClick = (data) => {
    loadData().then((res) => {
      //setData2(res);
      setData(res);
    });
  };
  const addClick = () => {
    FormModal.show(
      <AddQUestionsPage />,
      "Add Questions Set",
      refreshData,
      "md",
      "Cancel"
    );
  };
  const clearClick = () => {};
  const goClick = () => {};
  const editClick = (id) => {
    FormModal.show(
      <EditQuestionForm id={id} callback={refreshData} />,
      "Update Category",
      () => {},
      "xs",
      "",
      false,
      false
    );
  };
  const deleteClick = (id) => {
    AlertModal02.show(
      "Sure to remove it?",
      "Confirm ?",
      () => {
        HTTP.delete(API.del_question + "" + id, false, Auth.getToken()).then((res) => {
          if (res && res.status && res.status.toString() === "200") {
            AlertModal02.show("Removed Successfully.", "Removed!", refreshData);
          }
        });
      },
      "md",
      "Yes"
    );
  };
  return (
    <>
      <Overview
        title={"Questions-Set Overview"}
        first_icon={<QuestionCircle />}
        first_title={"Questions Set"}
        first_subtitle={"5498"}
        first_tooltip="Number of Questions set in records."
        second_icon={<QuestionCircleFill />}
        second_title={"Active Questions"}
        second_subtitle={"3515"}
        second_tooltip="Questions used in Sub Categories."
        third_icon={<QuestionCircle />}
        third_title={"Mostly Used"}
        third_subtitle={"Your Mobile No ?"}
        third_tooltip="Mostly used in Sub Categories."
        fourth_icon={<QuestionCircleFill />}
        fourth_title={"Inactive Questions"}
        fourth_subtitle={"147"}
        fourth_tooltip="Inactive or blocked Questions."
      />
      <GContainer className="p-3">
        <span className="container-title">Manage Questions-Set</span>
        <GCard direction="column" className="p-2">
          <DataTable
            pagination={pagination}
            handlepaginationGetter={handlepagination}
            filterQuery={filterQuery}
            sortHandling={handleSort}
            handleSearchChange={handleSearchChange}
            headings={["Title", "Type", "IsRequired", "Status"]}
            showIdColumn={false}
            headerComponent={<></>}
            actions={true}
            data={data}
            addButtonText="Add Question-Set"
            enableView={true}
            onSearchClick={searchClick}
            onClearClick={clearClick}
            onGoClick={goClick}
            onEditClick={editClick}
            onDeleteClick={deleteClick}
            onAddClick={addClick}
          />
        </GCard>
      </GContainer>
    </>
  );
}
