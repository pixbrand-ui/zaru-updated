/* eslint-disable react-hooks/exhaustive-deps */
import React, { Component } from "react";
import "./CmnRadioBorderQue.scss";

class CmnRadioBorderQueClass extends Component {

  handleChange = (e) => {
    this.props.callback(
      this.props.label,
      this.props.questionDataid,
      this.props.index
    );
  };
  render() {
    return (
      <div className="cmnRadioQue mb20">
        <input
          type="radio"
          id={this.props.id}
          data-id={this.props.questionDataid}
          name={this.props.name}
          className={this.props.className}
          value={this.props.label}
          checked={this.props.checked}
          onChange={this.handleChange}
        />
        <label htmlFor={this.props.id} className="bRadio">
          {this.props.label}
        </label>
      </div>
    );
  }
}

export default CmnRadioBorderQueClass;
