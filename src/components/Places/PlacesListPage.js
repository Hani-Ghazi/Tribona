import React, { Component, Fragment } from "react";
import StaticSlider from "../sliders/StaticSlider";
import PlacesFilter from "./placesFilter";
import PlaceCard from "./PlaceCard";
import { connect } from "react-redux";
import { getPlaces } from "../../actions/Places";


class PlacesListPage extends Component {


  componentDidMount() {
    this.props.getPlaces();
  }

  render() {
    const { places, placesCategories } = this.props;
    return (
      <Fragment>
        <StaticSlider curveImage={require("../../assets/svgs/curve.svg")}/>
        <section id="section3" className="tour-list-sidebar">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 col-lg-3 order-lg-first order-last mt-3 mt-lg-0">
                <PlacesFilter placesCategories={placesCategories}/>
              </div>
              <div className="col-lg-9 col-sm-6 col-xs-12">
                <div className="row">
                  {
                    (places || []).map((place, k) => <PlaceCard key={k} place={place}/>)
                  }
                </div>
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
    places: state.places.list
  };
};

export default connect(initMapStateToProps, { getPlaces })(PlacesListPage);