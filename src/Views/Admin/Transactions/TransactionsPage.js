import React, { useEffect, useState } from "react";
import GContainer from "../../../Components/GComponents/GContainer";
import { ImportExport, Paid } from "@mui/icons-material";
import GCard from "../../../Components/GComponents/GCard";
import DataTable from "../../../Components/DataTable/DataTable";
import Overview from "../Comman/Overview";
import { Receipt } from "react-bootstrap-icons";
import LoadingModal from "../../../Components/LoadingModal/LoadingModal";
import Auth from "../../../Helpers/Auth/Auth";
import API from "../../../Helpers/Constants/Constants";
import HTTP from "../../../Helpers/Api/Api";
import AlertModal from "../../../Components/AlertModal/AlertModal";
import TaskDetails from "../Tasks/TaskDetails";
import AlertModal02 from "../../../Components/AlertModal02/AlertModal02";
import Moment from "react-moment";
import moment from "moment";

export default function TransactionsPage() {
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
        API.transactionlist,
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
    // AlertModal.show(<AddNewCustomer/>,'Add new customer',()=>{},"lg")
  };
  const clearClick = () => {};
  const goClick = (id) => {};
  const editClick = (id) => {
    //AlertModal.show(<UpdateCustomer customerID={id}/>,'Update Customer',()=>{},"lg")
  };

  const dateConvert = (data) => {
    const start = moment().add(-4, "m");
    return <Moment parse="YYYY-MM-DD HH:mm">{data}</Moment>;
  };

  const refreshData = async () => {
    loadData();
  };

  const deleteClick = (id) => {
    AlertModal02.show(
      "Sure to remove it?",
      "Confirm ?",
      () => {
        HTTP.delete(API.transactionDelete + id, false, Auth.getToken()).then(
          (res) => {
            if (res && res.status && res.status.toString() === "200") {
              AlertModal02.show(
                "Removed Successfully.",
                "Removed!",
                refreshData
              );
            }
          }
        );
      },
      "md",
      "Yes"
    );
  };
  return (
    <>
      <Overview
        title={"Transactions Overview"}
        first_icon={<ImportExport />}
        first_title={"Transactions"}
        first_subtitle={"22145"}
        first_tooltip="Number of Transactions in records."
        second_icon={<Receipt />}
        second_title={"Incoives"}
        second_subtitle={"21014"}
        second_tooltip="Number of Invoices created."
        third_icon={<Paid />}
        third_title={"Revenue 30-days"}
        third_subtitle={"$ 4541.00"}
        third_tooltip="Revenue generated in last 30 days."
        fourth_icon={<Paid />}
        fourth_title={"Total Revenue"}
        fourth_subtitle={"$ 12412.00"}
        fourth_tooltip="Total Revenue generated from starting."
      />
      <GContainer className="p-3">
        <span className="container-title">Manage Transactions</span>
        <GCard direction="column" className="p-2">
          <DataTable
            pagination={pagination}
            handlepaginationGetter={handlepagination}
            filterQuery={filterQuery}
            sortHandling={handleSort}
            handleSearchChange={handleSearchChange}
            headings={[
              "ID",
              "Name",
              "Phone",
              "Email",
              "Transaction at:",
              "Created at:",
              "Order Date",
              "Address",
              "Points",
              "Amount",
              "Status",
            ]}
            headerComponent={<></>}
            actions={true}
            data={
              data &&
              data.map((obj, ind) => {
                return [
                  obj._id,
                  obj.name,
                  obj.phone,
                  obj.email,
                  dateConvert(obj.transactionAt),
                  obj.createdAt,
                  obj.orderdate,
                  obj.address,
                  obj.points,
                  obj.amount,
                  obj.status,
                ];
              })
            }
            addButtonText="Add Transaction"
            showAddButton={false}
            enableView={false}
            enableEdit={false}
            enableDelete={true}
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
