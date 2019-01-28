import React, { Fragment } from "react";
import StarRatings from "react-star-ratings";
import { ProgressBar } from "react-bootstrap";

const DetailedRate = ({ ratingsAvg, ratings }) => (
  <div className="row w-75">
    <div className="align-self-center col text-center">
      <StarRatings
        rating={ratingsAvg || 0}
        starRatedColor="#f2b01e"
        starDimension="30px"
        starSpacing="8px"
      />
      <p>{ratingsAvg ? ratingsAvg : 0} of 5</p>
    </div>
    <div className="col">
      {
        Object.keys(ratings)
          .map((key, index) =>
            <Fragment key={index}><ProgressBar className={"m-b-10"} label={`${!!ratings[index]? ratings[index] + ' Stars': ''}`} bsStyle="warning" bsClass={'goldh'}
                                                           now={(ratings[index]) * 20}/></Fragment>
          )
      }
    </div>
  </div>
);

export default DetailedRate;