import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { resetPassword } from "../../actions/Auth";
import Header from "../header";
import bgImage from "../../assets/login/images/bg-01.jpg";
import InlineErrors from "../messages/InlineErrors";
import { Link } from "react-router-dom";
import isEmpty from "lodash/isEmpty";

class ResetPassword extends Component {
  state = {
    data: {
      newPassword: "",
      resetToken: ""
    },
    errors: []
  };

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    if (isEmpty(errors))
      this.props.resetPassword(this.state.data).then(() => this.props.history.push("/logun"));
    else
      this.setState({ errors });
  };

  componentDidMount() {
    this.setState({ data: { ...this.state.data, resetToken: this.props.resetToken || "" } });
  }

  validate = data => {
    const errors = [];
    if (!data.newPassword) errors.push(`Empty new password! please fill all required data.`);
    return errors;
  };

  onChange = e => this.setState({
    data: { ...this.state.data, [e.target.name]: e.target.value },
    errors: []
  });


  render() {
    const { errors, data } = this.state;
    return (
      <Fragment>
        {/*<Header/>*/}
        <div className="limiter">
          <div className="container-login100" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="wrap-login100" style={{ width: "35%" }}>
              <span className="dis-block text-center w-100">
               <img src={require("../../assets/images/logo.png")} alt="logo"
                    className={"img-fluid dis-block m-auto w-50"}/>
              </span>
              <form onSubmit={this.onSubmit}>
                <p className={"p-t-50 dis-block p-t-60 white"}>Please enter your new password </p>
                {
                  (errors || []).map(err => <InlineErrors text={err} classes={"dis-block"}/>)
                }
                <div className={`wrap-input100 validate-input`}>
                  <input className="input100" type="password" name="newPassword" placeholder="New Password"
                         onChange={this.onChange}
                         autoComplete="new-password" value={data.newPassword}/>
                  <span className="focus-input100" data-placeholder="&#xf191;"/>

                </div>
                <div className="container-login100-form-btn" style={{ justifyContent: "flex-end" }}>
                  <button className="login100-form-btn">
                    Reset
                  </button>
                </div>
              </form>
              <div className={"p-t-30"}>
                <p>Once your password reset successfully, please login</p>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { resetToken: state.user.resetToken };
};

export default connect(mapStateToProps, { resetPassword })(ResetPassword);