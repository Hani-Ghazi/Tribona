import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";


const getData = (categories) => {
  return (categories || [])
    .map(x => ({ ...x, label: x.nameEn, valueKey: "id", value: x.id }));
};

const getValue = (categoryId, categories) =>
  categoryId ?
    getData(categories).find(x => x.id === categoryId)
    : undefined;

const PlaceCategorySelect = ({ categories, onFilter, classes, value, categoryId }) => (
  <Select
    placeholder={"Please Select Category"}
    name="category"
    required
    value={value || getValue(categoryId, categories)}
    options={getData(categories)}
    className="my-select"
    onChange={(selectedOption) => onFilter(selectedOption, "categoryId")}
  />
);

PlaceCategorySelect.propTypes = {
  categories: PropTypes.array.isRequired,
  onFilter: PropTypes.func.isRequired,
  classes: PropTypes.string,
  value: PropTypes.shape({})
};


export default PlaceCategorySelect;