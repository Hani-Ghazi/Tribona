import React from "react";
import { connect } from "react-redux";
import Select from "../Partials/Select";

const CountryFilter = ({ countries, onChange, classes}) => (
  <Select onChange={onChange} list={countries || []}
          labelKey={"countryName"} classes={classes} name=""
          valueKey={"geonameId"} placeholder={"Select Country"}/>
);

const initMapStateToProps = state => ({ countries: state.countries });

export default connect(initMapStateToProps)(CountryFilter);