import React, { useState } from "react";
import "./CmnFileUploadFile.scss";

const CmnFileUploadFile = (props) => {
  const [uploadedFileOnly, setuploadedFileOnly] = useState([]);

  const FileUpload = (e) => {
    let dataarray = uploadedFileOnly;
    for (let i = 0; i < e.target.files.length; i++) {
      dataarray.push({
        bloburl: URL.createObjectURL(e.target.files[i]),
        file: e.target.files[i],
        id: i,
      });
    }
    let updatedarray = [];
    for (let u = 0; u < dataarray.length; u++) {
      dataarray[u].id = u;
      updatedarray.push(dataarray[u]);
    }

    //to send state to another fle where this component is calling
    props.callback(updatedarray);

    setuploadedFileOnly(updatedarray);
  };

  const deleteUploadedImg = (e) => {
    let initData = [];
    initData = [...uploadedFileOnly];
    initData.splice(e, 1);
    setuploadedFileOnly(initData);
  };

  return (
    <>
    <div>
    <label
        htmlFor={props.id}
        className="CmnFileUploadFile radius d-flex align-items-center pl20 pr20 pt8 pb8"
      >
        <span className="mr10">
          <svg
            style={{ marginTop: -3 + "px" }}
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 17.5 17.5"
          >
            <g
              id="Icon_feather-upload"
              data-name="Icon feather-upload"
              transform="translate(-3.75 -3.75)"
            >
              <path
                id="Path_26034"
                data-name="Path 26034"
                d="M20.5,22.5v3.556a1.778,1.778,0,0,1-1.778,1.778H6.278A1.778,1.778,0,0,1,4.5,26.056V22.5"
                transform="translate(0 -7.333)"
                fill="none"
                stroke="#ec7523"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
              <path
                id="Path_26035"
                data-name="Path 26035"
                d="M19.389,8.944,14.944,4.5,10.5,8.944"
                transform="translate(-2.444)"
                fill="none"
                stroke="#ec7523"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
              <path
                id="Path_26036"
                data-name="Path 26036"
                d="M18,4.5V15.167"
                transform="translate(-5.5)"
                fill="none"
                stroke="#ec7523"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </g>
          </svg>
        </span>

        <span className="colorOrange fs17"> {props.label ? props.label : "Upload"}</span>

        <input
          type="file"
          name={props.name}
          onChange={(e) => FileUpload(e)}
          className={`d-none ${props.className}`}
          id={props.id}
        />
      </label>
    </div>
   

      {uploadedFileOnly.map((obj, ind) => {
        return (
          <div
            key={ind}
            className="d-flex align-items-center flex-wrap justify-content-between  borFileUpl mt5 mb8 radius4"
          >
            <div className="colorPara fs16">{obj.file.name}</div>
            <div>
              <button
                className="btn_delete_iconFile radius100"
                onClick={(e) => deleteUploadedImg(ind)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13.426"
                  height="13.423"
                  viewBox="0 0 13.426 13.423"
                >
                  <path
                    id="Icon_ionic-ios-close"
                    data-name="Icon ionic-ios-close"
                    d="M19.589,18l4.8-4.8A1.124,1.124,0,0,0,22.8,11.616l-4.8,4.8-4.8-4.8A1.124,1.124,0,1,0,11.616,13.2l4.8,4.8-4.8,4.8A1.124,1.124,0,0,0,13.2,24.384l4.8-4.8,4.8,4.8A1.124,1.124,0,1,0,24.384,22.8Z"
                    transform="translate(-11.285 -11.289)"
                    fill="#545454"
                  />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CmnFileUploadFile;
