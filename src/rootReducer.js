import { combineReducers } from "redux";
import user from "./reducers/User";
import countries from "./reducers/Countries";

export default combineReducers({
  user,
  countries
});