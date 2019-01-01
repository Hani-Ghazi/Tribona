import React, {Component, Fragment} from 'react';
import Header from "../header";
import {Route} from "react-router-dom";
import HomePage from "../pages/HomePage";
import Footer from "../footer";
// import '../../assets/sass/_all.css';

class DefatultLayout extends Component {
  render() {
    return (
      <Fragment>
        <Header/>
        <Route path="/app" exact component={HomePage}/>
        <Footer/>
      </Fragment>
    );
  }
}

export default DefatultLayout;

