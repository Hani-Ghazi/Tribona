import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const GuestRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route {...rest} render={props =>
    isAuthenticated ? <Component {...props}/> : <Redirect to={"/"}/>
  }/>
);

GuestRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapToProps = state => {
  return { isAuthenticated: !!state.user.id };
};

export default connect(mapToProps)(GuestRoute);