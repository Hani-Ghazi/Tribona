import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { scrollToTop } from "../../utils";
import constants from "../../constans";

const TouristRoute = ({ isAuthenticated, user, component: Component, ...rest }) => {
  scrollToTop();
  return (
    <Route {...rest} render={props =>
      isAuthenticated && user.role === constants.users.roles.TOURIST ? <Component {...props}/> : <Redirect to={"/"}/>
    }/>
  );
};

TouristRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapToProps = state => {
  return { isAuthenticated: !!state.user.id, user: state.user };
};

export default connect(mapToProps)(TouristRoute);