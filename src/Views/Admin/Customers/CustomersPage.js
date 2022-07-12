import React, { useEffect, useState } from "react";
import GContainer from "../../../Components/GComponents/GContainer";
import { AccountBox, People, Person, PersonOff } from "@mui/icons-material";
import GCard from "../../../Components/GComponents/GCard";
import DataTable from "../../../Components/DataTable/DataTable";
import Overview from "../Comman/Overview";
import { Helmet } from "react-helmet";
import API from "../../../Helpers/Constants/Constants";
import HTTP from "../../../Helpers/Api/Api";
import Auth from "../../../Helpers/Auth/Auth";
import LoadingModal from "../../../Components/LoadingModal/LoadingModal";
import AlertModal from "../../../Components/AlertModal/AlertModal";
import CustomerDetails from "./CustomerDetails";
import AlertModal02 from "../../../Components/AlertModal02/AlertModal02";
import AddNewCustomer from "./AddNewCustomer";
import UpdateCustomer from "./UpdateCustomer";

export default function CustomersPage() {
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
    AlertModal.show(<CustomerDetails customerID={evt}/>,"Customer Details",()=>{},"lg",false);
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
        API.adminCustomerlist,
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
    AlertModal.show(<AddNewCustomer/>,'Add new customer',()=>{},"lg")
  };
  const clearClick = () => {};
  const goClick = () => {};
  const editClick = (id) => {
    AlertModal.show(<UpdateCustomer customerID={id}/>,'Update Customer',()=>{},"lg")
  };

  const refreshData = () => {
    loadData().then((res) => {
      setData(res);
    });
  };
  const deleteClick = (id) => {
    AlertModal02.show(
      "Sure to remove it?",
      "Confirm ?",
      () => {
        HTTP.delete(API.delCat + id, false,Auth.getToken()).then((res) => {
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
      <Helmet>
        <meta charSet="utf-8" />
        <title>Customer | Zaaruu</title>
        <link rel="canonical" href="" />
      </Helmet>
      <Overview
        title={"Customers Overview"}
        first_icon={<Person />}
        first_title={"Customers"}
        first_subtitle={"3214"}
        first_tooltip="Number of customers in records."
        second_icon={<People />}
        second_title={"Active Customers"}
        second_subtitle={"1452"}
        second_tooltip="Custoemrs posted tasks."
        third_icon={<AccountBox />}
        third_title={"Mostly Active"}
        third_subtitle={"Harry Watson"}
        third_tooltip="Maximum task posted by."
        fourth_icon={<PersonOff />}
        fourth_title={"Inactive Customers"}
        fourth_subtitle={"147"}
        fourth_tooltip="Inactive or blocked customers."
      />
      <GContainer className="p-3">
        <span className="container-title">Manage Customers</span>
        <GCard direction="column" className="p-2">
          <DataTable
            pagination={pagination}
            handlepaginationGetter={handlepagination}
            filterQuery={filterQuery}
            sortHandling={handleSort}
            handleSearchChange={handleSearchChange}
            headings={["Customer ID", "Customer", "Phone", "Email", "Status"]}
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
            onViewClick={onViewClickEvt}
            addButtonText="Add Customer"
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
