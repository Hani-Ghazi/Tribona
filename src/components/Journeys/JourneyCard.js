import React from "react";
import { LikeCount, CommentsCount } from "../Partials";
import StarRatings from "react-star-ratings";
import moment from "moment";
import { Link } from "react-router-dom";

const { REACT_APP_PUBLIC_FILES } = process.env;

const JourneyCard = ({ journey }) => (
  <div className="card mb-4">
    <Link className="img-card" to={`/journeys/${journey.id}`}>
      <small className="white front tiny">
        <span className="far fa-clock mr-2 white"/>
        {moment().diff(moment(journey.createdAt), "days")}<br/>days
      </small>
      <div className="review-card">
        <StarRatings
          rating={journey.ratingsAvg || 0}
          starRatedColor="#f2b01e"
          starDimension="15px"
          starSpacing="1px"
        />
        <span className="tiny white p-l-2">
          {journey.commentsCont ? journey.commentsCont : 0} reviews
        </span>
      </div>
      <div className="bottom-tour-background"/>
      <img src={REACT_APP_PUBLIC_FILES + (journey.images[0])} alt={journey.name}/>
    </Link>
    <div className="card-content">
      <div className="row align-items-center">
        <div className="col-8">
          <h6 className="black mb-2">{journey.name}</h6>
          <p>{journey.steps.length} steps</p>
        </div>
        <div className="col-4 align-middle">
          <h6 className="primary-color text-right ">
            <LikeCount count={journey.likesCount}/> <CommentsCount count={journey.commentsCount}/>
          </h6>
        </div>
      </div>
    </div>
  </div>
);

export default JourneyCard;