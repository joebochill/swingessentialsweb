import React, { Component } from 'react';
import { connect } from 'react-redux';
import LessonRow from '../rows/LessonRow.js';
import { replace, push } from 'connected-react-router';
//import Loader from '../loader/Loader.js';
import Placeholder from '../rows/Placeholder.js';
import CardRow from '../rows/CardRow.js';
import Footer from '../footer/Footer.js';
import Paginator from '../paginator/Paginator.js';

import { setTargetRoute } from '../../actions/NavigationActions.js';
import { getLessons, getCredits } from '../../actions/LessonActions.js';
import { getUsers } from '../../actions/UserDataActions.js';
import { formatDate } from '../../utils/utils.js';
import { openModal } from '../../actions/modalActions.js';

import '../../../css/Cards.css';

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    lessons: state.lessons,
    credits: state.credits,
    admin: state.login.admin,
    users: state.userData.users
  };
}
var mapDispatchToProps = function (dispatch) {
  return {
    goToSignIn: () => { dispatch(replace('/signin')) },
    getLessons: (token) => { dispatch(getLessons(token)) },
    getCredits: (token) => { dispatch(getCredits(token)) },
    setTargetRoute: (route) => { dispatch(setTargetRoute(route)) },
    goToOrder: () => { dispatch(push('/purchase')) },
    goToRedeem: () => { dispatch(push('/redeem')) },
    openModal: (modal) => { dispatch(openModal(modal)) },
    goToFree: () => { dispatch(push('/newlesson')); },
    getUsers: (token) => { dispatch(getUsers(token)); },
    // redeemCredit: (type, data, token) => {dispatch(redeemCredit(type, data, token))}
  }
};

