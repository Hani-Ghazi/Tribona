import React, { Fragment, Component } from "react";
import StaticSlider from "../sliders/StaticSlider";
import HorizontalFilters from "../filters/HorizontalFilters";
import PopularTrips from "../Trips/PopularTrips";
import PopularPlaces from "../Places/PopularPlaces";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { finishedLoading } from "../../actions/Loaders";


const trips = [{
  img: require("../../assets/images/costarica.jpg"),
  title: "Costa Rica"
}, {
  img: require("../../assets/images/costarica.jpg"),
  title: "Costa Rica"
}, {
  img: require("../../assets/images/costarica.jpg"),
  title: "Costa Rica"
}, {
  img: require("../../assets/images/costarica.jpg"),
  title: "Costa Rica"
}];

class HomePage extends Component {
  componentDidMount() {
    this.props.finishedLoading();
  }

  render() {
    const { popularPlaces, popularTrips } = this.props;
    return (
      <Fragment>
        <StaticSlider curveImage={require("../../assets/svgs/curve.svg")}/>
        {/*<HorizontalFilters/>*/}
        <PopularTrips trips={popularTrips || []}/>
        <PopularPlaces places={popularPlaces || []}/>
      </Fragment>
    );
  }
}


HomePage.propTypes = {
  places: PropTypes.string
};

const initMapStateToProps = state => {
  return { popularPlaces: state.places.popular, popularTrips: state.trips.popular };
};

export default connect(initMapStateToProps, { finishedLoading })(HomePage);