import React, { Fragment, Component } from "react";
import Modal from "react-responsive-modal";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import { toast } from "react-toastify";

const { trips: { types } } = require("../../constants");

class BookTripModal extends Component {

  state = {
    data: {
      startDate: new Date(),
      duration: 0
    }
  };

  renderStartDate = () =>
    <div className="form-group text-left">
      <label>Start Date</label>
      <DatePicker
        className="form-control form-container"
        selected={this.state.data.startDate}
        onChange={(date) => this.setState({ data: { ...this.state.data, startDate: date } })}
      />
    </div>;

  renderDuration = () =>
    <div className="form-group text-left">
      <label>Duration <strong>(in days)</strong></label>
      <input
        type="number" name="duration" className="form-control form-container"
        value={this.state.data.duration}
        onChange={(e) => this.setState({ data: { ...this.state.data, duration: e.target.value } })}
        placeholder="Please enter the trip duration*" required="required"/>
    </div>;

  render() {
    const { isOpen, onClose, trip, onBook, data } = this.props;
    return (
      <Modal classNames={{ modal: "rounded-modal" }} open={isOpen} onClose={onClose} center>
        <div className="card card-signin">
          <div className="card-body">
            <h5 className="card-title text-center">Booking a {trip.name}</h5>
            <form
              className="form-signin"
              onSubmit={(e) => {
                e.preventDefault();
                onBook(this.state.data);
              }}>
              {[types.EXCLUSIVE, types.GROUP_PERIODIC].includes(trip.type) && this.renderStartDate()}
              {trip.type === types.EXCLUSIVE && this.renderDuration()}
              <div className="form-group text-left">
                <label>Notes</label>
                <textarea
                  name="notes" id="" rows="10" className="form-control form-container"
                  placeholder="Please enter if you have any notes"/>
              </div>
              <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Book</button>
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}

export default BookTripModal;