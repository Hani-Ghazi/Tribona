import React from "react";
import Select from "react-select";
import constants from "../../constants";

const getData = (places) => {
  return (places || [])
    .map(x => ({ ...x, label: x.name, valueKey: "placeId", value: x.id }));
};

const getValue = (placeId, places) =>
  placeId ?
    getData(places).find(x => x.id === placeId)
    : undefined;


const PlaceSelector = ({ places, onFilter, classes, value, placeId}) => (
  <Select
    placeholder={"Select Place"}
    name="sort"
    required
    value={value || getValue(placeId, places)}
    options={getData(places)}
    className="my-select"
    onChange={(selectedOption) => onFilter(selectedOption, "placeId")}
  />
);

export default PlaceSelector;