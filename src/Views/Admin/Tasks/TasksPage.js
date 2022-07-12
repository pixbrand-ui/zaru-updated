import React, { useEffect, useState } from "react";
import GContainer from "../../../Components/GComponents/GContainer";
import { CasesOutlined, ShoppingBagOutlined, WorkOffOutlined, WorkOutlineOutlined } from "@mui/icons-material";
import GCard from "../../../Components/GComponents/GCard";
import DataTable from "../../../Components/DataTable/DataTable";
import Overview from "../Comman/Overview";
import AlertModal from "../../../Components/AlertModal/AlertModal";
import AlertModal02 from "../../../Components/AlertModal02/AlertModal02";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import Auth from "../../../Helpers/Auth/Auth";
import LoadingModal from "../../../Components/LoadingModal/LoadingModal";
import TaskDetails from "./TaskDetails";

export default function TasksPage() {
  const [pagination, setpagination] = useState({
    currentPage: 1,
    totalDocs: "",
    totalPages: "",
    prevPage: "",
    nextPage: "",
  });
  const [filterQuery, setfilterQuery] = useState({
    searchEnable: false,
    search: "",
    sort_by: -1,
    pagesize: 10,
    page: 1,
  });


  const onViewClickEvt = (evt) => {
    AlertModal.show(<TaskDetails taskID={evt}/>,"Customer Details",()=>{},"xl",false);
  };

  const handlepagination = (evt) => {
    setpagination({
      ...pagination,
      currentPage: evt,
    });
  };
  const handleSort = (evt) => {
    setfilterQuery({
      ...filterQuery,
      sort_by: evt,
    });
  };
  const handleSearchChange = (e) => {
    let { name, value } = e.target;
    setfilterQuery({
      ...filterQuery,
      [name]: value,
    });
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    loadData();
  }, [pagination.currentPage, filterQuery.sort_by]);
  const loadData = async () => {
    LoadingModal.show("Please wait...");
    const iData = {
      search: filterQuery.search,
      sort_by: { createdAt: filterQuery.sort_by },
      pagesize: 10,
      page: pagination.currentPage,
    };
    try {
     await HTTP.post(
        API.adminTasklist,
        iData,
        true,
        false,
        Auth.getToken()
      ).then((res) => {
        console.log("reea",res);
        if (res && res.status && res.status.toString() === "200") {
          if (res.data && res.data.length > 0) {
            setData(res.data);
          }
          setpagination({
            ...pagination,
            totalDocs: res.totalDocs,
            totalPages: res.totalPages,
            prevPage: res.prevPage,
            nextPage: res.nextPage,
          });
          LoadingModal.hide();
        }
      });
    } catch (e) {
      console.log(e, "Error in the customer");
      LoadingModal.hide();
    }
  };
  const searchClick = (data) => {
    setfilterQuery({
      ...filterQuery,
      search: data,
    });
    loadData().then((res) => {
      setData(res.data);
      setpagination({
        ...pagination,
        totalDocs: res.totalDocs,
        totalPages: res.totalPages,
        prevPage: res.prevPage,
        nextPage: res.nextPage,
      });
    });
  };
  const addClick = () => {
   // AlertModal.show(<AddNewCustomer/>,'Add new customer',()=>{},"lg")
  };
  const clearClick = () => {};
  const goClick = (id) => {

  };
  const editClick = (id) => {
    //AlertModal.show(<UpdateCustomer customerID={id}/>,'Update Customer',()=>{},"lg")
  };

  const refreshData = () => {
    loadData().then((res) => {
      setData(res);
      setpagination({
        ...pagination,
        totalDocs: res.totalDocs,
        totalPages: res.totalPages,
        prevPage: res.prevPage,
        nextPage: res.nextPage,
      });
    });
  };
  const deleteClick = (id) => {
    AlertModal02.show(
      "Sure to remove it?",
      "Confirm ?",
      () => {
        HTTP.delete(API.adminTaskDelete + id, false,Auth.getToken()).then((res) => {
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
        title={"Tasks Overview"}
        first_icon={<ShoppingBagOutlined />}
        first_title={"Tasks"}
        first_subtitle={"3214"}
        first_tooltip="Number of created Tasks in records."
        second_icon={<WorkOutlineOutlined  />}
        second_title={"Active Tasks"}
        second_subtitle={"1452"}
        second_tooltip="Number of tasks is open"
        third_icon={<CasesOutlined />}
        third_title={"Completed Tasks"}
        third_subtitle={"1287"}
        third_tooltip="Tasks Completed by providers."
        fourth_icon={<WorkOffOutlined />}
        fourth_title={"Inactive Tasks"}
        fourth_subtitle={"254"}
        fourth_tooltip="Inactive or blocked Tasks."
      />
      <GContainer className="p-3">
        <span className="container-title">Manage Tasks</span>
        <GCard direction="column" className="p-2">
          <DataTable
             pagination={pagination}
             handlepaginationGetter={handlepagination}
             filterQuery={filterQuery}
             sortHandling={handleSort}
             handleSearchChange={handleSearchChange}
             headings={["Task ID", "Name", "Phone", "Email", "Status"]}
             headerComponent={<></>}
             actions={true}
             data={data && data.map((obj, ind) => {
               return [
                 obj._id,
                 obj.firstname + " " + obj.lastname,
                 obj.phone,
                 obj.email,
                 obj.active === true && "Active",
               ];
             })}
            addButtonText="Add Task"
            enableView={true}
            enableedit={false}
            onSearchClick={searchClick}
            onClearClick={clearClick}
            onGoClick={goClick}
            onEditClick={editClick}
            onDeleteClick={deleteClick}
            onAddClick={addClick}
            onViewClick={onViewClickEvt}
          />
        </GCard>
      </GContainer>
    </>
  );
}
