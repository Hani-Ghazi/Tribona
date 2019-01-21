import React, { Fragment } from "react";
import PropTypes from "prop-types";

const { REACT_APP_PUBLIC_FILES } = process.env;


const userWidget = ({ user }) => (
  <Fragment>
    <img className="team-holder circle  mx-auto svgcenter"
         src={REACT_APP_PUBLIC_FILES + (user.ownerImage || "files-1547673340162.jpeg")} alt=""/>
    <div className="w-100 m-t-20 text-center">
      <h3>{user.ownerName}</h3>
    </div>
  </Fragment>
);


userWidget.propTypes = {
  user: PropTypes.shape({
    ownerName: PropTypes.string.isRequired,
    ownerImage: PropTypes.string
  }).isRequired
};

export default userWidget;