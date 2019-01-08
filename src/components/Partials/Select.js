import React, { Fragment } from "react";
import PropTypes from "prop-types";


const Select = ({ list, placeholder, labelKey, valueKey, onChange, icon, selectedValue }) => (
  <Fragment>
    <select className="mb-2 mr-lg-2 mx-4 mx-md-0 form-control form-control-inline2" id="inlineFormInputName2"
            onChange={onChange}>
      <option selected={!selectedValue}>{placeholder}</option>
      {
        (list || []).map((item, index) =>
          <option key={index} selected={item === selectedValue} value={item[valueKey]}>{item[labelKey]}</option>
        )
      }
    </select>
    {
      (!!icon) && `${icon}`
    }
  </Fragment>
);

Select.propTypes = {
  list: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
  labelKey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  valueKey: PropTypes.string.isRequired
};

export default Select;