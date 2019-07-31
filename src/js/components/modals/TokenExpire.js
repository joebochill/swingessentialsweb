import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { closeModal } from '../../actions/modalActions.js';
import '../../../css/Modals.css';
import { refreshToken, requestLogout } from '../../actions/LoginActions';

const mapStateToProps = (state) => {
  return {
    token: state.login.token
  };
}
var mapDispatchToProps = function (dispatch) {
  return {
    closeModal: () => { dispatch(closeModal()); },
    goToSignIn: () => { dispatch(push('/signin')); },
    refreshToken: (token) => { dispatch(refreshToken(token)) },
    logout: (token) => { dispatch(requestLogout(token)) }
  };
};

class TokenExpireModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: ''
    }
  }
  componentDidMount() {
    if (this.props.token) {
      this.tokenTimer = setInterval(() => this._checkTokenTimeout(), 1000);//5*60*1000);
      this.exp = JSON.parse(window.atob(this.props.token.split('.')[1])).exp;
    }
  }
  componentWillUnmount() {
    if (this.tokenTimer) { clearInterval(this.tokenTimer); }
  }

  _cancel(evt) {
    this.closing = true;
    this.forceUpdate();
    setTimeout(() => this.props.closeModal(), 400);
  }

  _okay(evt) {
    this.props.refreshToken(this.props.token);

    this._cancel(evt);
  }

  // Periodically checks the token timeout and will show a renew dialog if the time is < 5 minutes, < 2 minutes
  _checkTokenTimeout() {
    if (!this.props.token) {
      if (this.tokenTimer) { clearInterval(this.tokenTimer); }
      return;
    }
    let remaining = this.exp - Date.now() / 1000;

    if (remaining <= 0) {
      if (this.tokenTimer) { clearInterval(this.tokenTimer); }
      this.props.logout();
      this._cancel();
    }

    let min = Math.floor(remaining / 60);
    min = (min < 10) ? '0' + min : min;
    let sec = Math.floor(remaining - min * 60);
    sec = (sec < 10) ? '0' + sec : sec;

    remaining = min + ':' + sec;
    this.setState({ time: remaining });
  }

  _formatTime() {

  }

  render() {
    return (
      <div className={"modal_overlay" + (this.closing ? " closing" : "")}>
        <div className="modal" style={{ maxWidth: '30rem' }}>
          <header className="modal_header">
            <span>{'Session Expiration In: ' + this.state.time}</span>
            <span style={{ flex: '1 1 0rem' }} />
            {/* <svg viewBox="0 0 20 20" className="close_modal" onClick={this._cancel.bind(this)}>
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg> */}
          </header>
          <div className="modal_body">
            <p>Your session is about to expire. Click below to stay logged in.</p>
          </div>
          <div className="modal_footer">
            <div className="button se_button" onClick={this._okay.bind(this)}>KEEP ME LOGGED IN</div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TokenExpireModal);