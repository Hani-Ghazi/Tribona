import React from "react";
import { connect } from "react-redux";
import Select from "react-select";

const getData = (cities) => {
  return (cities || [])
    .map(x => ({ ...x, label: x.cityName, valueKey: "geonameId", value: x.geonameId }));
};

const getValue = (geonameId, cities) =>
  geonameId ?
    getData(cities).find(x => x.geonameId === geonameId.toString())
    : undefined;

const CityFilter = ({ cities, onFilter, classes, value, geonameId }) => (
  <Select
    placeholder={"Please select city"}
    name="type"
    required
    value={value || getValue(geonameId, cities)}
    isClearable
    options={getData(cities)}
    className="my-select"
    onChange={(selectedOption) => onFilter(selectedOption, "cityId")}
  />
);

export default connect()(CityFilter);