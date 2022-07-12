const CmnButton = (props) => {
  const SemiRoundedButton = (props) => {
    return (
      <>
        <button
          className={`btnTheme text-capitalize radiusFull d-flex align-items-center justify-content-center ${props.props.className}`}
          disabled={props.disabled}
          name={props.props.name}
          data-prev={props.dataprev}
          id={props.props.id}
          onClick={props.props.onClick}
        >
          {props.props.icon !== "" && (
            <span className="mr10"> {props.props.icon} </span>
          )}{" "}
          {props.props.text !== "" && <span> {props.props.text}</span>}
        </button>
      </>
    );
  };
  const SqrButton = (props) => {
    return (
      <>
        <button
          className={`btnTheme text-capitalize d-flex align-items-center justify-content-center  ${props.props.className}`}
          disabled={props.disabled}
          name={props.props.name}
          id={props.props.id}
          onClick={props.props.onClick}
        >
          {props.props.icon && (
            <span className="mr10"> {props.props.icon} </span>
          )}{" "}
          {props.props.text && <span> {props.props.text}</span>}
        </button>
      </>
    );
  };
  const Nobg = (props) => {
    return (
      <>
        <button
          className={`btnBlank d-flex align-items-center colorOrange text-capitalize justify-content-center  ${props.props.className}`}
          disabled={props.disabled}
          name={props.props.name}
          id={props.props.id}
          onClick={props.props.onClick}
        >
          {props.props.icon ? (
            <span className="mr10"> {props.props.icon} </span>
          ) : (
            ""
          )}{" "}
          {props.props.text ? (
            <span>
              {props.props.text}
            </span>
          ) : (
            ""
          )}
        </button>
      </>
    );
  };
  return (
    <>
      {props.type === "semiRounded" && <SemiRoundedButton props={props} />}
      {props.type === "square" && <SqrButton props={props} />}
      {props.type === "noBg" && <Nobg props={props} />}
    </>
  );
};

export default CmnButton;
