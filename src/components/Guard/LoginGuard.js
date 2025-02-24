import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {scrollToTop} from "../../utils";

const LoginGuard = ({ isAuthenticated, component: Component, ...rest }) => {
  scrollToTop();
  return <Route {...rest} render={props =>
    isAuthenticated ? <Redirect to={"/"}/> : <Component {...props}/>}
  />;
};

LoginGuard.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapToProps = state => {
  return { isAuthenticated: !!state.user.id };
};

export default connect(mapToProps)(LoginGuard);