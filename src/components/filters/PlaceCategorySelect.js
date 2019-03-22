import React from "react";
import { connect } from "react-redux";
import Select from "react-select";
import PropTypes from "prop-types";

const PlaceCategorySelect = ({ categories, onFilter, classes, value }) => (
  <Select
    placeholder={"Please Select Category"}
    name="category"
    required
    value={value}
    options={(categories || []).map(x => ({ ...x, label: x.nameEn, valueKey: "id", value: x.id }))}
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


export default connect()(PlaceCategorySelect);