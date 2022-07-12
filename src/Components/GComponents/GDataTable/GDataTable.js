/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./GDataTable.css";
import GDTHeader from "./GDTHeader";

export default function GDataTable({ columns, data }) {
  const [sdata, setData] = useState(data || []);

  const { sortedItems, SortData } = useSortData(sdata);

  useEffect(() => {
    //SortData(true, null);
    setData(data);
  }, [data]);

  return (
    <div>
      <table className="gdtdatatable">
        <GDTHeader columns={columns} sortFn={SortData}></GDTHeader>
        <tbody>
          {sortedItems.map((element, index) => {
            return (
              <tr key={index}>
                {columns.map((e, i) => {
                  return <td key={i}> {e.key(element) ? e.key(element) : "-"} </td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export const useSortData = (data, key) => {
  const [sortAscending, setsortAscending] = useState(null);
  let computedData = React.useMemo(() => {
    let sortableItems = [...data];
    let sortedItems = [];
    sortedItems = sortableItems.sort((a, b) => {
      if (
        sortAscending !== null &&
        sortAscending.key !== undefined &&
        sortAscending.key !== null &&
        sortAscending.key !== ""
      ) {
        if (
          a[sortAscending.key].toString().toLowerCase() <
          b[sortAscending.key].toString().toLowerCase()
        ) {
          return sortAscending.ascending ? -1 : 1;
        }
        if (
          a[sortAscending.key].toString().toLowerCase() >
          b[sortAscending.key].toString().toLowerCase()
        ) {
          return sortAscending.ascending ? 1 : -1;
        }
        return 0;
      } else {
        return -1;
      }
    });
    return sortedItems;
  });

  const SortData = (key) => {
    let directionAscending = true;
    if (
      sortAscending !== null &&
      sortAscending.key === key &&
      sortAscending.ascending === true
    ) {
      directionAscending = false;
    } else if (
      sortAscending !== null &&
      sortAscending.key !== key &&
      sortAscending.ascending === true
    ) {
      directionAscending = false;
    }
    setsortAscending({ ascending: directionAscending, key: key });
  };

  return { sortedItems: computedData, SortData };
};
