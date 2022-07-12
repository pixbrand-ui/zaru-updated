import React, { useEffect, useState } from "react";
import "./CmnInputIncDec.scss";

const CmnInputIncDec = (props) => {
  const [count, setCount] = useState(props.count);

  useEffect(() => {
    if(props.count > 0){
      setCount(props.count);
    }
  }, [props.count]);

  const incVale = () => {
    if (count >= 999) {
      setCount(999);
    } else {
      setCount(count + 1);
    }
    props.callback(count + 1);
  };

  const decVale = () => {
    if (count <= 0) {
      setCount(0);
    } else {
      setCount(count - 1);
    }
    props.callback(count - 1);
  };

  return (
    <div className="incDec d-flex align-items-center position-relative w-50">
      <button className="btnInn inc" onClick={decVale}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="3"
          viewBox="0 0 24 3"
        >
          <path
            id="Icon_feather-minus"
            data-name="Icon feather-minus"
            d="M7.5,18h21"
            transform="translate(-6 -16.5)"
            fill="none"
            stroke="#20272B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
        </svg>
      </button>
      <input
        type="number"
        className={`incInput w-100 ${props.className}`}
        id={props.id}
        name={props.name}
        readOnly
        value={count}
      />
      <button className="btnInn dec" onClick={incVale}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <g
            id="Icon_feather-plus"
            data-name="Icon feather-plus"
            transform="translate(-6 -6)"
          >
            <path
              id="Path_26085"
              data-name="Path 26085"
              d="M18,7.5v21"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
            <path
              id="Path_26086"
              data-name="Path 26086"
              d="M7.5,18h21"
              fill="none"
              stroke="#20272B"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
          </g>
        </svg>
      </button>
    </div>
  );
};

export default CmnInputIncDec;
