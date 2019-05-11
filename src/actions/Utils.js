import {
  CONSTANTS_LOADED
} from "../types";
import api from "../api/utils";

export const getConstants = () => (dispatch) =>
  api.getConstants().then(constants => dispatch({ type: CONSTANTS_LOADED, payload: constants }));
