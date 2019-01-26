import React from "react";
import PropTypes from "prop-types";


const Select = ({ list, placeholder, labelKey, valueKey, onChange, selectedValue, classes, name }) => (
  <select className={`form-control form-control-inline2 ${classes}`} id="inlineFormInputName2" value={selectedValue}
          onChange={onChange} name={name}>
    <option value={""}>{placeholder}</option>
    {
      (list || []).map((item, index) =>
        <option key={index} value={item[valueKey]}>{item[labelKey]}</option>
      )
    }
  </select>
);

Select.propTypes = {
  list: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
  labelKey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  valueKey: PropTypes.string.isRequired
};

export default Select;