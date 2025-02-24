import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { startLoading } from "../../actions/Loaders";
import { scrollToTop } from "../../utils";


const GuestRoute = ({ isAuthenticated, component: Component, ...rest }) => {
  scrollToTop();
  return <Route {...rest} render={props => <Component {...props}/>}/>;
};

GuestRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapToProps = state => {
  return { isAuthenticated: !!state.user.id };
};

export default connect(mapToProps, { startLoading })(GuestRoute);