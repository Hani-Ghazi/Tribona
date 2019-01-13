import React from "react";
import { IoIosThumbsUp, IoIosChatbubbles } from "react-icons/io";


const { REACT_APP_PUBLIC_FILES } = process.env;
const fixCategoryName = (category) => (category.nameEn || "").replace(/ /g, "_");


const PlaceCard = ({ place }) => (
  <div className="col-lg-3 col-sm-6 col-xs-12 mb-4 complete-image">
    <a className="" href="#" target="_blank">
      <div className="destination-item">
        <img
          src={place.images[0] ? `${REACT_APP_PUBLIC_FILES + place.images[0]}` : require("../../assets/images/switzerland.jpg")}
          alt="place"
          className="img-fluid destination-item"/>
        <h6 className="white front w-100">{place.name} <br/> #{fixCategoryName(place.category)}
          <span className="pull-right">{place.likes_count}
            <IoIosThumbsUp/> {place.comments_count}
            <IoIosChatbubbles/>
          </span>
        </h6>

      </div>
    </a>
  </div>
);

export default PlaceCard;
