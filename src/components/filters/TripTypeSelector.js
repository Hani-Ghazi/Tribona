import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const { trips: { options } } = require("../../constants");

const getData = (types) => {
  return (types || [])
    .map(x => ({ ...x, valueKey: "value" }));
};

const getValue = (type, types) =>
  type ?
    getData(types).find(x => x.value === type)
    : undefined;

const TripTypeSelector = ({ onFilter, classes, value, type }) => (
  <Select
    placeholder={"Please Select Trip Type"}
    name="tripType"
    required
    value={value || getValue(type, options)}
    options={getData(options)}
    className="my-select"
    onChange={(selectedOption) => onFilter(selectedOption, "type")}
  />
);

TripTypeSelector.propTypes = {
  onFilter: PropTypes.func.isRequired,
  classes: PropTypes.string,
  value: PropTypes.shape({})
};


export default TripTypeSelector;