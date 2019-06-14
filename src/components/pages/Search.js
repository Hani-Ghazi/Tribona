import React, { Component } from "react";
import { AppBar, Tabs, Tab, Typography } from '@material-ui/core';
import PlacesGrid from "../Places/PlacesGrid";
import JourneysGrid from "../Journeys/JourneysGrid";
import TripsGrid from "../Trips/TripsGrid";

function TabContainer(props) {
  return (
    <Typography component="div" className="mt-5" >
      {props.children}
    </Typography>
  );
}

class Search extends Component {
  state = {
    tab: 0,
    journeys: this.props.location.state.journeys,
    places: this.props.location.state.places,
    trips: this.props.location.state.trips

  };


  onChangeTab = (event, newValue) =>
    this.setState({ tab: newValue });




  render() {
    const { tab, places, journeys, trips } = this.state;
    console.log(this.props.location.state)
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
          {tab === 0 && <TabContainer>  <PlacesGrid places={places} /></TabContainer>}
          {tab === 1 && <TabContainer> <JourneysGrid journeys={journeys} /></TabContainer>}
          {tab === 2 && <TabContainer> <TripsGrid trips={trips} /> </TabContainer>}



        </div>
      </div>
    );
  }
}

export default (Search);