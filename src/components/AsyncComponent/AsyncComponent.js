import React from "react";
import Loadable from "react-loadable";
import PageLoader from "../../components/Loaders/pageLoader";

export const AsyncHomePage = Loadable({
  loader: () => import("../pages/HomePage"),
  loading: () => <PageLoader/>
});
// -------------------------------------------------------------------------- //
export const AsyncPlacesListPage = Loadable({
  loader: () => import("../Places/PlacesListPage"),
  loading: () => <PageLoader/>
});

export const AsyncPlaceDetailsPage = Loadable({
  loader: () => import("../Places/PlaceDetails"),
  loading: () => <PageLoader/>
});


export const AsyncPlaceFormPage = Loadable({
  loader: () => import("../Places/PlaceForm"),
  loading: () => <PageLoader/>
});
// -------------------------------------------------------------------------- //
export const AsyncJourneysListPage = Loadable({
  loader: () => import("../Journeys/JourneysList"),
  loading: () => <PageLoader/>
});


export const AsyncJourneyDetailsPage = Loadable({
  loader: () => import("../Journeys/JourneyDetails"),
  loading: () => <PageLoader/>
});

export const AsyncJourneyFormPage = Loadable({
  loader: () => import("../Journeys/JourneyForm"),
  loading: () => <PageLoader/>
});
// -------------------------------------------------------------------------- //
export const AsyncTripsListPage = Loadable({
  loader: () => import("../Trips/TripsList"),
  loading: () => <PageLoader/>
});


export const AsyncTripDetailsPage = Loadable({
  loader: () => import("../Trips/TripDetails"),
  loading: () => <PageLoader/>
});

export const AsyncTripFormPage = Loadable({
  loader: () => import("../Trips/TripForm"),
  loading: () => <PageLoader/>
});

export const AsyncProfilePage = Loadable({
  loader: () => import("../users/Profile"),
  loading: () => <PageLoader/>
});

export const AsyncEditProfilePage = Loadable({
  loader: () => import("../users/ProfileForm"),
  loading: () => <PageLoader/>
});

export const AsyncMyFavoritePage = Loadable({
  loader: () => import("../users/myFavorite"),
  loading: () => <PageLoader/>
});

export const AsyncContactUsPage = Loadable({
  loader: () => import("../pages/ContactPage"),
  loading: () => <PageLoader/>
});


export const AsyncMApPage = Loadable({
  loader: () => import("../pages/mapPlaces"),
  loading: () => <PageLoader/>
});
