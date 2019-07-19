import React, { Component } from 'react';
import { replace, goBack, push } from 'connected-react-router';
import { connect } from 'react-redux';
import { setTargetRoute } from '../../actions/NavigationActions.js';
import { requestReset } from '../../actions/RegistrationActions.js';

import { requestLogin } from '../../actions/LoginActions.js';
import Footer from '../footer/Footer.js';


const mapStateToProps = (state) => {
  return {
    username: state.userData.username,
    loginFails: state.login.failCount,
    token: state.login.token,
    target: state.header.targetRoute,
    message: state.communication.signInMessage,
    blogs: state.blogs.blogList
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    // ...bindActionCreators(Actions, dispatch),
    goBack: () => { dispatch(goBack()) },
    replace: (val) => { dispatch(replace(val)) },
    register: () => { dispatch(push('/register')) },
    resetTargetRoute: () => { dispatch(setTargetRoute('')) },
    requestLogin: (cred) => { dispatch(requestLogin(cred)) },
    requestReset: (data) => { dispatch(requestReset(data)) },
    // uploadFile: (input) => {dispatch(uploadFile(input))}
  }
}

class SigninPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      validEmail: false,
      reset: false,
      resetSent: false
    };
  }
  componentWillMount() {
    if (this.props.token) {
      this.props.replace('/profile');
    }
    else {
      window.scrollTo(0, 0);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.token) {
      localStorage.setItem('token', nextProps.token);

      // if the user was trying to a restricted area, take them there after successful login
      const newRoute = nextProps.target;
      if (newRoute) {
        this.props.resetTargetRoute();
        this.props.replace(newRoute);
      }
      else {
        this.props.replace('/lessons');
      }
    }
    else {
      this.setState({ password: '' });
      if (this.pw) { this.pw.focus(); }
      // TODO: if failure > 3 locked out
    }
  }

  _keyPress(evt) {
    if (evt.key === "Enter" && this.state.username && this.state.password) {
      this.props.requestLogin({ username: this.state.username, password: this.state.password });
    }
  }

  _keyPressReset(evt) {
    if (evt.key === "Enter" && this.state.email && this.state.validEmail) {
      this._requestReset();
      this.setState({ email: '', resetSent: true });
    }
  }

  _requestReset() {
    this.props.requestReset({ email: this.state.email });
    this.setState({ email: '', resetSent: true });
  }

  _validateEmail(val = this.state.email) {
    if (!val) { return; }
    if (!val.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
      this.setState({ validEmail: false });
    }
    else {
      this.setState({ validEmail: true });
    }
  }

  render() {
    return (
      <div>
        <section className="landing_image image5">
          <main className="page_title">
            <h1>{this.state.reset ? "Forgot Password" : "Sign In"}</h1>
            <h3>{this.state.reset ? "Reset and Get Back to Golfing" : "Access Your Account"}</h3>
          </main>
        </section>
        <div>
          <section>
            {!this.state.reset &&
              <div className="structured_panel">
                <label>Username</label>
                <input
                  ref={(ref) => this.un = ref}
                  value={this.state.username}
                  onChange={(evt) => this.setState({ username: evt.target.value.replace(/[^A-Z0-9-_.$#@!+]/gi, "").substr(0, 32) })}
                />
                <label style={{ marginTop: '1rem' }}>Password</label>
                <input
                  ref={(ref) => this.pw = ref}
                  value={this.state.password}
                  onChange={(evt) => this.setState({ password: evt.target.value })}
                  onKeyPress={this._keyPress.bind(this)}
                  type="password"
                />
                {this.props.loginFails > 0 && (<span className="validation_error">Your username / password was not correct, please try again.</span>)}
                {/* {this.props.message && (<span className="validation_error">{this.props.message}</span>)} */}
                <div className="button se_button"
                  style={{ marginTop: '2rem' }}
                  disabled={!this.state.username || !this.state.password}
                  onClick={() => this.props.requestLogin({ username: this.state.username, password: this.state.password })}
                >
                  <span>Sign In</span>
                </div>
                <div className="account_links">
                  <span onClick={() => { this.setState({ reset: true, username: '', password: '' }) }}>Forgot Password?</span>
                  <span onClick={() => this.props.register()}>Create Account</span>
                </div>
              </div>
            }
            {this.state.reset && !this.state.resetSent &&
              <div className="structured_panel">
                <label>Email Address</label>
                <input
                  ref={(ref) => this.email = ref}
                  className={(this.state.email && !this.state.validEmail ? "error" : "")}
                  value={this.state.email}
                  onKeyPress={this._keyPressReset.bind(this)}
                  onChange={(evt) => { this.setState({ email: evt.target.value }); this._validateEmail(evt.target.value) }}
                  onBlur={(evt) => this._validateEmail()}
                />
                {this.state.email && !this.state.validEmail && (<span className="validation_error">Enter the email address you used to register.</span>)}
                <div className="button se_button"
                  style={{ marginTop: '2rem' }}
                  disabled={!this.state.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)}
                  onClick={() => this._requestReset()}
                >
                  <span>SEND INSTRUCTIONS</span>
                </div>
                <div className="account_links">
                  <span onClick={() => this.setState({ reset: false, email: '', validEmail: false })}>Back to Sign In</span>
                </div>
              </div>
            }
            {this.state.reset && this.state.resetSent &&
              <div className="structured_panel">
                <p>Your password reset request was received. Check your email for further instructions.</p>
                <div className="button se_button"
                  style={{ marginTop: '2rem' }}
                  onClick={() => this.setState({ reset: false, email: '', validEmail: false, resetSent: false })}
                >
                  <span>BACK TO SIGN IN</span>
                </div>
              </div>
            }
          </section>
          <Footer />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninPage);
