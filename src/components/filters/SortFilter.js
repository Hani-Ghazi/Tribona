import React from "react";
import Select from "react-select";
import constants from "../../constans";

const SortFilter = ({ onFilter, classes, value }) => (
  <Select
    placeholder={"Sort By Your preferences"}
    name="sort"
    required
    value={value}
    options={constants.filters.sort.options}
    className="my-select"
    onChange={(selectedOption) => onFilter(selectedOption, "orderBy")}
  />
);

export default SortFilter;