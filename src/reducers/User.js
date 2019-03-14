import {
  USER_LOGGED_IN,
  USER_SIGNED_UP,
  USER_LOGGED_OUT,
  RESET_PASSWORD_SUCCEEDED,
  RESET_PASSWORD_EMAIL_SENT
} from "../types";

const INIT_STATE = {
  ...JSON.parse(localStorage.triponaUser === "undefined" ? "{}" : localStorage.getItem("triponaUser"))
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return action.payload;
    case USER_SIGNED_UP:
      return { verificationToken: action.payload };
    case USER_LOGGED_OUT:
      return {};
    case RESET_PASSWORD_EMAIL_SENT:
      return { resetToken: action.payload };
    case RESET_PASSWORD_SUCCEEDED:
      return { resetToken: null };
    default:
      return state;
  }
};