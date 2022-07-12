import { useEffect, useState } from "react";
import styled from "styled-components";
import GAlign from "./GAlign";




export const StyledTable = styled.table`
  // custom css goes here
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  thead :last-child {
    border-right: none;
  }

  tbody tr:nth-of-type(even) {
    background-color: #e1e5ea70;
  }
`;

export const THead = styled.thead`
  // custom css goes here
  background-color: #e1e5ea90;
  display: flex;
  flex: 1;
  flex-direction: row;
  border-radius: 5px 5px 0px 0px;

  tr {
    display: flex;
    flex: 1;
    flex-direction: row;
    width: 100%;
  }
`;

export const TFoot = styled.tfoot`
  // custom css goes here
`;

export const TBody = styled.tbody`
  // custom css goes here
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  tr :last-child {
    border-right: none;
  }
`;

export const TR = styled.tr`
  // custom css goes here
  cursor: default;
  display: flex;
  flex: 2;
  flex-direction: row;
  width: 100%;

  :hover {
    background-color: #e1e5ea !important;
  }
`;

export const TH = styled.th`
  // custom css goes here
  padding: 15px 8px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  color: #3b5360;
  font-weight: 500;
  font-family: "Roboto";
  display: flex;
  flex: 1;
  cursor: ${(props) =>
    props.sortable !== null && props.sortable ? "pointer" : "default"};

  ::after {
    content: "${(props) =>
      props.sortable !== null && props.sortable ? "\\2191" : ""}";
    display: flex;
    flex: 1;
    width: 100%;
    justify-content: right;
  }
`;

export const TD = styled.td`
  // custom css goes here
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  padding: 8px 8px;
  display: flex;
  flex: 1;
`;
const GDataTable = ({ columns = [], data = [], pagination = true }) => {
  const [initData, setInitData] = useState([]);
  useEffect(() => {
    setInitData(data);
  }, [data]);

  return (
    <>
      <StyledTable>
        <THead>
          <tr>
            {columns && columns.length > 0 ? (
              columns.map((i, ind) => {
                return (
                  <TH sortable={i.sortable} key={ind}>
                    {i.label}
                  </TH>
                );
              })
            ) : (
              <></>
            )}
          </tr>
        </THead>
        <TBody>
          {initData && initData.length > 0 ? (
            initData.map((i, ind) => {
              return (
                <TR key={ind}>
                  {columns.map((j, jnd) => {
                    return <TD key={jnd}>{i[j.selector]}</TD>;
                  })}
                </TR>
              );
            })
          ) : (
            <TR>
              <TD>No data found...</TD>
            </TR>
          )}
        </TBody>
      </StyledTable>
      <GAlign align="between">
        <div style={{ width: "50%" }}>
          <GAlign align="left">a</GAlign>
        </div>
        <div style={{ width: "50%" }}>
          <GAlign align="right">
            <button className="btn-group btn btn-primary">Prev</button>
            <button className="btn btn-primary">Next</button>
          </GAlign>
        </div>
      </GAlign>
    </>
  );
};
export default GDataTable;
