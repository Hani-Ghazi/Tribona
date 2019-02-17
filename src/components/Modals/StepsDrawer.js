import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Drawer from "react-drag-drawer";
import { closeStepsDrawer } from "../../actions/Modals";
import JourneyStep from "../Journeys/JourneyStep";
import { FaTimes } from "react-icons/fa";

class StepsDrawer extends Component {

  state = {
    currentIndex: 0
  };

  render() {
    const { isStepsDrawerOpen, steps, closeStepsDrawer } = this.props;
    const { currentIndex } = this.state;
    if (!isStepsDrawerOpen) {
      return <Fragment/>;
    }
    let step = !!steps ? steps[currentIndex] : null;
    return (
      <Drawer
        open={isStepsDrawerOpen}
        containerElementClass={"steps-modal-container"}
      >
        <FaTimes
          onClick={() => closeStepsDrawer()}
          size='2em'
          className={"pointer close-icon"}/>
        <div style={{ padding: "0 12%" }}>
          <div className="row">
            <div className="col">
              <ul className={"steps text-center"}>
                {
                  steps
                    .map((step, currentIndex) =>
                      <li
                        key={currentIndex}
                        onClick={() => this.setState({ currentIndex })}
                        className={`pointer ${currentIndex === this.state.currentIndex && "active"}`}>{currentIndex + 1}</li>
                    )
                }
              </ul>
            </div>
          </div>
          {step && <JourneyStep step={step}/>}
        </div>
      </Drawer>
    );
  }
}

const initMapStateToProps = state => {
  return { ...state.modals.stepsDrawer, isStepsDrawerOpen: state.modals.isStepsDrawerOpen };
};


export default connect(initMapStateToProps, { closeStepsDrawer })(StepsDrawer);