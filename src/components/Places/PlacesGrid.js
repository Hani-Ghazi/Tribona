import React, { Fragment } from "react";
import PlaceCard from "./PlaceCard";

const PlacesGrid = ({ places }) => {
  const three = !!places ? Math.ceil(places.length / 3) : 0;
  if (places && !places.length) {
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
      <div className="col-lg-3 col-sm-6 col-xs-12">
        {
          places &&
          places.slice(0, three)
            .map((place, key) =>
              <PlaceCard
                key={key}
                place={place}/>
            )
        }
      </div>
      <div className="col-lg-3 col-sm-6 col-xs-12">
        {
          places &&
          places.slice(three, three * 2)
            .map((place, key) =>
              <PlaceCard
                key={key}
                place={place}/>
            )
        }
      </div>
      <div className="col-lg-3 col-sm-6 col-xs-12">
        {
          places &&
          places.slice(three * 2)
            .map((place, key) =>
              <PlaceCard
                key={key}
                place={place}/>
            )
        }
      </div>
    </Fragment>
  );
};

export default PlacesGrid;