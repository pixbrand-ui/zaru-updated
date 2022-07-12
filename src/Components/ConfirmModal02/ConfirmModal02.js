import React, { Component } from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import "./ConfirmModal02.css";

class ConfirmModal02 extends Component {
  constructor(props) {
    super(props);
    window.confirmmodal02 = this;
    this.state = {
      showmodal: false,
      content: "",
      size: "",
      okcallback: () => {},
      cancelcallback: () => {},
    };
  }

  hide() {
    this.setState({
      showmodal: false,
    });
  }

  show(msg, okCB, cancelCB, size = "xs") {
    let res = this.state.isyes;
    this.setState({
      showmodal: true,
      content: msg,
      okcallback : okCB,
      cancelcallback : cancelCB,
      size: size,
    });
    return res;
  }

  cancelClick() {
      this.state.cancelcallback();
      this.hide();
  }

  okClick(){
    this.state.okcallback();
    this.hide();
  }

  static show(content, okCallback = () => {}, cancelCallback = () => {}, size = "xs") {
    return window.confirmmodal02.show(content, okCallback, cancelCallback, size);
  }

  static hide() {
    return window.confirmmodal02.hide();
  }

  render() {
    return (
      <Modal
        size={this.state.size}
        isOpen={this.state.showmodal}
        toggle={this.state.toggleit}
        centered={true}
        className={`modal-dialog ${this.props.className}`}
        backdrop="static"
        keyboard={false}
      >
        <ModalBody className="p-3">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="p-3 w-100 text-center">{this.state.content}</div>
          </div>
        </ModalBody>
        <ModalFooter>
            <div className="d-flex flex-row justify-content-end align-items-center">
                <button onClick={e => this.cancelClick()} className="confirmmodal02_cancelbutton">Cancel</button>
                <button onClick={e => this.okClick()} className="confirmmodal02_okbutton">Yes</button>
            </div>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ConfirmModal02;
