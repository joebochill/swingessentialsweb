import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replace } from 'connected-react-router';
import Footer from '../footer/Footer.js';
import { getToday, convertLineToText } from '../../utils/utils.js';

import { putLessonResponse } from '../../actions/LessonActions.js';
import { getUsers } from '../../actions/UserDataActions.js';

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    admin: state.login.admin,
    users: state.userData.users
  };
}
var mapDispatchToProps = function (dispatch) {
  return {
    getUsers: (token) => { dispatch(getUsers(token)); },
    goToSignIn: () => { dispatch(replace('/signin')); },
    goToLessons: () => { dispatch(replace('/lessons')) },
    putLessonResponse: (data, token) => { dispatch(putLessonResponse(data, token)) }
  }
};

class FreeLessonPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responseURL: '',
      date: getToday(),
      responseNotes: ''
    };
  }

  componentWillMount() {
    if (!this.props.admin) {
      this.props.goToLessons();
    }
    else {
      this.props.getUsers(this.props.token);
      window.scrollTo(0, 0);

    }
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.token) {
      // if user has logged out, send them to signin
      this.props.goToSignIn();
    }
    else {

    }
  }

  componentWillUnmount() {
  }

  _sendUpdate() {
    if (!this._checkFields()) { return; }

    const data = {
      lesson_id: -1,
      username: this.state.username,
      date: this.state.date,
      response_video: this.state.responseURL,
      response_notes: convertLineToText(this.state.responseNotes),
      response_status: 'good'
    };

    this.props.putLessonResponse(data, this.props.token);
    this.props.goToLessons();
  }

  _checkFields() {
    if (!this.state.date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/) || isNaN(Date.parse(this.state.date)) || !this.state.username || !this.state.responseURL) {
      return false;
    }
    else {
      return true;
    }
  }

  render() {
    return (
      <div>
        <section className="landing_image image2">
          <main className="page_title">
            <h1>In-Person Lesson</h1>
            <h3>Swing Analysis</h3>
          </main>
        </section>
        <div>
          <section>
            <div className="structured_panel">
              <label>User</label>
              <select value={this.state.username} onChange={(evt) => this.setState({ username: evt.target.value })}>
                <option value=''>Choose a User</option>
                {this.props.users && this.props.users.length > 0 && this.props.users.map((user) =>
                  <option key={user.username} value={user.username}>{`${user.last}, ${user.first} (${user.username})`}</option>
                )}
              </select>
              <label style={{ marginTop: '2rem' }}>Date</label>
              <input type="text"
                value={this.state.date}
                placeholder={'YYYY-MM-DD'}
                onChange={(evt) => { this.setState({ date: evt.target.value }); }}
              />
              <label style={{ marginTop: '2rem' }}>Response Video ID</label>
              <input
                placeholder="Youtube ID"
                value={this.state.responseURL}
                maxlength={128}
                onChange={(evt) => this.setState({ responseURL: evt.target.value })}
              />
              <label style={{ marginTop: '2rem' }}>Response Notes</label>
              <textarea
                placeholder="Add any comments here..."
                value={this.state.responseNotes}
                maxlength={500}
                onChange={(evt) => this.setState({ responseNotes: evt.target.value })}
              />
              <span style={{ display: 'block', color: '#231f61', fontSize: '.7rem', textAlign: 'right' }}>
                Characters Left: <b style={{ fontWeight: '600' }}>{500 - this.state.responseNotes.length}</b>
              </span>

              <div className="button se_button" style={{ marginTop: '1rem' }}
                onClick={() => this._sendUpdate()}
                disabled={!this._checkFields()}
              >
                <span>SUBMIT</span>
              </div>

            </div>
          </section>
          <Footer />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FreeLessonPage);
