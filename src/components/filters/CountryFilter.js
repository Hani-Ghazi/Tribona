import React from "react";
import { connect } from "react-redux";
import Select from "../Partials/Select";

const CountryFilter = ({ countries, classes}) => (
  <Select onChange={(e) => console.log(e.target.value)} list={countries || []}
          labelKey={"countryName"} classes={classes}
          valueKey={"geonameId"} placeholder={"Select Country"}/>
);

const initMapStateToProps = state => ({ countries: state.countries });

export default connect(initMapStateToProps)(CountryFilter);