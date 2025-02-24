import React from "react";
import TripCard from "./TripCard";


const PopularTrips = ({ trips }) => (
  <section id="section1">
    <div className="content tours-homepage">
      <div className="container">
        <div className="text-center">
          <h3 className="black front bold text-center">Popular Trips to discover and try</h3>
          <div className="separator text-center svgcenter"/>
          <h5 className="primary-color text-center mb-5">Find what trips can suit you</h5>
        </div>
        <div className="row ">
          {
            trips.map((trip, key)=> (
              <div key={key} className="col-xs-12 col-md-6 col-lg-4 mb-4">
                <TripCard trip={trip}/>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  </section>
);

export default PopularTrips;