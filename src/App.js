import React, { Fragment } from "react";
import { Switch } from "react-router-dom";
import PropTypes from "prop-types";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
import ForgetPasswordPage from "./components/pages/ForgetPasswordPage";
import VerifyPage from "./components/pages/VerifyPage";
import ResetPAge from "./components/pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import {
  AsyncHomePage,
  AsyncUserPage,
  AsyncPlacesListPage
} from "./components/AsyncComponent/AsyncComponent";
import GuestRoute from "./components/Guard/GuestRoute";
import LoginGuard from "./components/Guard/LoginGuard";
import Header from "./components/header";
import Footer from "./components/footer";
import "./assets/sass/_all.css";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { getMe } from "./actions/Auth";
import { getCountries } from "./actions/Country";


const App = ({ location, getMe, getCountries }) => {
  if (localStorage.getItem("triponaUser")) {
    getMe();
  }
  getCountries();
  return (
    <Fragment>
      <Header/>
      <Switch>
        <LoginGuard location={location} path="/login" exact component={LoginPage}/>
        <LoginGuard location={location} path="/sign-up" exact component={SignUpPage}/>
        <LoginGuard location={location} path="/forget-password" exact component={ForgetPasswordPage}/>
        <LoginGuard location={location} path="/verify" exact component={VerifyPage}/>
        <LoginGuard location={location} path="/reset" exact component={ResetPAge}/>
        <GuestRoute location={location} path="/" exact component={AsyncHomePage}/>
        <GuestRoute location={location} path="/users" exact component={AsyncUserPage}/>
        <GuestRoute location={location} path="/places" exact component={AsyncPlacesListPage}/>
      </Switch>
      <Footer/>
      <ToastContainer/>
    </Fragment>
  );
};

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};


export default connect(null, { getMe, getCountries })(App);
