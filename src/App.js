import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import DefaultLayout from './components/DefaultLayout';

const App = () => (
  <Fragment>
    <Route path="/app" component={DefaultLayout}/>
    <Route path="/login" exact component={LoginPage}/>
  </Fragment>
);

export default App;
