import React, { Component, Fragment } from "react";
import JourneysFilters from "./JourneysFilters";
import JourneyCard from "./JourneyCard";
import StaticSlider from "../sliders/StaticSlider";
import { getJourneys } from "../../actions/Journey";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class JourneysList extends Component {

  componentDidMount() {
    this.props.getJourneys();
  }


  render() {
    const { journeys } = this.props;
    const half = !!journeys ? Math.ceil(journeys.length / 2) : 0;
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
              <div className="col-xs-12 col-md-6 col-lg-4">
                {
                  journeys && journeys.slice(0, half).map((journey, key) => <JourneyCard key={key} journey={journey}/>)
                }
              </div>
              <div className="col-xs-12 col-md-6 col-lg-4">
                {
                  journeys && journeys.slice(half).map((journey, key) => <JourneyCard key={key} journey={journey}/>)
                }
              </div>
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


export default connect(initMapStateToProps, { getJourneys })(JourneysList);