import React, { Component } from "react";
import { AutoCompleteInput } from "../Partials";
import { connect } from "react-redux";
import { getJourneys } from "../../actions/Journey";


class JourneysFilters extends Component {
  state = {
    data: {
      countryId: undefined
    },
    categories: []
  };

  getJourneys = () => {
    const { data } = this.state;
    this.props.getJourneys({ filters: data });
  };

  onChange = e => this.setState({
    data: { ...this.state.data, [e.target.name]: e.target.value },
    errors: { ...this.state.errors, [e.target.name]: null }
  }, () => {
    this.getJourneys();
  });

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
              <AutoCompleteInput
                list={this.props.countries} placeholder={"Select Country"} labelKey={"countryName"}
                onChange={e => this.onChange({ target: { name: "countryId", value: e.geonameId } })}/>
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

const initMapStateToProps = state => {
  return { countries: state.countries };
};

export default connect(initMapStateToProps, {
  getJourneys
})(JourneysFilters);