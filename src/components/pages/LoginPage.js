import React, {Component} from 'react';
import LoginForm from '../forms/LoginForm.js';
import '../../assets/login/css/bootstrap.min.css';
import '../../assets/login/fonts/iconic/css/material-design-iconic-font.css'
import '../../assets/login/css/hamburgers.min.css';
import '../../assets/login/css/util.css';
import '../../assets/login/css/main.css';
import bgImage from '../../assets/login/images/bg-01.jpg';


class LoginPage extends Component {
  submitLogin = data => console.log(data);

  render() {
    return (
      <div className="limiter">
        <div className="container-login100" style={{backgroundImage: `url(${bgImage})`}}>
          <div className="wrap-login100">
            <LoginForm submit={this.submitLogin}/>
          </div>
        </div>
      </div>)
  }
}

export default LoginPage;