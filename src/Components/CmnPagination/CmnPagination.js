import React from 'react';
import CmnButton from '../CmnButton/CmnButton';
import "./CmnPagination.scss";

const CmnPagination = (props) => {
    return (
     
        <div className="d-flex align-items-center flex-wrap justify-content-end pb50">
        <div className="d-flex align-items-center flex-wrap">
          <p className="fs16 colorBlack">Page {props.number} of {props.totalPage}</p>
          <ul className="d-flex align-items-center flex-wrap noUl ml15 pagi">
            <li>
              <CmnButton
                type="noBg"
                icon={      <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 5.591 9.061"
                  >
                    <path
                      id="Path_1130"
                      data-name="Path 1130"
                      d="M22,7.5l-4,4,4,4"
                      transform="translate(-16.939 -6.97)"
                      fill="none"
                      stroke="#161f28"
                      strokeWidth="1.5"
                    />
                  </svg>}
                className="btnTransparentBlack radius4 mr10"
              />
            </li>

            <li className="mr10">
              <CmnButton
                type="noBg"
                text={props.number}
                className="btnTransparentBlack radius4"
              />
            </li>

            <li>
              <CmnButton
                type="noBg"
                icon={  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 5.591 9.061"
                  >
                    <path
                      id="Path_1131"
                      data-name="Path 1131"
                      d="M18,7.5l4,4-4,4"
                      transform="translate(-17.47 -6.97)"
                      fill="none"
                      stroke="#20272B"
                      strokeWidth="1.5"
                    />
                  </svg>}
                className="btnTransparentBlack radius4"
              />
            </li>
          </ul>
        </div>
      </div>
    );
};

export default CmnPagination;