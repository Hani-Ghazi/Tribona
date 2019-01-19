import React, { Component } from "react";
import CountryFilter from "../filters/CountryFilter";

class JourneysFilters extends Component {
  render() {
    return (
      <form id="sidebar-form" className="px-xl-5 px-lg-3 px-4">
        <div className="form-group row">
          <div className="col-sm-12">
            <div className="input-group">
              <input type="email" className="form-control" id="inputEmail3" placeholder="Search Tours"/>
              <div className="input-group-append">
                <div className="input-group-text"><i className="fa fa-search"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-12">
            <div className="input-group">
              <CountryFilter/>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-12">
            <button type="submit" className="btn col-sm-12 my-2 btn-primary">Search</button>
          </div>
        </div>
      </form>
    );
  }
}

export default JourneysFilters;