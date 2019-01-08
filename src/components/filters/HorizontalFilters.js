import React, { Component } from "react";
import PropTypes from "prop-types";
import Select from "../Partials/Select";
import utilsApi from "../../api/utils";


class HorizontalFilters extends Component {
  state = {
    countries: [],
    selectedCountry: {}
  };

  componentDidMount() {
    utilsApi.getCountries().then(countries => this.setState({ countries }));
  }

  render() {
    const { countries } = this.state;
    return (
      <section id="section3">
        <div className="container formhome2 text-center justify-content-center align-items-center pb-4">
          <h4 className="black mx-2 mb-3 mt-0 pt-4 text-center bold  d-block">Find the place or the trip that it suits
            you best</h4>
          <form className="form-inline text-center justify-content-center align-items-center pb-0">
            <input type="text" className="form-control-inline2 form-control mb-2 mr-lg-2 mx-md-0 mx-4 py-2"
                   id="inlineFormInputName1" placeholder="Search place or trip"/>
            <span className="fas fa-search iconform"/>
            <Select onChange={(e) => console.log(e.target.value)} list={countries || []}
                    labelKey={"countryName"}
                    valueKey={"geonameId"} placeholder={"Select Country"}/>
            <select className=" mb-2 mr-lg-2 mx-4 mx-md-0 form-control form-control-inline2"
                    id="inlineFormInputName3">
              <option selected>Tour Type</option>
              <option value="1">Adventure</option>
              <option value="2">Romantic</option>
              <option value="3">Vacation</option>
              <option value="3">Explore</option>
            </select>
            <span className="fas fa-chevron-down iconform"/>

            <button type="submit" className="btn btn-primary mb-2 mx-4 mx-md-0 mr-lg-2 py-2 form-control-inline3">Search
            </button>

          </form>
        </div>
      </section>
    );
  }
}

HorizontalFilters.propTypes = {};

export default HorizontalFilters;
