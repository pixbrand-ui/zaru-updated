import React, { useEffect, useState } from "react";
import GContainer from "../../../Components/GComponents/GContainer";
import { Ballot, FactCheck, PlaylistRemove } from "@mui/icons-material";
import GCard from "../../../Components/GComponents/GCard";
import DataTable from "../../../Components/DataTable/DataTable";
import Overview from "../Comman/Overview";
import AddSubcategoriesPage from "./AddSubcategoriesPage";
import FormModal from "../../../Components/FormModal/FormModal";
import LoadingModal from "../../../Components/LoadingModal/LoadingModal";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import AlertModal02 from "../../../Components/AlertModal02/AlertModal02";
import Auth from "../../../Helpers/Auth/Auth";
import EditSubcategoryForm from './EditSubcategoryForm'
export default function SubcategoriesPage() {
  // States
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
        API.adminSubcategorylist,
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
                element.subcategory_name,
                element.categoryid.category_name,
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
      <AddSubcategoriesPage />,
      "Add Sub-Category",
      refreshData,
      "md",
      "Cancel"
    );
  };
  const clearClick = () => {};
  const goClick = () => {};
  const editClick = (id) => {
    FormModal.show(
      <EditSubcategoryForm id={id} callback={refreshData} />,
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
        HTTP.delete(API.del_subcategory + "" + id, false, Auth.getToken()).then((res) => {
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
        title={"Subcategories Overview"}
        first_icon={<Ballot />}
        first_title={"Sub-Categories"}
        first_subtitle={"5412"}
        first_tooltip="Number of sub-categories in records."
        second_icon={<FactCheck />}
        second_title={"Active Sub-Categories"}
        second_subtitle={"3515"}
        second_tooltip="Sub-Categories used by service providers."
        third_icon={<FactCheck />}
        third_title={"Mostly Searched"}
        third_subtitle={"Home Cleaning"}
        third_tooltip="Mostly searched by customer."
        fourth_icon={<PlaylistRemove />}
        fourth_title={"Inactive Sub-Categories"}
        fourth_subtitle={"147"}
        fourth_tooltip="Inactive or blocked categories."
      />
      <GContainer className="p-3">
        <span className="container-title">Manage Sub-Categories</span>
        <GCard direction="column" className="p-2">
          <DataTable
            pagination={pagination}
            handlepaginationGetter={handlepagination}
            filterQuery={filterQuery}
            sortHandling={handleSort}
            handleSearchChange={handleSearchChange}
            headings={["Sub Category", "Category", "Status"]}
            headerComponent={<></>}
            actions={true}
            data={data}
            addButtonText="Add Subcategory"
            enableView={true}
            onSearchClick={searchClick}
            onClearClick={clearClick}
            onGoClick={goClick}
            onEditClick={editClick}
            onDeleteClick={deleteClick}
            onAddClick={addClick}
            showIdColumn={false}
          />
        </GCard>
      </GContainer>
    </>
  );
}
