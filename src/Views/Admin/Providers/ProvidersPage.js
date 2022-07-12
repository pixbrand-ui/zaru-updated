import React, { useEffect, useState } from "react";
import GContainer from "../../../Components/GComponents/GContainer";
import { CancelPresentation, Shop, Store, Storefront } from "@mui/icons-material";
import GCard from "../../../Components/GComponents/GCard";
import DataTable from "../../../Components/DataTable/DataTable";
import Overview from "../Comman/Overview";
import LoadingModal from "../../../Components/LoadingModal/LoadingModal";
import HTTP from "../../../Helpers/Api/Api";
import API from "../../../Helpers/Constants/Constants";
import Auth from "../../../Helpers/Auth/Auth";
import AddNewProvider from "./AddNewProvider";
import AlertModal from "../../../Components/AlertModal/AlertModal";
import AlertModal02 from "../../../Components/AlertModal02/AlertModal02";
import UpdateProvider from "./UpdateProvider";

export default function ProvidersPage() {
  const [data, setData] = useState([]);
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

  const searchClick = (data) => {
    setfilterQuery({
      ...filterQuery,
      search: data,
    });
    loadData().then((res) => {
      setData(res.data && res.data);
      setpagination({
        ...pagination,
        totalDocs: res.totalDocs,
        totalPages: res.totalPages,
        prevPage: res.prevPage,
        nextPage: res.nextPage,
      });
    });
  };
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
        API.providerlist,
        iData,
        true,
        false,
        Auth.getToken()
      ).then((res) => {
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

  const addClick = () => {
    AlertModal.show(<AddNewProvider/>,'Add new provider',()=>{},"lg");
  };
  const refreshData = () => {
    loadData().then((res) => {
      setData(res);
    });
  };
  const deleteClick = (id) => {
    alert(id);
    AlertModal02.show(
      "Sure to remove it?",
      "Confirm ?",
      () => {
        HTTP.delete(API.provDelete + id, false,Auth.getToken()).then((res) => {
          if (res && res.status && res.status.toString() === "200") {
            AlertModal02.show("Removed Successfully.", "Removed!", refreshData);
          }
        });
      },
      "md",
      "Yes"
    );
  };
  const clearClick = () => {};
  const goClick = () => {};
  const editClick = (id) => {
    AlertModal.show(<UpdateProvider providerID={id}/>,'Update new provider',()=>{},"lg");
  };
  return (
    <>
      <Overview
        title={"Providers Overview"}
        first_icon={<Store />}
        first_title={"Providers"}
        first_subtitle={"2145"}
        first_tooltip="Number of Providers in records."
        second_icon={<Storefront />}
        second_title={"Active Providers"}
        second_subtitle={"2010"}
        second_tooltip="Custoemrs posted tasks."
        third_icon={<Shop />}
        third_title={"Mostly Active"}
        third_subtitle={"Colly Shebert"}
        third_tooltip="Maximum task posted by."
        fourth_icon={<CancelPresentation />}
        fourth_title={"Inactive Providers"}
        fourth_subtitle={"12"}
        fourth_tooltip="Inactive or blocked Providers."
      />
      <GContainer className="p-3">
        <span className="container-title">Manage Providers</span>
        <GCard direction="column" className="p-2">
        
          <DataTable
             pagination={pagination}
             handlepaginationGetter={handlepagination}
             filterQuery={filterQuery}
             sortHandling={handleSort}
             handleSearchChange={handleSearchChange}
            headings={["Customer ID", "Name", "Phone", "Email", "City"]}
            headerComponent={<></>}
            actions={true}
            data={data && data.map((obj, ind) => {
              return [
                obj._id,
                obj.firstname + " " + obj.lastname,
                obj.phone,
                obj.email,
                obj.city,
              ];
            })}
            addButtonText="Add Provider"
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
