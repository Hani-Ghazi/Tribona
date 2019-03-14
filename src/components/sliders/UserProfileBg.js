import React from "react";
import scrollBG from "../../assets/svgs/curvesingle.svg";
import defaultImage from "../../assets/images/elisa.jpg";

const { REACT_APP_PUBLIC_FILES } = process.env;

const UserProfileBg = ({ user }) => (
  <div className="tour-title not-fixed center-image">
    <img className="w-100 h-100"
         src={`${(user && user.bgImage ? REACT_APP_PUBLIC_FILES + user.bgImage : defaultImage)}`} alt=""/>
    <a className="smooth-scroll pointer">
      <img className="curvechevron" src={scrollBG} alt=""/>
      <div className="chevroncurve">
        <i className="fas  hoverchevron white fa-chevron-down"/>
      </div>
    </a>
  </div>
);

export default UserProfileBg;