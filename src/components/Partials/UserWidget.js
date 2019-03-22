import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const { REACT_APP_PUBLIC_FILES } = process.env;


const userWidget = ({ user }) => (
  <Link to={`/users/profile/${user.ownerId}`} className={"user-name"}>
    <img className="team-holder circle  mx-auto svgcenter"
         src={REACT_APP_PUBLIC_FILES + (user.ownerImage || "files-1547673340162.jpeg")} alt=""/>
    <div className="w-100 m-t-20 text-center">
      <h3>{user.ownerName}</h3>
    </div>
  </Link>
);


userWidget.propTypes = {
  user: PropTypes.shape({}).isRequired
};

export default userWidget;