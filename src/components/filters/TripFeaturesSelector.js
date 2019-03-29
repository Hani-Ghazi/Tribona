import React from "react";
import { connect } from "react-redux";
import Select, { components } from "react-select";
import PropTypes from "prop-types";

const { REACT_APP_PUBLIC_FILES } = process.env;

const getData = (features) => {
  return (features || [])
    .map(x => ({ ...x, label: x.nameEn, valueKey: "id", value: x.id }));
};

const getValue = (selectedFeatures, features) =>
  selectedFeatures ?
    getData(features).filter(x => selectedFeatures.find(y => x.id === y.id))
    : undefined;


const formatGroupLabel = data => (
  <div>
    <span><img src={REACT_APP_PUBLIC_FILES + data.iconImage} alt=""/></span>
    <span>{data.label}</span>
  </div>
)

const TripFeaturesSelector = ({ features, onFilter, classes, value, selectedFeatures }) => (
  <Select
    placeholder={"Please select Trip Features"}
    closeMenuOnSelect={false}
    name="country"
    isMulti
    value={value || getValue(selectedFeatures, features)}
    isClearable
    formatGroupLabel={formatGroupLabel}
    options={getData(features)}
    className="my-select basic-multi-select"
    onChange={(selectedOption) => onFilter(selectedOption, "features")}
  />
);

TripFeaturesSelector.propTypes = {
  features: PropTypes.array.isRequired,
  onFilter: PropTypes.func.isRequired,
  classes: PropTypes.string,
  value: PropTypes.shape({})
};


export default TripFeaturesSelector;