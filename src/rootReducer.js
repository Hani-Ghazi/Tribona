import { combineReducers } from "redux";
import user from "./reducers/User";
import countries from "./reducers/Countries";
import places from "./reducers/Places";
import journeys from "./reducers/Journey";
import modals from "./reducers/Modals";
import trips from "./reducers/Trips";
import loaders from "./reducers/Loader";

export default combineReducers({
  user,
  countries,
  places,
  journeys,
  modals,
  loaders,
  trips
});