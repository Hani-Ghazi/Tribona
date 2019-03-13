import React, { Fragment } from "react";
import JourneyCard from "./JourneyCard";

const JourneysGrid = ({ journeys }) => {
  const half = !!journeys ? Math.ceil(journeys.length / 2) : 0;
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