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
  AsyncPlaceDetailsPage,
  AsyncPlacesListPage,
  AsyncPlaceFormPage,
  // -------------------- //
  AsyncJourneyDetailsPage,
  AsyncJourneysListPage,
  AsyncJourneyFormPage,
  // -------------------- //
  AsyncTripsListPage,
  AsyncTripDetailsPage,
  AsyncTripFormPage,
  // -------------------- //
  AsyncHomePage


} from "./components/AsyncComponent/AsyncComponent";
import GuestRoute from "./components/Guard/GuestRoute";
import LoginGuard from "./components/Guard/LoginGuard";
import Header from "./components/header";
import Footer from "./components/footer";
import "./assets/sass/_all.css";
import "react-toastify/dist/ReactToastify.css";
import "react-image-lightbox/style.css";
import ShouldLoginModal from "./components/Partials/ShouldLoginModal";
import LightBox from "./components/Modals/LightBox";

const App = ({ location }) => {
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
        <GuestRoute location={location} path="/places" exact component={AsyncPlacesListPage}/>
        <GuestRoute location={location} path="/places/add" exact component={AsyncPlaceFormPage}/>
        <GuestRoute location={location} path="/places/edit/:id" exact component={AsyncPlaceFormPage}/>
        <GuestRoute location={location} path="/places/:id" exact component={AsyncPlaceDetailsPage}/>
        <GuestRoute location={location} path="/journeys" exact component={AsyncJourneysListPage}/>
        <GuestRoute location={location} path="/journeys/add" exact component={AsyncJourneyFormPage}/>
        <GuestRoute location={location} path="/journeys/edit/:id" exact component={AsyncJourneyFormPage}/>
        <GuestRoute location={location} path="/journeys/:id" exact component={AsyncJourneyDetailsPage}/>
        <GuestRoute location={location} path="/trips/:id" exact component={AsyncTripsListPage}/>
        <GuestRoute location={location} path="/trips/:id" exact component={AsyncTripDetailsPage}/>
        <GuestRoute location={location} path="/trips/:id" exact component={AsyncTripFormPage}/>
      </Switch>
      <ShouldLoginModal/>
      <LightBox/>
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


export default App;
