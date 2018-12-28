import React from 'react';
import {Route} from 'react-router-dom';
import HomePage from './components/pages/HomePage.js';
import LoginPage from './components/pages/LoginPage.js';


const App = () => (
  <div>
    <Route path="/" exact component={HomePage}/>
    <Route path="/login" exact component={LoginPage}/>
  </div>
);

export default App;
