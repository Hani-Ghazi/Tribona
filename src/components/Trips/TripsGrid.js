import React, { Fragment } from "react";
import TripCard from "./TripCard";

const TripsGrid = ({ trips }) => {
  const half = !!trips ? Math.ceil(trips.length / 2) : 0;
  if (trips && !trips.length) {
    return (
      <div className="col-xs-12 col-md-12 col-lg-8 align-self-center">
        <div className="text-center">
          <h6>There is no data yet</h6>
        </div>
      </div>
    );
  }
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default TripsGrid;