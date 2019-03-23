import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { scrollToTop } from "../../utils";

const { users: { roles } } = require("../../constans");

const CompanyRoute = ({ isAuthenticated, user, component: Component, ...rest }) => {
  scrollToTop();
  return (
    <Route {...rest} render={props =>
      (isAuthenticated && [roles.COMPANY, roles.ADMIN].includes(user.role)) ? <Component {...props}/> :
        <Redirect to={"/"}/>
    }/>
  );
};

CompanyRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapToProps = state => {
  return { isAuthenticated: !!state.user.id, user: state.user };
};

export default connect(mapToProps)(CompanyRoute);