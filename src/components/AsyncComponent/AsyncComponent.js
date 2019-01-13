import React from "react";
import Loadable from "react-loadable";
import { PropagateLoader } from "react-spinners";
import placesApi from "../../api/places";
import userApi from "../../api/user";

export const AsyncHomePage = Loadable.Map({
  loader: {
    HomePage: () => import("../pages/HomePage"),
    places: () => placesApi.getPlaces()
  },
  loading: () => <PropagateLoader/>,
  render(loaded, props) {
    let HomePage = loaded.HomePage.default;
    return <HomePage {...props} places={loaded.places}/>;
  }
});


export const AsyncUserPage = Loadable.Map({
  loader: {
    UserPage: () => import ("../pages/UsersPage"),
    users: () => userApi.usersList()
  },
  loading: () => <PropagateLoader/>,
  render(loaded, props) {
    let UserPage = loaded.UserPage.default;
    return <UserPage {...props} users={loaded.users}/>;
  }
});

export const AsyncPlacesListPage = Loadable.Map({
  loader: {
    PlacesListPage: () => import ("../pages/PlacesListPage"),
    places: () => placesApi.getPlaces(),
    placesCategories: () => placesApi.getPlacesCategories()
  },
  loading: () => <PropagateLoader/>,
  render(loaded, props) {
    let PlacesListPage = loaded.PlacesListPage.default;
    return <PlacesListPage {...props} places={loaded.places} placesCategories={loaded.placesCategories}/>;
  }
});