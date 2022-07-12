import React, { Component } from "react";
import {Modal, ModalBody, ModalHeader } from "reactstrap";
import "./CmnMegaMenu.scss";

class CmnMegaMenu extends Component {
  constructor(props) {
    super(props);
    window.CmnMegaMenu0111 = this;
    this.state = {
      showmodal: false,
      message: "02",
      title: "",
      isyes: false,
      size: "",
      fullScreen: false,

      callbackfunc: () => {},
    };
  }

  hide() {
    this.setState({
      showmodal: false,
    });
  }

  show(msg, title, callback, size = "xs", fullScreen = false) {
    let res = this.state.isyes;
    this.setState({
      showmodal: true,
      message: msg,
      title: title,
      callbackfunc: callback,
      fullScreen: fullScreen,
      size: size,
    });
    return res;
  }
  toggleit() {
    this.setState({ showmodal: false });
  }

  onclickyes() {
    this.setState({ isyes: true, showmodal: false });
    this.state.callbackfunc();
  }
  setmessage(message) {
    this.setState({ message: message });
  }
  setcallback(callback) {
    this.setState({ callbackfunc: callback });
  }

  static show(
    message,
    title = "",
    callback = () => {},
    size = "xs",
    fullScreen = false
  ) {
    return window.CmnMegaMenu0111.show(
      message,
      title,
      callback,
      size,
      fullScreen
    );
  }

  static hide() {
    return window.CmnMegaMenu0111.hide();
  }

  render() {
    return (
      <>
        <style jsx="true">
          {`
            .modal-fullscreen .btn-close,
            .modal-fullscreen .modal-footer button {
              position: relative;
              right: 22px;
              top: 3px;
            }
          `}
        </style>
        <Modal
          size={this.state.size}
          isOpen={this.state.showmodal}
          toggle={(e) => {
            this.setState({ showmodal: false });
          }}
          centered={true}
          className={`modal-dialog megaMenuModal  myallrtt ${this.props.className}`}
          fullscreen={this.state.fullScreen}
          backdrop={true}
          backdropClassName="cmnMegabackdrop"
        >
          <ModalHeader
            className="header_area_alert bBnone"
            charCode="&#x2715;"
            toggle={(e) => {
              this.setState({ showmodal: false });
            }}
          >
            {this.state.title && (
              <h1
                style={{ color: "#000" }}
                className="fBold fs24 mb0 text-capitalize"
              >
                {this.state.title}
              </h1>
            )}
          </ModalHeader>
          <ModalBody className="p-3">{this.state.message}</ModalBody>
          {/* <ModalFooter>
            <Button
              size="sm"
              style={{
                backgroundColor: "#EC7523",
                color: "white",
                fontFamily: "Arial",
                padding: "5px 25px",
                border: "none",
              }}
              onClick={() => this.onclickyes()}
            >
              Ok
            </Button>
          </ModalFooter> */}
        </Modal>
      </>
    );
  }
}

export default CmnMegaMenu;
