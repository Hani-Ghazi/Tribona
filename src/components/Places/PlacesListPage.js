import React, { Component, Fragment } from "react";
import StaticSlider from "../sliders/StaticSlider";
import PlacesFilter from "./placesFilter";
import PlacesGrid from "./PlacesGrid";
import { connect } from "react-redux";
import { getPlaces } from "../../actions/Places";
import { PageLoader } from "../Loaders";
import { scrollToTop } from "../../utils";


const defaultPlacesFilters = {
  filters: {
    orderBy: "updatedAt_DESC"
  }
};

class PlacesListPage extends Component {

  state = {
    isLoading: true
  };

  componentDidMount() {
    this.props.getPlaces(defaultPlacesFilters).then(() => this.setState({ isLoading: false }, scrollToTop));
  }

  render() {
    const { places, placesCategories } = this.props;
    const { isLoading } = this.state;
    if (isLoading) {
      return <PageLoader/>;
    }
    return (
      <Fragment>
        <StaticSlider curveImage={require("../../assets/svgs/curve.svg")}/>
        <section id="section3" className="tour-list-sidebar">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 col-lg-3 order-lg-first order-last mt-3 mt-lg-0">
                <PlacesFilter placesCategories={placesCategories}/>
              </div>
              <PlacesGrid places={places}/>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

const initMapStateToProps = state => {
  return {
    places: state.places.list
  };
};

export default connect(initMapStateToProps, { getPlaces })(PlacesListPage);