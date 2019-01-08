import React, {Component, Fragment} from 'react';
import Header from "../header";
import {Route} from "react-router-dom";
import {HomePage} from "../AsyncComponent/AsyncComponent";
import Footer from "../footer";


class DefaultLayout extends Component {
  render() {
    return (
      <Fragment>

        <Route path="/" exact component={HomePage}/>

      </Fragment>
    );
  }
}

export default DefaultLayout;

