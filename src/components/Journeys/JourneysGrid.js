import React, { Fragment } from "react";
import JourneyCard from "./JourneyCard";

const JourneysGrid = ({ journeys }) => {
  const half = !!journeys ? Math.ceil(journeys.length / 2) : 0;
  if (journeys && !journeys.length) {
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
          journeys &&
          journeys.slice(0, half)
            .map((journey, key) =>
              <JourneyCard
                key={key}
                journey={journey}/>
            )
        }
      </div>
      <div className="col-xs-12 col-md-6 col-lg-4">
        {
          journeys &&
          journeys.slice(half)
            .map((journey, key) =>
              <JourneyCard
                key={key}
                journey={journey}/>
            )
        }
      </div>
    </Fragment>
  );
};

export default JourneysGrid;