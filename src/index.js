import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import rootReducer from "./rootReducer";
import dotenv from "dotenv";
import ScrollToTop from "./components/Partials/ScrollToTop";

import { getMe } from "./actions/Auth";
import { getCountries } from "./actions/Country";
import { getPopularPlaces } from "./actions/Places";
import { getPopularJourneys } from "./actions/Journey";
import { getPopularTrips } from "./actions/Trips";
import {getConstants} from "./actions/Utils"

dotenv.config();

const composeEnhancers = composeWithDevTools({
  trace: true
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

if (localStorage.getItem("triponaUser")) {
  store.dispatch(getMe());
}
store.dispatch(getCountries());
store.dispatch(getPopularPlaces({ pagination: { first: 6, orderBy: 'views_DESC'} }));
store.dispatch(getPopularJourneys({ pagination: { first: 6, orderBy: 'views_DESC' } }));
store.dispatch(getPopularTrips({ pagination: { first: 6, orderBy: 'views_DESC'} }));
store.dispatch(getConstants({ pagination: { first: 6, orderBy: 'views_DESC'} }));


ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ScrollToTop>
        <Route component={App}/>
      </ScrollToTop>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
