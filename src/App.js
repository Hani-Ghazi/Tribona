import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
import ForgetPasswordPage from "./components/pages/ForgetPasswordPage";
import VerifyPage from "./components/pages/VerifyPage";
import ResetPAge from "./components/pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import { HomePage } from "./components/AsyncComponent/AsyncComponent";
import GuestRoute from "./components/Guard/GuestRoute";
import LoginGuard from "./components/Guard/LoginGuard";
import Header from "./components/header";
import Footer from "./components/footer";
import "./assets/sass/_all.css";
import "react-toastify/dist/ReactToastify.css";


const App = () => (
  <Fragment>
    <Header/>
    <Switch>
      <LoginGuard path="/login" exact component={LoginPage}/>
      <LoginGuard path="/sign-up" exact component={SignUpPage}/>
      <LoginGuard path="/forget-password" exact component={ForgetPasswordPage}/>
      <LoginGuard path="/verify" exact component={VerifyPage}/>
      <LoginGuard path="/reset" exact component={ResetPAge}/>
      <GuestRoute path="/" exact component={HomePage}/>
    </Switch>
    <Footer/>
    <ToastContainer/>
  </Fragment>
);

export default App;
