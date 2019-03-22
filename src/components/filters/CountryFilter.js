import React from "react";
import { connect } from "react-redux";
import Select, { components } from "react-select";
import PropTypes from "prop-types";

const { REACT_APP_PUBLIC_FILES } = process.env;

const CustomOption = ({ isDisabled, innerProps, data }) =>
  !isDisabled ? (
    <div {...innerProps}>
      <span className="p-l-10 pointer">
        <img className="p-r-10" src={REACT_APP_PUBLIC_FILES + `flags/${data.countryCode}.png`} alt={data.countryCode}/>
        {data.label}
      </span>
    </div>
  ) : null;

const SingleValue = ({ children, ...props }) => (
  <components.SingleValue {...props}>
    <span className="text-truncate pointer truncate-select-parent">
        <img className="p-r-10" src={REACT_APP_PUBLIC_FILES + `flags/${props.data.countryCode}.png`}
             alt={props.data.countryCode}/>
      {props.data.label}
      </span>
  </components.SingleValue>
);

const CountryFilter = ({ countries, onFilter, classes, value }) => (
  <Select
    placeholder={"Please select country"}
    name="country"
    required
    value={value}
    styles={{
      SingleValue: (base) => (console.log({ base }) && {
        ...base,
        padding: 5,
        courser: "pointer",
        borderRadius: 5,
        color: "white",
        display: "flex"
      })
    }}
    isClearable
    options={(countries || []).map(x => ({ ...x, label: x.countryName, valueKey: "geonameId", value: x.geonameId }))}
    className="my-select"
    components={{ Option: CustomOption, SingleValue }}
    onChange={(selectedOption) => onFilter(selectedOption, "countryId")}
  />
);

CountryFilter.propTypes = {
  countries: PropTypes.array.isRequired,
  onFilter: PropTypes.func.isRequired,
  classes: PropTypes.string,
  value: PropTypes.shape({})
};


const initMapStateToProps = state => ({ countries: state.countries });

export default connect(initMapStateToProps)(CountryFilter);