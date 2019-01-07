import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';

import LoginPage from './components/pages/LoginPage';
import SignUpPage from './components/pages/SignUpPage';
import DefaultLayout from './components/DefaultLayout';
import ForgetPasswordPage from './components/pages/ForgetPasswordPage';
import VerifyPage from './components/pages/VerifyPage';
import ResetPAge from './components/pages/ResetPassword';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => (
  <Fragment>
    <Switch>
      <Route path="/login" exact component={LoginPage}/>
      <Route path="/sign-up" exact component={SignUpPage}/>
      <Route path="/forget-password" exact component={ForgetPasswordPage}/>
      <Route path="/verify" exact component={VerifyPage}/>
      <Route path="/reset" exact component={ResetPAge}/>
      <Route path="/" component={DefaultLayout}/>
    </Switch>
    <ToastContainer/>
  </Fragment>
);

export default App;
