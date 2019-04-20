import React from "react";
import { IoIosThumbsUp, IoIosChatbubbles } from "react-icons/io";

const defaultImage = require("../../assets/images/peru.jpg");
const { REACT_APP_PUBLIC_FILES } = process.env;

const TimelineCard = ({ item }) => (
  <div className="timeline-panel">
    <div className="timeline-heading">
      <img className="img-fluid" src={item.images.length ? REACT_APP_PUBLIC_FILES + item.images[0] : defaultImage}/>
    </div>
    {
      item.description &&
      <div className="timeline-body">
        <p>{item.description}</p>
      </div>
    }
    <div className="timeline-footer">
      <span className="pull-right">
        <a>{item.likesCount} <IoIosThumbsUp size="1.5em" color="#ff4f81"/></a>
        <a>{item.commentsCount} <IoIosChatbubbles size="1.5em" color="#ff4f81"/></a>
      </span>
    </div>
  </div>
);

export default TimelineCard;