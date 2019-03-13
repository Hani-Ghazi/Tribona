import React, { Fragment } from "react";
import TripCard from "./TripCard";

const TripsGrid = ({ trips }) => {
  const half = !!trips ? Math.ceil(trips.length / 2) : 0;
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