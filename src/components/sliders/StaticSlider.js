import React from "react";

const defaultImage = require("../../assets/images/toronto.jpg");

const StaticSlider = ({ curveImage, image, title }) => (
  <div className="tour-title not-fixed ">
    <img className="w-100 h-100" src={image || defaultImage} alt=""/>
    {
      title &&
      <h1 className="white text-center front shadow-text center-text">{title}</h1>
    }
    <img className="curve2 front flex-b" src={curveImage} alt=""/>
  </div>
);


export default StaticSlider;