import React from "react";
import _ from "lodash";
import { debounce } from "throttle-debounce";
import { getPlaces, getPlacesCategories } from "../../actions/Places";
import { getCitiesByCountryId } from "../../actions/Country";
import { connect } from "react-redux";
import { CityFilter, CountryFilter, SortFilter } from "../filters";
import { ActionLoader } from "../Loaders";

const { filters: { sort } } = require("../../constants");

class placesFilter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filters: {
        countryId: undefined,
        categoryId: undefined,
        search: "",
        orderBy: ""
      },
      countryId: undefined,
      cityId: undefined,
      orderBy: sort.defaultOption,
      categories: [],
      getPlacesThrottled: debounce(500, this.getPlaces)
    };
  }

  componentDidMount() {
    this.props.getPlacesCategories().then(categories => this.setState({ categories }));
  }

  getPlaces = () => {
    const { filters } = this.state;

    this.props.getPlaces({ filters, pagination: {...this.props.pagination} }).then(() => this.setState({ isUpdating: false }));
  };

  onChange = e => this.setState({
    filters: { ...this.state.filters, [e.target.name]: e.target.value },
    isUpdating: true,
    errors: { ...this.state.errors, [e.target.name]: null }
  }, this.state.getPlacesThrottled);

  onFilter = (value, key) => {
    if (key === "countryId") {
      if (value) {
        this.props.getCitiesByCountryId(value[value.valueKey])
          .then(cities => this.setState({ cities }));
      } else {
        this.setState({ cities: [], cityId: undefined});
      }

    }
    this.setState({
      filters: { ...this.state.filters, [key]: _.get(value, `${(value || {}).valueKey}`, undefined) },
      [key]: value,
      isUpdating: true
    }, this.state.getPlacesThrottled);
  };

  renderCategoriesFilter = () => {
    const { categories, filters: { categoryId } } = this.state;
    return (
      <div className="more-info tags my-4">
        <h6 className="black semibold text-center mx-4 mt-3 mb-3 info-title">Popular Places Categories</h6>
        <div className="text-center px-3 px-lg-2 pb-3 ">
          {
            (categories || [])
              .map((category, k) =>
                <div
                  className={`btn btn-outline-primary px-3  mr-1 mb-1 btn-sm ${category.id === categoryId && "active-category"}`}
                  onClick={(e) => this.onChange({
                    target: {
                      name: "categoryId",
                      value: category.id
                    }
                  })} key={k}
                  role="button">{category.nameEn}</div>
              )
          }
        </div>
      </div>
    );
  };

  render() {
    const { countryId, isUpdating, cities, cityId, filters, orderBy } = this.state;
    return (
      <div className="form-container py-3">
        {
          isUpdating && <ActionLoader/>
        }
        <h4 className="black bold mt-3 px-4 pb-2 text-center">Search your Places</h4>
        <form id="sidebar-form" className="px-4">
          <div className="form-group row">
            <div className="col-sm-12">
              <div className="input-group">
                <input type="text" className="form-control"
                       name="search"
                       onChange={this.onChange}
                       value={filters.search}
                       placeholder="Search Places"/>
                <div className="input-group-append">
                  <div className="input-group-text"><i className="fa fa-search"/></div>
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
          {this.renderCategoriesFilter()}
        </form>
      </div>
    );
  }
}


placesFilter.defaultProps = {
  pagination: {}
};


const initMapStateToProps = state => {
  return {
    countries: state.countries
  };
};

export default connect(initMapStateToProps,
  {
    getPlaces,
    getPlacesCategories,
    getCitiesByCountryId
  })(placesFilter);