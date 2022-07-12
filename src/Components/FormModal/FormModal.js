import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import "./FormModal.css";

class FormModal extends Component {
  constructor(props) {
    super(props);
    window.formmodal = this;
    this.state = {
      showmodal: false,
      message: "02",
      title: "",
      isyes: false,
      size: "",
      buttontext: "OK",
      fullscreen: false,
      showCloseButton: true,

      callbackfunc: () => {},
    };
  }

  hide() {
    this.setState({
      showmodal: false,
    });
  }

  show(
    msg,
    title,
    callback,
    size = "xs",
    buttontext = "OK",
    fullscreen = false,
    showCloseButton = true
  ) {
    let res = this.state.isyes;
    this.setState({
      showmodal: true,
      message: msg,
      title: title,
      callbackfunc: callback,
      size: size,
      buttontext: buttontext,
      fullscreen: fullscreen,
      showCloseButton: showCloseButton,
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
    buttontext = "OK",
    fullscreen = false,
    showCloseButton = true
  ) {
    return window.formmodal.show(
      message,
      title,
      callback,
      size,
      buttontext,
      fullscreen,
      showCloseButton
    );
  }

  static hide() {
    window.formmodal.state.callbackfunc();
    return window.formmodal.hide();
  }

  render() {
    return (
      <Modal
        size={this.state.size}
        isOpen={this.state.showmodal}
        toggle={this.state.toggleit}
        centered={true}
        className={`modal-dialog myallrtt ${this.props.className}`}
        backdrop="static"
        keyboard={false}
      >
        {this.state.showCloseButton ? (
          <ModalHeader
            className="header_area_alert"
            charcode="Y"
            toggle={() => this.toggleit()}
          >
            <span className="alertmodal_title"> {this.state.title}</span>
          </ModalHeader>
        ) : (
          <ModalHeader className="header_area_alert">
            <span className="alertmodal_title"> {this.state.title}</span>
          </ModalHeader>
        )}
        <ModalBody className="p-2">{this.state.message}</ModalBody>
      </Modal>
    );
  }
}

export default FormModal;
