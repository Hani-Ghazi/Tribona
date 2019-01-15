import React, { Component, Fragment } from "react";
import StaticSlider from "../sliders/StaticSlider";
import PlacesFilter from "./placesFilter";
import PlaceCard from "./PlaceCard";

class PlacesListPage extends Component {

  filter = () => {

  };

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
                    (places || []).map(place => <PlaceCard place={place}/>)
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

export default PlacesListPage;