class LessonsPage extends Component {
  constructor(props) {
    super(props);
    this.perPage = 10;
    this.state = {
      start: 0,
      timer: '',
      username: ''
    }
  }
  componentWillMount() {
    if (!this.props.token) {
      this.props.setTargetRoute('/lessons');
      this.props.goToSignIn();
    }
    else {
      this.props.getUsers(this.props.token);
      window.scrollTo(0, 0);

      // if both lesson arrays are empty, do a fetch for new lessons
      if (!this.props.lessons.closed.length && !this.props.lessons.pending.length) {
        this.props.getLessons(this.props.token);
      }

      // if the credits list is empty, do a fetch for new credits
      if (!this.props.credits.count && !this.props.credits.unlimited && !this.props.credits.unlimitedExpires) {
        this.props.getCredits(this.props.token);
      }

      // if unlimited is activated, start the timer
      if (this.props.credits.unlimitedExpires > 0) {
        this._setupTimer();
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.token) {
      //this.props.setTargetRoute('/lessons');
      this.props.goToSignIn();
    }

    if (nextProps.credits.unlimitedExpires > 0 && nextProps.credits.unlimitedExpires > Date.now() / 1000) {
      this._setupTimer();
    }
  }

  _setupTimer() {
    if (this.expireTimer) { clearInterval(this.expireTimer); }

    this._formatUnlimited();

    let remaining = this.props.credits.unlimitedExpires - Date.now() / 1000;
    if (remaining > 60 * 60 * 24) {
      // No timer for over 1 day
    }
    else if (remaining > 60 * 60 * 1) {
      this.expireTimer = setInterval(this._formatUnlimited.bind(this), 1000 * 60 * 60); //every hour
    }
    else if (remaining > 0) {
      this.expireTimer = setInterval(this._formatUnlimited.bind(this), 1000 * 60); //every minute
    }
  }

  _sortUsers(prop){
    return (userA, userB) => {
      return (userA[prop].toLowerCase() < userB[prop].toLowerCase() ? -1 : 1);
    }
  }

  /* Format the time remaining string for unlimited lesson */
  _formatUnlimited() {
    let unlimitedRemaining = (this.props.credits.unlimitedExpires - (Date.now() / 1000));
    let countdown;

    if (unlimitedRemaining > 24 * 60 * 60) {
      countdown = Math.ceil(unlimitedRemaining / (24 * 60 * 60)) + " Days Left";
    }
    else if (unlimitedRemaining > 60 * 60) {
      countdown = Math.ceil(unlimitedRemaining / (60 * 60)) + " Hours Left";
    }
    else if (unlimitedRemaining > 0) {
      const min = Math.ceil(unlimitedRemaining / 60);
      countdown = min + (min > 1 ? " Minutes Left" : " Minute Left");
    }
    else {
      countdown = '';
      if (this.expireTimer) { clearInterval(this.expireTimer); }
      this.props.getCredits(this.props.token);
    }

    this.setState({ timer: countdown });
  }


  render() {
    const { lessons, users } = this.props;
    const { start } = this.state;
    const loading = lessons.loading;

    const usersByName = users ? [...users].sort(this._sortUsers('last')) : [];
    const usersByUsername = users ? [...users].sort(this._sortUsers('username')) : [];
    const filteredLessons = this.state.username ? {
      pending: lessons.pending.filter((user) => user.username === this.state.username),
      closed: lessons.closed.filter((user) => user.username === this.state.username)
    } : lessons;


    return (
      <div>
        <section className="landing_image image2">
          <div className="page_title">
            <h1>Your Lessons</h1>
            <h3>See How Far You've Come</h3>
          </div>
        </section>
        <div>
          {this.props.admin &&
            <section>
              <div className="structured_panel">
                <div className="button se_button" style={{ marginTop: '0rem' }} onClick={() => this.props.goToFree()}>
                  <span>New In-Person Lesson</span>
                </div>
              </div>
            </section>
          }
          <section>
            <div className="structured_panel">
              {this.props.admin &&
                <>
                  <label>Filter by username:</label>
                  <select value={this.state.username} onChange={(evt) => this.setState({ username: evt.target.value })}>
                    <option value=''>Choose a User</option>
                    {this.props.users && this.props.users.length > 0 && usersByUsername.map((user) =>
                      <option key={user.username} value={user.username}>{`${user.username} (${user.last}, ${user.first})`}</option>
                    )}
                  </select>
                  <label style={{marginTop: '2rem'}}>Filter by human name:</label>
                  <select value={this.state.username} onChange={(evt) => this.setState({ username: evt.target.value })}>
                    <option value=''>Choose a User</option>
                    {this.props.users && this.props.users.length > 0 && usersByName.map((user) =>
                      <option key={user.username} value={user.username}>{`${user.last}, ${user.first} (${user.username})`}</option>
                    )}
                  </select>
                </>
              }
              {!this.props.admin && this.props.credits.unlimitedExpires > Date.now() / 1000 &&
                <div className="card">
                  <div className="card_header infinity">
                    <span>Unlimited Lessons</span>
                    <span style={{ cursor: 'default' }}>{this.state.timer}</span>
                  </div>
                  <div className="card_body">
                    <CardRow go
                      title={'Submit a Swing'}
                      className={"noflex"}
                      action={(filteredLessons.pending && filteredLessons.pending.length > 0 ?
                        () => this.props.openModal({ type: 'PENDING_SWING' })
                        :
                        () => this.props.goToRedeem()
                      )}
                    />
                    <CardRow
                      title={'Individual Lessons'}
                      extra={`${this.props.credits.count > 0 ? this.props.credits.count : '0'} Left`}
                      disabled={true}
                      className={"noflex"}
                    />
                    {this.props.credits.unlimited !== undefined &&
                      <CardRow
                        title={'Unlimited Rounds'}
                        extra={`${this.props.credits.unlimited > 0 ? this.props.credits.unlimited : '0'} Left`}
                        disabled={true}
                        className={"noflex"}
                      />
                    }
                    <CardRow
                      go
                      title={'Order More'}
                      className={"noflex"}
                      action={() => this.props.goToOrder()}
                    />
                  </div>
                </div>
              }
              {!this.props.admin && this.props.credits.unlimitedExpires <= Date.now() / 1000 &&
                <div className="card">
                  <div className="card_header">
                    <span>Redeem a Lesson</span>
                  </div>
                  <div className="card_body">
                    <CardRow go
                      title={'Individual Lessons'}
                      extra={`${this.props.credits.count > 0 ? this.props.credits.count : '0'} Left`}
                      disabled={this.props.credits.count === undefined || this.props.credits.count <= 0}
                      className={"noflex"}
                      action={() => this.props.goToRedeem()}
                    />
                    <CardRow
                      go
                      title={'Activate Unlimited'}
                      extra={`${this.props.credits.unlimited > 0 ? this.props.credits.unlimited : '0'} Left`}
                      disabled={this.props.credits.unlimited < 1}
                      className={"noflex"}
                      action={() => this.props.openModal({ type: 'ACTIVATE_UNLIMITED' })}
                    />
                    <CardRow
                      go
                      title={'Order More'}
                      className={"noflex"}
                      action={() => this.props.goToOrder()}
                    />
                  </div>
                </div>
              }
              <div className="card">
                <div className="card_header">
                  <span>In Progress</span>
                </div>
                <div className="card_body">
                  {(filteredLessons.pending.length === 0 || loading) &&
                    <Placeholder message={loading ? "Loading..." : "No Lessons In Progress"} loading={loading} />
                  }
                  {filteredLessons.pending.length > 0 && filteredLessons.pending.map((lesson) =>
                    <LessonRow key={lesson.request_id} title={formatDate(lesson.request_date)} id={lesson.request_url} extra={this.props.admin ? lesson.username : null} />
                  )}
                </div>
              </div>
              <div className="card">
                <div className="card_header">
                  <span>Completed</span>
                </div>
                <div className="card_body">
                  {(filteredLessons.closed.length === 0 || loading) &&
                    <Placeholder message={loading ? "Loading..." : "No Completed Lessons"} loading={loading} />
                  }
                  {filteredLessons.closed.length > 0 &&
                    filteredLessons.closed.slice(start, start + this.perPage)
                      .map((lesson) =>
                        <LessonRow key={lesson.request_id} title={formatDate(lesson.request_date)} new={parseInt(lesson.viewed, 10) === 0} extra={this.props.admin ? lesson.username : parseInt(lesson.viewed, 10) === 0 ? "NEW!" : ""} id={lesson.request_url} />
                      )}
                </div>
              </div>
            </div>
          </section>
          {filteredLessons.closed.length > this.perPage &&
            <section>
              <Paginator
                pages={Math.ceil(filteredLessons.closed.length / this.perPage)}
                current={start / this.perPage + 1}
                navigate={(newPage) => { this.setState({ start: (newPage - 1) * this.perPage }) }} />
            </section>
          }
          <Footer />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonsPage);
