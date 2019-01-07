import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {withToastManager} from 'react-toast-notifications';
import InlineErrors from "../messages/InlineErrors";
import {Link} from "react-router-dom";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import {FaFacebookF} from "react-icons/fa";
import TwitterLogin from "react-twitter-auth";
import Validator from "validator";
import isEmpty from "lodash/isEmpty";
import {login, loginViaFacebook, loginViaGoogle} from '../../actions/Auth'
import bgImage from '../../assets/login/images/bg-01.jpg';
import PropTypes from 'prop-types';
import Header from '../header';
import {USER_LOGGED_IN} from '../../types'

import '../../assets/login/fonts/iconic/css/material-design-iconic-font.css'
import '../../assets/login/css/hamburgers.min.css';
import '../../assets/login/css/util.css';
import '../../assets/login/css/main.css';
import {toast} from 'react-toastify';


class LoginPage extends Component {
  state = {
    data: {
      email: '',
      password: ''
    },
    facebookData: {
      access_token: null
    },
    googleData: {
      access_token: null,
      refresh_token: null
    },
    loading: false,
    errors: {}
  };

  submitLogin = data => this.props.login(data).then((user) => {
    if (user.type === USER_LOGGED_IN) {
      toast.success('Welcome Back, Nice to meet you again!', {
        hideProgressBar: true
      });
      this.props.history.push('/');
    }
    else
      this.props.history.push({
        pathname: '/verify',
        state: {verificationCode: user.verificationCode}
      })
  });

  responseFacebook = (res) => {
    if (!res.error) {
      this.setState({facebookData: {access_token: res.accessToken}}, () => {
        this.props.loginViaFacebook(this.state.facebookData).then(() => {
          toast.success('Welcome Back, Nice to meet you again!', {
            hideProgressBar: true
          });
          this.props.history.push('/');
        })
      });
    }
  };

  responseGoogle = (res) => {
    if (!res.error) {
      this.setState({googleData: {access_token: res.accessToken}}, () => {
        this.props.loginViaGoogle(this.state.googleData).then(() => {
          toast.success('Welcome Back, Nice to meet you again!', {
            hideProgressBar: true
          });
          this.props.history.push('/');
        })
      });
    }
  };

  onChange = e => this.setState({
    data: {...this.state.data, [e.target.name]: e.target.value},
    errors: {...this.state.errors, [e.target.name]: null}
  });


  onSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    if (isEmpty(errors)) {
      this.submitLogin(this.state.data);
    }
    else {
      this.setState({errors});
    }
  };

  validate = (data) => {
    const errors = {};
    if (!data.password) errors.password = `Password can't be blank`;
    if (!data.email) errors.email = `Email can't be blank`;
    else if (!Validator.isEmail(data.email)) errors.email = "Invalid Email";
    return errors;
  };


  render() {
    const {data, errors} = this.state;
    return (
      <Fragment>
        <Header/>
        <div className="limiter">
          <div className="container-login100" style={{backgroundImage: `url(${bgImage})`}}>
            <div className="wrap-login100">
              <form className="login100-form validate-form" onSubmit={this.onSubmit}>
                <span>
                  <img src={require('../../assets/images/logo.png')} alt="logo" className={'img-fluid'}/>
                </span>
                <span className="login100-form-title p-b-34 p-t-27">Log in</span>
                {
                  errors.email && <InlineErrors text={errors.email} classes={'dis-block'}/>
                }
                {
                  errors.password && <InlineErrors text={errors.password} classes={'dis-block'}/>
                }
                <div className={`wrap-input100 validate-input ${errors.email ? 'alert-validate' : ''}`}>
                  <input className="input100" type="text" name="email" placeholder="Username" value={data.email}
                         autoComplete="new-password" onChange={this.onChange}/>
                  <span className="focus-input100" data-placeholder="&#xf207;"/>

                </div>
                <div className={`wrap-input100 validate-input ${errors.password ? 'alert-validate' : ''}`}
                     style={{marginBottom: 0}}>
                  <input className="input100" type="password" name="password" placeholder="Password"
                         value={data.password}
                         autoComplete="new-password" onChange={this.onChange}/>
                  <span className="focus-input100" data-placeholder="&#xf191;"/>
                </div>
                <div className="text-right">
                  <Link className="txt1" to={'/forget-password'}>
                    Forgot Password?
                  </Link>
                </div>
                <div className="container-login100-form-btn p-t-30 p-b-30">
                  <button className="login100-form-btn w-100">
                    Login
                  </button>
                </div>
                <div className="login100-form-title white p-b-30">
                  OR login via
                </div>
                <div className="text-center">
                  <GoogleLogin
                    clientId="859154390049-g228vndqhh1ah0sr0rughb5rh23bvjfo.apps.googleusercontent.com"
                    redirectUri="https://localhost:3000"
                    buttonText=""
                    className="social-icon"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                  />
                  <FacebookLogin
                    appId="2419694401378299"
                    cssClass="social-icon facebok-icon"
                    size="small"
                    textButton=""
                    icon={<FaFacebookF/>}
                    fields="name,email,picture"
                    callback={this.responseFacebook}
                    autoLoad={false}
                  />
                  <TwitterLogin
                    loginUrl="http://localhost:4000/api/v1/auth/twitter"
                    onFailure={this.responseGoogle} onSuccess={this.responseGoogle}
                    requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"
                    text=""
                    className="social-icon"
                  />
                </div>

                <div className="text-center p-t-30">
                  <p>
                    Don't have account yet? <Link className="white" to={'/sign-up'}>Join us</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default connect(null, {login, loginViaFacebook, loginViaGoogle})(LoginPage);