import React, { Fragment } from "react";
import "./assets/sass/_all.css";
import "react-toastify/dist/ReactToastify.css";
import "react-image-lightbox/style.css";
import "react-datepicker/dist/react-datepicker.css";
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
  AsyncHomePage,
  AsyncContactUsPage,
  AsyncMApPage,
  // -------------------- //
  AsyncProfilePage,
  AsyncEditProfilePage,
  AsyncMyFavoritePage
  // -------------------- //
} from "./components/AsyncComponent/AsyncComponent";
import { GuestRoute, TorristRoute, NotAuthenticatedRoute, CompanyRoute } from "./components/Guard";
import Header from "./components/header";
import Footer from "./components/footer";
import ShouldLoginModal from "./components/Partials/ShouldLoginModal";
import LightBox from "./components/Modals/LightBox";
import StepsDrawer from "./components/Modals/StepsDrawer";
import MapPage from "./components/pages/MapPage";


const App = ({ location }) => {
  return (
    <Fragment>
      <Header/>
      <Switch>
        <NotAuthenticatedRoute location={location} path="/login" exact component={LoginPage}/>
        <NotAuthenticatedRoute location={location} path="/sign-up" exact component={SignUpPage}/>
        <NotAuthenticatedRoute location={location} path="/forget-password" exact component={ForgetPasswordPage}/>
        <NotAuthenticatedRoute location={location} path="/verify" exact component={VerifyPage}/>
        <NotAuthenticatedRoute location={location} path="/reset" exact component={ResetPAge}/>
        <GuestRoute location={location} path="/" exact component={AsyncHomePage}/>
        <GuestRoute location={location} path="/places" exact component={AsyncPlacesListPage}/>
        <TorristRoute location={location} path="/places/add" exact component={AsyncPlaceFormPage}/>
        <TorristRoute location={location} path="/places/edit/:id" exact component={AsyncPlaceFormPage}/>
        <GuestRoute location={location} path="/places/:id" exact component={AsyncPlaceDetailsPage}/>
        <GuestRoute location={location} path="/journeys" exact component={AsyncJourneysListPage}/>
        <GuestRoute location={location} path="/journeys/add" exact component={AsyncJourneyFormPage}/>
        <GuestRoute location={location} path="/journeys/edit/:id" exact component={AsyncJourneyFormPage}/>
        <GuestRoute location={location} path="/journeys/:id" exact component={AsyncJourneyDetailsPage}/>
        <GuestRoute location={location} path="/trips" exact component={AsyncTripsListPage}/>
        <CompanyRoute location={location} path="/trips/add" exact component={AsyncTripFormPage}/>
        <CompanyRoute location={location} path="/trips/edit/:id" exact component={AsyncTripFormPage}/>
        <GuestRoute location={location} path="/trips/:id" exact component={AsyncTripDetailsPage}/>
        <GuestRoute location={location} path="/users/profile/:ownerId" exact component={AsyncProfilePage}/>
        <GuestRoute location={location} path="/users/my-favorite" exact component={AsyncMyFavoritePage}/>
        <GuestRoute location={location} path="/profile" exact component={AsyncEditProfilePage}/>
        <GuestRoute location={location} path="/contact-us" exact component={AsyncContactUsPage}/>
        <GuestRoute location={location} path="/map" exact component={AsyncMApPage}/>
      </Switch>
      <ShouldLoginModal/>
      <LightBox/>
      <StepsDrawer/>
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
