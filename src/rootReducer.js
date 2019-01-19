import { combineReducers } from "redux";
import user from "./reducers/User";
import countries from "./reducers/Countries";
import places from "./reducers/Places";
import journey from "./reducers/Journey";

export default combineReducers({
  user,
  countries,
  places,
  journey
});