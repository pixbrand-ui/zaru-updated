import React, { useState } from "react";

export default function GDTHeader({ columns, sortFn, ...rest }) {
  const [sortIndex, setSortIndex] = useState(-1);
  return (
    <thead>
      <tr>
        {columns.map((ele, i) => {
          return (
            <td
              className={`${ele.sortable && "gdtSortable curPointer"} ${
                sortIndex === i && "active"
              }`}
              key={i}
              onClick={(e) => {
                if (ele.sortable) {
                  setSortIndex(i);
                  sortFn(ele.sortable);
                }
              }}
            >
              <button
                className={`${ele.sortable && "curPointer"}`}
                onClick={(e) => {
                  if (ele.sortable) {
                    setSortIndex(i);
                    sortFn(ele.sortable);
                  }
                }}
              >
                {ele.name}
              </button>
            </td>
          );
        })}
      </tr>
    </thead>
  );
}
