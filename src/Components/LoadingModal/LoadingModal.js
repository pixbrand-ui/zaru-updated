import React, { Component } from "react";
import { Modal, ModalBody } from "reactstrap";
import "./LoadingModal.css";

class LoadingModal extends Component {
  constructor(props) {
    super(props);
    window.loadingmodal = this;
    this.state = {
      showmodal: false,
      message: "",
      isyes: false,
      size: "",

      callbackfunc: () => {},
    };
  }

  hide() {
    this.setState({
      showmodal: false,
    });
  }

  show(msg, size = "xs") {
    let res = this.state.isyes;
    this.setState({
      showmodal: true,
      message: msg,
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

  static show(message, size = "xs") {
    return window.loadingmodal.show(message, size);
  }

  static hide() {
    return window.loadingmodal.hide();
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
        <ModalBody className="p-3">
          <div className="row d-flex justify-content-center align-items-center">
            <div
              className="spinner-border loadingmodal_color_spinner"
              role="status"
            >
              {/* <span className="sr-only">Loading...</span> */}
            </div>
            <div className="p-3 text-center">{this.state.message}</div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default LoadingModal;
