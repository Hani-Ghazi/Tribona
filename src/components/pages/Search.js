import React, { Component } from "react";
import { AppBar, Tabs, Tab, Typography } from '@material-ui/core';
import PlacesGrid from "../Places/PlacesGrid";
import JourneysGrid from "../Journeys/JourneysGrid";
import TripsGrid from "../Trips/TripsGrid";
import apiJourneys from '../../api/journeys';
import apiTrips from '../../api/trips';
import apiPlaces from '../../api/places';
import qs from "query-string";
import { ActionLoader } from "../Loaders";


function TabContainer(props) {
  return (
    <Typography component="div" className="mt-5 d-flex center-f" >
      {props.children}
    </Typography>
  );
}

class Search extends Component {
  state = {
    tab: 0,
    isUpdating0: false,
    isUpdating1: false,
    isUpdating2: false,
    filter: { ...qs.parse(this.props.location.search) },
    journeys: [],
    trips: [],
    places: []
  };
  componentDidMount() {
    this.getResults();
  }
  componentWillReceiveProps(nextProps) {
    let newfilter = qs.parse(nextProps.location.search);
    if (newfilter !== this.state.filter) {
      this.setState({
        filter: newfilter
      }, () => this.getResults());

    }
  }
  onChangeTab = (event, newValue) =>
    this.setState({ tab: newValue });

  getResults = () => {
    const { filter } = this.state;
    this.setState({ isUpdating0: true, isUpdating1: true, isUpdating2: true });
    apiJourneys.getJourneys({ filter }).then(journeys => {
      this.setState({ journeys });
    }).finally(() => (this.setState({ isUpdating0: false })));
    apiTrips.getTrips({ filter }).then(trips => {
      this.setState({ trips });
    }).finally(() => (this.setState({ isUpdating1: false })));
    apiPlaces.getPlaces({ filter }).then(places => {
      this.setState({ places });
    }).finally(() => (this.setState({ isUpdating2: false })));
  };



  render() {
    const { tab, journeys, trips, places, isUpdating0, isUpdating1, isUpdating2 } = this.state;
    return (
      <div className="limiter">
        <div className="container-search ml-auto mr-auto">

          <AppBar position="static" color="default">
            <Tabs
              value={tab}
              onChange={this.onChangeTab}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              className={"center form-container"}
            >
              <Tab label="Places" />
              <Tab label="Journeys" />
              <Tab label="Tours" />

            </Tabs>
          </AppBar>
          {tab === 0 &&
            <TabContainer>
              {
                isUpdating0 ? <ActionLoader />
                  :
                  <PlacesGrid places={places} />
              }
            </TabContainer>
          }
          {tab === 1 &&
            <TabContainer>
              {
                isUpdating1 ? <ActionLoader />
                  :
                  <JourneysGrid journeys={journeys} />
              }
            </TabContainer>
          }
          {tab === 2 && <TabContainer>
            {
              isUpdating2 ? <ActionLoader />
                :
                <div className="w-100 d-flex">
                  <TripsGrid trips={trips} />
                </div>
            }
          </TabContainer>}

        </div>
      </div>
    );
  }
}

export default (Search);