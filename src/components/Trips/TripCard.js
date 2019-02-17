import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const TripCard = ({ trip }) => (
  <div className="card m-b-30">
    <small className="white front">
      <span className="far fa-clock mr-2 white"/>
      <strong>{moment().diff(moment(trip.createdAt), "days")}</strong><br/>days
    </small>
    <a className="img-card" href="#">
      <img src={require("../../assets/images/switzerland.jpg")} alt=""/>
    </a>
    <div className="card-content">
      <div>
        <a className="btn btn-primary px-3 btn-sm float-left" href="#" role="button">{trip.type}</a>
      </div>
      <h6 className="primary-color text-right">$3300</h6>
      <h6 className="black"><a href="#" target="_blank">Great Switzerland</a></h6>
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