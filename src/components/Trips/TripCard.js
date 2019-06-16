import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { parseDate } from "../../utils";
import { IoIosThumbsUp, IoIosChatbubbles } from "react-icons/io";

const defaultImage = require("../../assets/images/switzerland.jpg");
const { trips: { types } } = require("../../constants");
const { REACT_APP_PUBLIC_FILES } = process.env;

const TripCard = ({ trip }) => (
  <div className="card m-b-30">
    <small className="white front">
      <span className="far fa-clock mr-2 white"/>
      <strong>{parseDate(trip.createdAt)}</strong>
    </small>
    <Link className="img-card" to={`/tours/${trip.id}`}>
      <img src={trip.images.length ? REACT_APP_PUBLIC_FILES + trip.images[0] : defaultImage} alt=""/>
    </Link>
    <div className="card-content">
      {
        types.all.includes(trip.type) &&
        <div>
          <a className="btn btn-primary px-3 btn-sm float-left" href="#" role="button">{types[trip.type]}</a>
        </div>
      }
      <h6 className="primary-color text-right">${trip.price}</h6>
      <h6 className="black"><a href="#" target="_blank">{trip.name}</a></h6>
      <p className="text-truncate">
        {trip.description}
      </p>
      <div className="flex-col-r-m">
        <p>
          {trip.likesCount} <IoIosThumbsUp size="1.5em" color="#1a6bc4"/> {trip.commentsCount} <IoIosChatbubbles
          size="1.5em" color="#1a6bc4"/>
        </p>
      </div>
    </div>
  </div>
);

TripCard.propTypes = {
  trip: PropTypes.shape({
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    capacity: PropTypes.number,
    endDate: PropTypes.string,
    startDate: PropTypes.string,
    type: PropTypes.string.isRequired
  }).isRequired
};


export default TripCard;