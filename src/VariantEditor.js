import React, { Component } from "react";
import VariationUnit from "./VariationUnit.js";

/**
* A React UI component for editing variant readings in a critical text.
*/
class VariantEditor extends Component {
  /**
   * Constructor method for the VariantEditor React component.
   * Expects the following properties:
   * @prop {Array} mss An Array of strings, each of which is the label for one
   *     witness that may attest text for the current document. The Array
   *     should contain all of the available witnesses.
   * @prop {Object} units An object representing the variation units (or TEI
   *     App elements) to be loaded for editing. The keys are the unique
   *     numbers (as a string) assigned to the variation units. The value for
   *     each key is an Array listing the attested readings for the
   *     corresponding unit.
   */
  constructor(props) {
    super(props);
    this.state = {
      currentUnit: null,
      units: this.props.units
    };
    this.handleChange = this.handleChange.bind(this);
    this.addUnit = this.addUnit.bind(this);
    // send correct "this" with function to children
  }

  /**
   * Handles changes to the content of form fields in the component.
   * @param {string} unitID the unique number (as string) of the variation
   *     unit (or App element in TEI xml) that has been updated.
   * @param {Array} newReadings the updated data to be used in updating the
   *     component state. This is an Array of obects, each of which represents
   *     one variant reading for the unit.  Each object in the Array has the
   *     keys "witnesses" and "reading".
   */
  handleChange(unitID, newReadings) {
    let mydata = Object.assign({}, this.state.units);
    mydata[unitID] = newReadings;
    this.setState({units: mydata});
  }

  /**
   * Inserts a new variation unit into the sequence and updates the sequential
   * id numbers of the loaded units.
   * @param {string} refUnitID unit id number (as string) of the unit after
   *     which the new unit should be inserted.
   */
  addUnit(refUnitID) {
    let mydata = JSON.parse(JSON.stringify(this.state.units));
    let oldkeys = Object.keys(this.state.units);
    mydata[parseInt(refUnitID) + 1] = [{witnesses: [], reading: ""}];
    let latterkeys = oldkeys.filter(mykey => (
                                      parseInt(mykey) > parseInt(refUnitID)
                                    ))
                      .map(mykey => parseInt(mykey) + 1);
    console.log(latterkeys);
    latterkeys.forEach(key => {
        mydata[key] = this.state.units[parseInt(key) - 1];
      }
    );
    console.log(mydata);
    this.setState({units: mydata});
  }

  /**
   * Returns an Array of strings containing the readings attested in a single
   * witness (in order).
   * @param {string} the label of the witness whose readings are to be
   *     collected
   * @return {Array} an Array of strings
   */
  filterReadings(myMs) {
    return Object.keys(this.state.units).map(myUnitID => {
        let myString = this.state.units[myUnitID]
                      .filter(item => item["witnesses"].includes(myMs)
                      )[0]
        if (myString === undefined) {
          return null;
        } else {
          return myString['reading'];
        }
    });
  }

  /**
   * Renders the React VariantEditor component.
   */
  render() {
    return (
      <div className="container-fluid">
        <form className="form">
          <div className="thd-variant-editor-slider">
            {Object.keys(this.state.units).map(mykey => (
                <VariationUnit
                  unitID={mykey}
                  mss={this.props.mss}
                  readings={this.state.units[mykey]}
                  key={mykey}
                  changeHandler={this.handleChange}
                  unitAdder={this.addUnit}
                />
            ))}
          </div>
        </form>
        <div className="row">
          <table className="table">
            <tbody>
            {this.props.mss.map((myMs, idx) => (
              <tr key={idx}>
                  <td>{myMs}</td>
                  <td>{this.filterReadings(myMs).map((item, index) =>
                    (<span className="reading-text" key={index}>
                      <span className="divider"> [</span>
                      {item}
                      <span className="divider">] </span>
                    </span>)
                  )}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <div className="row">
          <p>
            {JSON.stringify(this.state.units, null, 2)}
          </p>
        </div>
      </div>
    );
  }
}

export default VariantEditor;
