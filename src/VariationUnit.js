import React, { Component } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class VariationUnit extends Component {
  /**
   * Expects the following properties:
   * @prop {string} unitID
   * @prop {Array} mss
   * @prop {Object} readings
   * @prop {function} changeHandler
   * @prop {function} unitAdder
   */
  constructor(props) {
    super(props);
    this.changeMss = this.changeMss.bind(this);
    this.changeReading = this.changeReading.bind(this);
    console.log(props);
    this.mssList = this.props.mss.map(ms => ({ value: ms, label: ms }));
  }

  changeMss(myVal, idx) {
    let newReadings = this.props.readings.slice();
    newReadings[parseInt(idx)]['witnesses'] = myVal.map(myObj => myObj['value']);
    this.props.changeHandler(this.props.unitID, this.props.readings);
  }

  changeReading(evt) {
    let newReadings = this.props.readings.slice();
    newReadings[parseInt(evt.target.name)]['reading'] = evt.target.value;
    this.props.changeHandler(this.props.unitID, this.props.readings);
  }

  makeMss(myArray) {
    let myVal = myArray.length >= 1 ?
      myArray.map(ms => ({ value: ms, label: ms })) : null;
    return myVal;
  }

  render() {
    return (
      <div className="form-group col thd-variation-unit-column">
        <h2>{this.props.unitID}</h2>
        <button
          type="button"
          className="btn btn-success"
          value={this.props.unitID}
          onClick={() => this.props.unitAdder(this.props.unitID)}>
          <FontAwesomeIcon icon="plus-circle" />
        </button>
        {this.props.readings.map((reading, i) => (
          <div className="form-row" key={i}>
            <div className="input-group">
            <div className="" key="select_key">
              <Select
                defaultValue={null}
                value={this.makeMss(reading.witnesses)}
                isMulti
                isClearable={false}
                id={"mssSelector-" + this.props.unitID + "-" + i}
                name={i}
                options={this.mssList}
                classNamePrefix="select"
                key={i}
                onChange={val => this.changeMss(val, i)}
              />
            </div>
            <div className="" key="input_key">
              <input
                type="text"
                id={"readingInput-" + this.props.unitID + "-" + i}
                name={i}
                className="form-control"
                key={i}
                value={reading.reading}
                onChange={this.changeReading}
              />
              <div className="input-group-append">
                <button type="button"
                  className="btn btn-danger"
                  value={this.props.unitID}
                  onClick={() => this.props.readingRemover(this.props.unitID, {i})}>
                  <FontAwesomeIcon icon="minus-circle" />
                </button>
              </div>
              </div>
            </div>
          </div>
        ))}
        <button type="button"
          className="btn btn-info"
          value={this.props.unitID}
          onClick={() => this.props.readingAdder(this.props.unitID)}>
          <FontAwesomeIcon icon="plus-circle" />
        </button>
      </div>
    );
  }
}

export default VariationUnit;
