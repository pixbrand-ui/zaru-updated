import React, { useEffect, useState } from "react";
import GContainer from "../../../Components/GComponents/GContainer";
import { Ballot, FactCheck, PlaylistRemove } from "@mui/icons-material";
import GCard from "../../../Components/GComponents/GCard";
import DataTable from "../../../Components/DataTable/DataTable";
import Overview from "../Comman/Overview";
import FormModal from "../../../Components/FormModal/FormModal";
import AddCategoriesPage from "./AddCategoriesPage";
import LoadingModal from "../../../Components/LoadingModal/LoadingModal";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import AlertModal02 from "../../../Components/AlertModal02/AlertModal02";
import EditCategoryPage from "./EditCategoryPage";
import Auth from "../../../Helpers/Auth/Auth";
// import GDataTable from "../../../Components/GComponents/GDataTable/GDataTable";

export default function CategoriesPage() {
  
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
  console.log(filterQuery);
  // States
  const [data, setData] = useState([]);
  // const [data2, setData2] = useState([]);



  // OnLoad
  useEffect(() => {
    loadData().then((res) => {
      //setData2(res);
      setData(res);
    });
  }, [pagination.currentPage,filterQuery.sort_by]);

  const refreshData = () => {
    loadData().then((res) => {
      //setData2(res);
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
        API.adminCategorylist,
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
                element.category_name,
                element.active ? "Active" : "Deactive",
              ]);
            });
            setpagination({
              ...pagination,
              totalDocs: res.totalDocs,
              totalPages: res.totalPages,
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
      <AddCategoriesPage />,
      "Add Category",
      refreshData,
      "md",
      "Cancel"
    );
    loadData().then((res) => {
      setData(res);
    });
  };
  const clearClick = () => {};
  const goClick = () => {};
  const editClick = (id) => {
    FormModal.show(
      <EditCategoryPage id={id} callback={refreshData} />,
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
        HTTP.delete(API.del_category + "" + id, false,Auth.getToken()).then((res) => {
          console.log("del",res);
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
        title={"Categories Overview"}
        first_icon={<Ballot />}
        first_title={"Categories"}
        first_subtitle={"214"}
        first_tooltip="Number of categories in records."
        second_icon={<FactCheck />}
        second_title={"Active Categories"}
        second_subtitle={"45"}
        second_tooltip="Categories used by service providers."
        third_icon={<FactCheck />}
        third_title={"Mostly Searched"}
        third_subtitle={"Cleaning"}
        third_tooltip="Mostly searched by customer."
        fourth_icon={<PlaylistRemove />}
        fourth_title={"Inactive Categories"}
        fourth_subtitle={"18"}
        fourth_tooltip="Inactive or blocked categories."
      />
      <GContainer className="p-3">
        <span className="container-title">Manage Categories</span>
        <GCard direction="column" className="p-2">
          <DataTable
            pagination={pagination}
            handlepaginationGetter={handlepagination}
            filterQuery={filterQuery}
            sortHandling={handleSort}
            handleSearchChange={handleSearchChange}
            headings={["Category", "Status"]}
            headerComponent={<></>}
            actions={true}
            data={data}
            addButtonText="Add Category"
            enableView={false}
            onSearchClick={searchClick}
            onClearClick={clearClick}
            onGoClick={goClick}
            onEditClick={editClick}
            onDeleteClick={deleteClick}
            onAddClick={addClick}
            showIdColumn={false}
          />
        </GCard>
        {/* <GCard direction="column" className="p-2">
          <GDataTable columns={columns} data={data2} />
        </GCard> */}
      </GContainer>
    </>
  );
}
