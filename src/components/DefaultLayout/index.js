import React, {Component, Fragment} from 'react';
import Header from "../header";
import {Route} from "react-router-dom";
import {HomePage} from "../AsyncComponent/AsyncComponent";
import Footer from "../footer";
import '../../assets/sass/_all.css';

class DefaultLayout extends Component {
  render() {
    return (
      <Fragment>
        <Header/>
        <Route path="/" exact component={HomePage}/>
        <Footer/>
      </Fragment>
    );
  }
}

export default DefaultLayout;

