import React from "react";

const {REACT_APP_PUBLIC_FILES} = process.env;

const PlaceCard = ({ place }) => (
  <div className="col-lg-3 col-sm-6 col-xs-12 mb-4 complete-image">
    <a className="" href="#" target="_blank">
      <div className="destination-item">
        <img src={place.images[0] ? `${REACT_APP_PUBLIC_FILES + place.images[0]}` : require("../../assets/images/switzerland.jpg")} alt="place image"
             className="img-fluid destination-item"/>
        <h6 className="white front">{place.name}</h6>
      </div>
    </a>
  </div>
);

export default PlaceCard;
