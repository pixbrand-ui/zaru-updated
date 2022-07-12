import React, { useState } from "react";
import { Col, Row } from "reactstrap";
import AlertModal from "../AlertModal/AlertModal";
import "./CmnFileUpload.scss";

const CmnFileUpload = (props) => {
  const [uploadedFile, setUploadedFile] = useState([]);

  const FileUpload = (e) => {
    let dataarray = uploadedFile;
    if (dataarray.length < 5) {
      // check file size
      if (e.target.files[0].size <= 2000000) {
        for (let i = 0; i < e.target.files.length; i++) {
          dataarray.push({
            bloburl: URL.createObjectURL(e.target.files[i]),
            file: e.target.files[i],
            id: i,
          });
          // console.log(i)
        }
        //console.log("aa: ",dataarray);
        let updatedarray = [];
        for (let u = 0; u < dataarray.length; u++) {
          dataarray[u].id = u;
          updatedarray.push(dataarray[u]);
        }
        props.callback(updatedarray);
        setUploadedFile(updatedarray);
      } else {
        AlertModal.show("Max 2MB image size allowed.", "Oops!");
      }
    } else {
      AlertModal.show("Only 05 images are allowed.", "Oops!");
    }

    //console.log("file: ",uploadedFile);
  };

  const deleteUploadedImg = (e) => {
    let initData = [];
    initData = [...uploadedFile];
    initData.splice(e, 1);
    setUploadedFile(initData);
  };

  return (
    <>
      <label htmlFor={props.id} className="cmnFileUpload radius mb30">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="39.527"
            height="39.527"
            viewBox="0 0 39.527 39.527"
          >
            <g
              id="Group_54125"
              data-name="Group 54125"
              transform="translate(1184.368 -1949.26) rotate(45)"
            >
              <line
                id="Line_654"
                data-name="Line 654"
                x2="23.707"
                y2="23.707"
                transform="translate(556.956 2203.956)"
                fill="none"
                stroke="#ec7523"
                strokeLinecap="round"
                strokeWidth="3"
              />
              <line
                id="Line_655"
                data-name="Line 655"
                x1="23.707"
                y2="23.707"
                transform="translate(556.956 2203.956)"
                fill="none"
                stroke="#ec7523"
                strokeLinecap="round"
                strokeWidth="3"
              />
            </g>
          </svg>
        </span>
        <input
          type="file"
          name={props.name}
          onChange={(e) => FileUpload(e)}
          className={`d-none ${props.className}`}
          id={props.id}
          accept="image/*"
        />
      </label>

      <Row className="images_container_upload row gy-3">
        {uploadedFile.map((obj, ind) => {
          return (
            <Col lg={3} md={3} xs={6}>
              <div className="d-flex img_alignn afterLoad position-relative">
                <img
                  className="w-100 radius4"
                  id={ind}
                  src={obj.bloburl}
                  alt=""
                />
                <button
                  className="btn_delete_icon radius100"
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
                      fill="#fff"
                    />
                  </svg>
                </button>
              </div>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default CmnFileUpload;
