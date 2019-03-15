import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import PlacesGrid from "./PlacesGrid";

class PopularPlaces extends Component {

  render() {
    const { places } = this.props;

    return (
      <section id="section4">
        <img className="curve3" src={require("../../assets/svgs/curve2.svg")} alt=""/>
        <div className="container">
          <h2 className="black front">Popular Places</h2>
          <div className="row mb-5">
            <div className="col-sm-9 front">
              <div className="separator"/>
              <h5 className="primary-color section-title ">Find the one that suits you best!</h5>
            </div>
            <div className="col-sm-3 front my-auto">
              <Link className="btn btn-primary mt-2 px-5 py-2" to={"/places"}>more places</Link>
            </div>
          </div>

        </div>
        <div className="container destination-section">
          <div className="row">
            {
              places && <PlacesGrid places={places} classes={"col-lg-4"}/>
            }
          </div>
        </div>
      </section>
    );
  }
}

PopularPlaces.propTypes = {
  places: PropTypes.array.isRequired
};

export default PopularPlaces;