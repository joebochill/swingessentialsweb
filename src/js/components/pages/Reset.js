import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';
import Footer from '../footer/Footer.js';
import Loader from '../loader/Loader.js';
import '../../../css/Cards.css';
import { updateUserCredentials } from '../../actions/UserDataActions.js';
import { verifyReset } from '../../actions/RegistrationActions.js';


const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    checkingReset: state.registration.checkingReset,
    resetValid: state.registration.resetValid,
    resetUser: state.registration.resetUser,
    resetToken: state.registration.resetToken
  };
}
var mapDispatchToProps = function (dispatch) {
  return {
    replace: (path) => { dispatch(replace(path)) },
    verifyResetCode: (code) => { dispatch(verifyReset(code)) },
    updateUserCredentials: (data, token) => { dispatch(updateUserCredentials(data, token)) }
  }
};

class ResetPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      confirmNewPassword: '',
      passwordsMatch: true
    };
  }
  componentWillMount() {
    window.scrollTo(0, 0);

    // Make the verification request to the database
    if (this.props.match.params.reset_key) {
      this.props.verifyResetCode(this.props.match.params.reset_key);
    }
    else {
      // This should never happen
      this.props.replace('/');
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.token) {
      this.props.replace('/profile');
    }
  }

  _checkPasswords(pass = null, conf = null) {
    pass = pass || this.state.newPassword;
    conf = conf || this.state.confirmNewPassword;

    if (pass && conf && pass !== conf) {
      this.setState({ passwordsMatch: false });
    }
    else {
      this.setState({ passwordsMatch: true });
    }
  }
  _keyPress(evt) {
    if (evt.key === "Enter") {
      this._resetPassword();
    }
  }
  _resetPassword() {
    if (!this.state.passwordsMatch || !this.state.newPassword) {
      return;
    }
    else {
      this.props.updateUserCredentials({ password: window.btoa(this.state.newPassword) }, this.props.resetToken);
      this.setState({ newPassword: '', confirmNewPassword: '' })
      //this.props.replace('/signin');
    }
  }


  render() {
    return (
      <div>
        <section className="landing_image image5">
          <main className="page_title">
            <h1>Password Reset</h1>
            <h3>Choose a New Password</h3>
          </main>
        </section>
        <div>
          {this.props.checkingReset &&
            <section>
              <Loader />
            </section>
          }
          {this.props.resetValid &&
            <section>
              <div className="structured_panel">
                <label>New Password</label>
                <input type="password"
                  className={(!this.state.passwordsMatch ? "error" : "")}
                  value={this.state.newPassword}
                  onBlur={() => this._checkPasswords()}
                  onChange={(evt) => { this.setState({ newPassword: evt.target.value }); this._checkPasswords(evt.target.value, this.state.confirmNewPassword); }}
                />
                <label style={{ marginTop: '1rem' }}>Confirm New Password</label>
                <input type="password"
                  className={(!this.state.passwordsMatch ? "error" : "")}
                  value={this.state.confirmNewPassword}
                  onKeyPress={this._keyPress.bind(this)}
                  onBlur={() => this._checkPasswords()}
                  onChange={(evt) => { this.setState({ confirmNewPassword: evt.target.value }); this._checkPasswords(this.state.newPassword, evt.target.value); }}
                />
                {this.state.newPassword && !this.state.passwordsMatch && (<span className="validation_error">Passwords Don't Match</span>)}
                <div className="button se_button"
                  style={{ marginTop: '2rem' }}
                  disabled={!this.state.newPassword || !this.state.confirmNewPassword || !this.state.passwordsMatch}
                  onClick={() => this._resetPassword()}
                >
                  <span>RESET PASSWORD</span>
                </div>
              </div>
            </section>
          }
          {!this.props.checkingReset && !this.props.resetValid &&
            <section>
              <h1>Oops,</h1>
              <p>Your password reset link is invalid or has expired.</p>
            </section>
          }
          <Footer />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPage);
