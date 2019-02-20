import React, { Component, Fragment } from "react";
import TripsFilters from "./TripsFilters";
import TripCard from "./TripCard";
import StaticSlider from "../sliders/StaticSlider";
import { getTrips } from "../../actions/Trips";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PageLoader from "../Loaders/pageLoader";

class TripsList extends Component {

  state = {
    isLoading: true
  };

  componentDidMount() {
    this.getTrips();
  }

  getTrips = (params) => {
    this.setState({ isLoading: true });
    this.props.getTrips(params).then(() => {
      this.setState({ isLoading: false });
    });
  };

  render() {
    const { trips } = this.props;
    const half = !!trips ? Math.ceil(trips.length / 2) : 0;
    const { isLoading } = this.state;
    if (isLoading || !trips) {
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

              <div className="col-xs-12 col-md-6 col-lg-4">
                {
                  trips && trips
                    .slice(0, half)
                    .map((trip, key) =>
                      <TripCard
                        key={key}
                        trip={trip}
                      />)
                }
              </div>
              <div className="col-xs-12 col-md-6 col-lg-4">
                {
                  trips && trips
                    .slice(half)
                    .map((trip, key) =>
                      <TripCard key={key} trip={trip}/>)
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
    trips: state.trips.list
  };
};

TripsList.propTypes = {
  getTrips: PropTypes.func.isRequired
};


export default connect(initMapStateToProps, {
  getTrips
})(TripsList);