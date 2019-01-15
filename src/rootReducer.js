import { combineReducers } from "redux";
import user from "./reducers/User";
import countries from "./reducers/Countries";
import places from "./reducers/Places";

export default combineReducers({
  user,
  countries,
  places
});