import React, { Component, Fragment } from "react";
import JourneysFilters from "./JourneysFilters";
import StaticSlider from "../sliders/StaticSlider";
import { getJourneys } from "../../actions/Journey";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ActionLoader from "../Loaders/actionLoader";
import JourneysGrid from "./JourneysGrid";

class JourneysList extends Component {

  state = {
    isUpdating: true
  };


  componentDidMount() {
    this.props.getJourneys().then(() => this.setState({ isUpdating: false }));
  }


  render() {
    const { journeys } = this.props;
    const half = !!journeys ? Math.ceil(journeys.length / 2) : 0;
    const { isUpdating } = this.state;
    return (
      <Fragment>
        <StaticSlider curveImage={require("../../assets/svgs/curve.svg")}/>
        <section id="section3" className="tour-list-sidebar tour-list-sidebar-2-col">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-6  col-lg-3 ml-lg-5 order-lg-first order-last mt-3 mt-lg-0">
                <div className="form-container py-3">
                  <h4 className="black bold mt-3 px-4 pb-2 text-center">Search your Destination</h4>
                  <JourneysFilters/>
                </div>
              </div>
              {
                isUpdating &&
                <div className="col-xs-12 col-md-12 col-lg-8">
                  <ActionLoader/>
                </div>
              } 
              {
                !isUpdating &&
                <JourneysGrid journeys={journeys}/>
              }
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

const initMapStateToProps = state => {
  return {
    journeys: state.journeys.list
  };
};

JourneysList.propTypes = {
  getJourneys: PropTypes.func.isRequired
};


export default connect(initMapStateToProps, {
  getJourneys
})(JourneysList);