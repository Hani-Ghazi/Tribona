import React, { Component, Fragment } from "react";
import TripsFilters from "./TripsFilters";
import TripsGrid from "./TripsGrid";
import StaticSlider from "../sliders/StaticSlider";
import { getTrips } from "../../actions/Trips";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { PageLoader } from "../Loaders";
import { scrollToTop } from "../../utils";

class TripsList extends Component {

  state = {
    isLoading: true
  };

  componentDidMount() {
    this.props.getTrips().then(() => this.setState({ isLoading: false }, scrollToTop));
  }

  getTrips = (filters = {}) => {
    this.props.getTrips(filters).then(() => this.setState({ isLoading: false }, scrollToTop));
  }


  render() {
    const { trips } = this.props;
    const { isLoading } = this.state;
    if (isLoading) {
      return <PageLoader/>;
    }
    return (
      <Fragment>
        <StaticSlider curveImage={require("../../assets/svgs/curve.svg")}/>
        <section id="section3" className="tour-list-sidebar tour-list-sidebar-2-col">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-6  col-lg-3 ml-lg-5 order-lg-first order-last mt-3 mt-lg-0">
                <div className="form-container py-3">
                  <h4 className="black bold mt-3 px-4 pb-2 text-center">Search for what suits you</h4>
                  <TripsFilters getTrips={this.getTrips}/>
                </div>
              </div>
              <TripsGrid trips={trips}/>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

const initMapStateToProps = state => {
  return {
    trips: state.trips.list
  };
};

TripsList.propTypes = {
  getTrips: PropTypes.func.isRequired
};


export default connect(initMapStateToProps, {
  getTrips
})(TripsList);