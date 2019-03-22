import React from "react";
import { connect } from "react-redux";
import Select from "react-select";

const CityFilter = ({ cities, onFilter, classes, value }) => (
  <Select
    placeholder={"Please select city"}
    name="type"
    required
    value={value}
    isClearable
    options={(cities || []).map(x => ({ ...x, label: x.cityName, valueKey: 'geonameId', value: x.geonameId }))}
    className="my-select"
    onChange={(selectedOption) => onFilter(selectedOption, "cityId")}
  />
);

export default connect()(CityFilter);