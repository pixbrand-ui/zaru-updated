import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./DataTable.css";
import * as Icon from "react-bootstrap-icons";
import GContainer from "../GComponents/GContainer";
import GAlign from "../GComponents/GAlign";
import GButton from "../GComponents/GButton";
import GInput from "../GComponents/GInput";
import { Add, Search } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import $ from "jquery";
import Img from "../../Assets/Img/Img";

const DataTable = (props) => {
  const {filterQuery,handleSearchChange,pagination,handlepaginationGetter,sortHandling}= props;

  {
    console.log( "pagee",pagination)
  }
  const [searchText, setSearchChange] = useState("");

  const TableBodyCom = (props) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);

    useEffect(() => {}, [selectedRow]);

    const onCheckChangeInner = (e, data) => {
      let preState = [];
      preState = [...selectedRows];
      if (selectedRows != null) {
        let isexists = false;
        let indexToRemove = 0;
        preState.forEach((element) => {
          if (element[0] === data[0]) {
            isexists = true;
            indexToRemove = preState.indexOf(element);
            return;
          }
        });
        if (!isexists) {
          preState.push(data);
        } else {
          preState.splice(indexToRemove, 1);
        }
        setSelectedRows(preState);
        props.checkCallback(preState);
      }
    };

    const onRadioChangeInner = (e, data) => {
      setSelectedRow(data);
      props.radioCallback(data);
    };

    return (
      <div className="table-responsive">
        <table className="table w-100 datatable_tablecom">
          <thead>
            <tr>
              {/* Render checkbox for select all rows
              {props.enableCheckbox && (
                <th id="datatable-selectall-checkbox" className="datatable-selectall-checkbox-th">
                  <input type="checkbox" />
                </th>
              )} */}
              {props.headings != null &&
              props.headings !== "undefined" &&
              props.headings.length > 0 ? (
                props.headings.map((i, ind) => {
                  return <th onClick={()=>sortHandling(filterQuery && filterQuery.sort_by === -1 ? 1 : -1)} style={{ backgroundImage: `url(${Img.sort_both.default})` }} key={ind}>{i}</th>;
                })
              ) : (
                <></>
              )}

              {props.headings.indexOf("actions") === -1 && props.actions && (
                <th>
                  <div className="datatable-actions-head-cont">Actions</div>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {props.data != null &&
            props.data !== "undefined" &&
            props.data &&
            props.data.length > 0 ? (
              props.data.map((i, ind) => {
                return (
                  <tr
                    id={`datatable_tablerow_${ind}`}
                    key={ind}
                    onClick={(e) => {
                      if (props.enableRadio) {
                        $(
                          `#datatable_tablerow_${ind} :first-child input[type='radio']`
                        ).prop(
                          "checked",
                          !$(
                            `#datatable_tablerow_${ind} :first-child input[type='radio']:checked`
                          ).val()
                        );
                        onRadioChangeInner(e, i);
                      }
                      if (props.enableCheckbox) {
                        $(
                          `#datatable_tablerow_${ind} :first-child input[type='checkbox']`
                        ).prop(
                          "checked",
                          !$(
                            `#datatable_tablerow_${ind} :first-child input[type='checkbox']:checked`
                          ).val()
                        );
                        onCheckChangeInner(e, i);
                      }
                    }}
                  >
                    {i.length < props.headings.length &&
                      props.headings.map((l, lnd) => {
                        if (i[lnd] == null) {
                          i.push("-");
                        }
                        return <div key={lnd}></div>;
                      })}
                    {i.map((k, knd) => {
                      return knd === 0 ? (
                        props.enableRadio || props.enableCheckbox ? (
                          <td key={knd}>
                            {/* Render checkbox for current row */}
                            {props.enableCheckbox && !props.enableRadio && (
                              <span id="datatable-row-checkbox" className="mr8">
                                <input
                                  type="checkbox"
                                  onChange={(e) => {
                                    onCheckChangeInner(e, i);
                                  }}
                                />
                              </span>
                            )}
                            {/* Render radio for current row */}
                            {props.enableRadio && !props.enableCheckbox && (
                              <span id="datatable-row-radio" className="mr8">
                                <input
                                  type="radio"
                                  id="radio"
                                  name="radio"
                                  onChange={(e) => {
                                    onRadioChangeInner(e, i);
                                  }}
                                />
                              </span>
                            )}
                            <Link
                              onClick={(e) => props.onEditClick(i[0])}
                              to={`?reportno=${k}`}
                              className={props.showIdColumn ? "" : "d-none"}
                            >
                              {k}
                            </Link>
                          </td>
                        ) : (
                          <td
                            key={knd}
                            className={props.showIdColumn ? "" : "d-none"}
                          >
                            {/* Render checkbox for current row */}
                            {props.enableCheckbox && !props.enableRadio && (
                              <span id="datatable-row-checkbox" className="mr8">
                                <input
                                  type="checkbox"
                                  onChange={(e) => {
                                    onCheckChangeInner(e, i);
                                  }}
                                />
                              </span>
                            )}
                            {/* Render radio for current row */}
                            {props.enableRadio && !props.enableCheckbox && (
                              <span id="datatable-row-radio" className="mr8">
                                <input
                                  type="radio"
                                  id="radio"
                                  name="radio"
                                  onChange={(e) => {
                                    onRadioChangeInner(e, i);
                                  }}
                                />
                              </span>
                            )}
                            <Link
                              onClick={(e) => props.onEditClick(i[0])}
                              to={`?reportno=${k}`}
                            >
                              {k}
                            </Link>
                          </td>
                        )
                      ) : (
                        <td key={knd}>{k}</td>
                      );
                    })}
                    {props.actions && (
                      <td className="">
                        <div className="datatable-actions-cont d-flex action-buttons">
                          {props.enableview && (
                            <Tooltip title="View Details">
                              <button onClick={(e) => props.onViewClick(i[0])}>
                                <Icon.Eye color="#3b5360" />
                              </button>
                            </Tooltip>
                          )}


                          {props.enableedit && (
                            <Tooltip title="Edit Details">
                              <button onClick={(e) => props.onEditClick(i[0])}>
                                <Icon.Pencil color="green" />
                              </button>
                            </Tooltip>
                          )}
                          {props.enabledelete && (
                            <Tooltip title="Remove Record">
                              <button
                                onClick={(e) => props.onDeleteClick(i[0])}
                              >
                                <Icon.Trash color="red" />
                              </button>
                            </Tooltip>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            ) : (
              <>
                <tr>
                  <td
                    className="text-center"
                    colSpan={
                      props.actions
                        ? props.headings.length + 1
                        : props.headings.length
                    }
                  >
                    No result found.
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const TableFooterCom = () => {
    return (
     
      <GAlign align="center" className="pagination-cont p-2">
        {/* <Tooltip title="First page">
          <button className="first left-button-pad" >
            <span></span>
          </button>
        </Tooltip> */}
      
        <Tooltip title="Previous page" onClick={()=>handlepaginationGetter(pagination.prevPage===null ? 1 : pagination.prevPage )}>
          <button className="prev">
            <span></span>
          </button>
        </Tooltip>
        <Tooltip title="Page Information">
          <button className="text">
            <span>{pagination.currentPage} of {pagination.totalPages}</span>
          </button>
        </Tooltip>
        <Tooltip title="Next page">
          <button className="next" onClick={()=>handlepaginationGetter(pagination.nextPage===null ? 1 : pagination.nextPage)}>
            <span></span>
          </button>
        </Tooltip>
        {/* <Tooltip title="Last page">
          <button className="last right-button-pad">
            <span></span>
          </button>
        </Tooltip> */}
      </GAlign>
    );
  };

  return (
    <>
      <div className="table-responsive">
        {/* <TableHeader
          onSearchClick={props.onSearchClick}
          onClearClick={props.onClearClick}
          onGoClick={props.onGoClick}
          headerComponent={props.headerComponent}
        /> */}

        <GContainer>
          <GAlign align="between">
            <div className="d-flex">
              <GInput
                type="text"
                name="search"
                placeholder="Search here"
                value={filterQuery.search && filterQuery.search}
                onChange={(e) => handleSearchChange(e)}
              />
              <GButton onClick={(e) => props.onSearchClick(filterQuery.search && filterQuery.search)}>
                <span className="d-none d-lg-block">Find</span>
                <span className="d-block d-lg-none">
                  <Search />
                </span>
              </GButton>
            </div>
            {props.showAddButton && (
              <GButton onClick={props.onAddClick}>
                <span className="d-none d-lg-block">{props.addButtonText}</span>
                <span className="d-block d-lg-none">
                  <Add />
                </span>
              </GButton>
            )}
          </GAlign>
        </GContainer>

        <TableBodyCom
          headings={props.headings}
          data={props.data}
          actions={props.actions}
          onEditClick={props.onEditClick}
          onDeleteClick={props.onDeleteClick}
          onViewClick={props.onViewClick}
          showIdColumn={props.showIdColumn}
          enableedit={props.enableEdit}
          enabledelete={props.enableDelete}
          enableview={props.enableView}
          enableCheckbox={props.enableCheckbox}
          enableRadio={props.enableRadio}
          checkCallback={props.onCheckChange}
          radioCallback={props.onRadioChange}
        />
        <TableFooterCom />
      </div>
    </>
  );
};

DataTable.defaultProps = {
  headings: ["sn", "name", "mobile", "email", "actions"],
  data: [],
  onEditClick: () => {},
  onDeleteClick: () => {},
  onViewClick: () => {},
  onAddClick: () => {},
  onCheckChange: () => {},
  onRadioChange: () => {},
  actions: true,
  showIdColumn: true,
  enableEdit: true,
  enableDelete: true,
  enableView: false,
  addButtonText: "Add Item",
  showAddButton: true,
  enableCheckbox: false,
  enableRadio: false,
};

export default DataTable;
