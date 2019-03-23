import React, { Component } from "react";
import _ from "lodash";
import { debounce } from "throttle-debounce";
import PropTypes from "prop-types";
import { CityFilter, CountryFilter, SortFilter } from "../filters";
import { connect } from "react-redux";
import { getTrips } from "../../actions/Trips";
import { getCitiesByCountryId } from "../../actions/Country";
import { ActionLoader } from "../Loaders";

const { filters: { sort } } = require("../../constans");


class TripsFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        countryId: undefined,
        cityId: undefined,
        search: "",
        orderBy: ""
      },
      countryId: undefined,
      cityId: undefined,
      orderBy: sort.defaultOption,
      getTripsThrottled: debounce(500, this.getTrips)
    };
  }

  getTrips = () => {
    const { filters } = this.state;
    this.props.getTrips({ filters })
      .then(() => this.setState({ isUpdating: false }));
  };

  onChange = e => this.setState({
    filters: { ...this.state.filters, [e.target.name]: e.target.value },
    isUpdating: true,
    errors: { ...this.state.errors, [e.target.name]: null }
  }, this.state.getTripsThrottled);

  onFilter = (value, key) => {
    if (key === "countryId") {
      if (value) {
        this.props.getCitiesByCountryId(value[value.valueKey])
          .then(cities => this.setState({ cities }));
      } else {
        this.setState({ cities: [], cityId: undefined });
      }
    }
    this.setState({
      filters: { ...this.state.filters, [key]: _.get(value, `${(value || {}).valueKey}`, undefined) },
      [key]: value,
      isUpdating: true
    }, this.state.getTripsThrottled);
  };

  render() {
    const { countryId, isUpdating, cities, cityId, filters, orderBy } = this.state;
    return (
      <form id="sidebar-form" className="px-xl-5 px-lg-3 px-4">
        {
          isUpdating && <ActionLoader/>
        }
        <div className="form-group row">
          <div className="col-sm-12">
            <div className="input-group">
              <input type="text" className="form-control"
                     name="search"
                     onChange={this.onChange}
                     value={filters.search}
                     placeholder="Search Places"/>
              <div className="input-group-append">
                <div className="input-group-text"><i className="fa fa-search"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-12">
            <CountryFilter onFilter={this.onFilter} value={countryId}/>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-12">
            <CityFilter cities={cities} onFilter={this.onFilter} value={cityId}/>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-12">
            <SortFilter onFilter={this.onFilter} value={orderBy}/>
          </div>
        </div>
      </form>
    );
  }
}

const initMapStateToProps = state => {
  return { countries: state.countries };
};

TripsFilters.propTypes = {
  getTrips: PropTypes.func.isRequired,
  getCitiesByCountryId: PropTypes.func.isRequired
};


export default connect(initMapStateToProps, {
  getTrips,
  getCitiesByCountryId
})(TripsFilters);