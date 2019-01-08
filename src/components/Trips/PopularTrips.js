import React from "react";
import TripCard from "./TripCard";


const PopularTrips = ({ trips }) => (
  <section id="section4">
    <img className="curve3" src={require("../../assets/svgs/curve2.svg")} alt=""/>

    <div className="content tours-homepage">
      <div className="container">
        <div className="text-center">
          <h3 className="black front bold text-center">Popular Trips to discover and try</h3>
          <div className="separator text-center svgcenter"/>
          <h5 className="primary-color text-center mb-5">This are static trips, waiting the real trips
            ullamco culpa </h5>
        </div>
        <div className="row ">
          {
            trips.map(trip => (
              <TripCard trip={trip}/>
            ))
          }
        </div>
      </div>
    </div>
  </section>
);

export default PopularTrips;