import React, { Fragment } from "react";
import StarRatings from "react-star-ratings";
import { ProgressBar } from "react-bootstrap";

const DetailedRate = ({ ratingsAvg, ratings }) => (
  <div className="row w-75">
    <div className="align-self-center col text-center">
      <StarRatings
        rating={ratingsAvg || 0}
        starRatedColor="#f2b01e"
        starDimension="40px"
        starSpacing="8px"
      />
      <p>{ratingsAvg ? ratingsAvg : 0} of 5</p>
    </div>
    <div className="col">
      {
        Object.keys(ratings)
          .map((key, index) =>
            <Fragment key={index}><ProgressBar className={"m-b-10"} label={`${key} Stars`} bsStyle="warning"
                                                           now={(index+1) * 20}/></Fragment>
          )
      }
    </div>
  </div>
);

export default DetailedRate;