import React from 'react';

const TripCard = ({trip}) => (
  <div className="col-lg-3 col-sm-6 col-xs-12 mb-4 mb-lg-0 complete-image">
    <a className="" href="#" target="_blank">
      <div className="destination-item">
        <img src={trip.img} className="img-fluid destination-item" alt="trip"/>
        <h6 className="white front">{trip.title}</h6>
      </div>
    </a>
  </div>
);

export default TripCard;