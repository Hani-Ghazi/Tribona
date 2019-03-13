import React from "react";
import { IoIosThumbsUp, IoIosChatbubbles } from "react-icons/io";
import { Link } from "react-router-dom";

const { REACT_APP_PUBLIC_FILES } = process.env;
const fixCategoryName = (category) => (category.nameEn || "").replace(/ /g, "_");


const PlaceCard = ({ place }) => (
  <div className="complete-image mb-4">
    <Link to={`/places/${place.id}`}>
      <div className="destination-item">
        <img
          src={place.images[0] ? `${REACT_APP_PUBLIC_FILES + place.images[0]}` : require("../../assets/images/switzerland.jpg")}
          alt="place"
          className="img-fluid destination-item"/>
        <h6 className="white front w-100">{place.name}<br/> #{fixCategoryName(place.category)} <br/>
          <span className="pull-right">
              {place.likesCount} <IoIosThumbsUp/> {place.commentsCount} <IoIosChatbubbles/>
          </span>
        </h6>
      </div>
    </Link>
  </div>
);

export default PlaceCard;
