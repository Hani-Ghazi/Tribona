import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const parseDate = (date) => {
  const diff = moment().diff(moment(date));
  const time = moment.duration(diff)._data;
  let temp = "";
  if (time.days) {
    temp += `${time.days} days`;
  }
  if (time.hours) {
    if (temp !== "") temp += ", ";
    temp += `${time.hours} hours`;
  }
  if (time.minutes) {
    if (temp !== "") temp += ", ";
    temp += `${time.minutes} minutes`;
  }
  return `${temp} ago`;
};

const TripCard = ({ trip }) => (
  <div className="card m-b-30">
    <small className="white front">
      <span className="far fa-clock mr-2 white"/>
      <strong>{parseDate(trip.createdAt)}</strong><br/>
    </small>
    <a className="img-card" href="#">
      <img src={require("../../assets/images/switzerland.jpg")} alt=""/>
    </a>
    <div className="card-content">
      <div>
        <a className="btn btn-primary px-3 btn-sm float-left" href="#" role="button">{trip.type}</a>
      </div>
      <h6 className="primary-color text-right">${trip.price}</h6>
      <h6 className="black"><a href="#" target="_blank">{trip.name}</a></h6>
      <p className="">
        {trip.description}
      </p>
    </div>
  </div>
);

TripCard.propTypes = {
  trip: PropTypes.shape({
    description: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequred,
    capacity: PropTypes.number.isRequred,
    endDate: PropTypes.string,
    startDate: PropTypes.string,
    type: PropTypes.string.isRequired
  }).isRequired
};


export default TripCard;