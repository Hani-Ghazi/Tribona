import React from "react";
import scrollBG from "../../assets/svgs/curvesingle.svg";
import defaultImage from "../../assets/images/shortcodes.jpg";

const { REACT_APP_PUBLIC_FILES } = process.env;

const SliderWithScroll = ({ slide }) => (
  <div className="tour-title not-fixed center-image">
    {
      slide.images[0] &&
      <img className="w-100 h-100" src={`${REACT_APP_PUBLIC_FILES + slide.images[0]}`} alt=""/>
    }
    {
      !slide.images[0] &&
      <img className="w-100 h-100" src={defaultImage} alt=""/>
    }
    {/*<h1 className="white text-center front shadow-text center-text">{slide.name}</h1>*/}
    <a className="smooth-scroll pointer">
      <img className="curvechevron" src={scrollBG} alt=""/>
      <div className="chevroncurve">
        <i className="fas  hoverchevron white fa-chevron-down"/>
      </div>
    </a>
  </div>
);

export default SliderWithScroll;