import React, { Component } from 'react';
import {connect} from 'react-redux';
import LessonRow from '../lessons/LessonRow.js';
import {replace} from 'react-router-redux';
import {requestLogout} from '../../actions/actions.js';

import '../../../css/Lessons.css';

const mapStateToProps = (state)=>{
  return {
    username: state.userData.username,
    token: state.login.token
  };
}
var mapDispatchToProps = function(dispatch){
  return {
    goToSignIn: () => {dispatch(replace('/signin'));},
    replace: (val) => {dispatch(replace(val));},
    requestLogout: (un,tok) => {dispatch(requestLogout({username:un,token:tok}))}
  }
};

class LessonsPage extends Component {
  componentWillMount(){
    if(!this.props.username){
      this.props.goToSignIn();
    }
    else{
      window.scrollTo(0,0);
    }
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.token){
        this.props.replace('/signin');
    }
  }
  render() {
    return (
      <div>
        <section className="landing_image image2">
          <main className="page_title">
            <h1>Your Lessons</h1>
            <h3>See How Far You've Come</h3>
          </main>
        </section>
        <section className="left">
          <div className="structured_panel">
            <div className="lesson_group">
              <h1>Redeem A Lesson</h1>
              <LessonRow title="Individual" extra="2 Left" id="123" disabled/>
              <LessonRow title="Unlimited" extra="12 Days Left" id="124"/>
            </div>
            <div className="lesson_group">
              <h1>In Progress</h1>
              <LessonRow title="17-Nov-2017" id="123"/>
              <LessonRow title="10-Nov-2017" id="124"/>
            </div>
            <div className="lesson_group">
              <h1>Completed</h1>
              <LessonRow title="17-Nov-2017" new extra="NEW!" id="123"/>
              <LessonRow title="10-Nov-2017" new extra="NEW!" id="124"/>
              <LessonRow title="10-Nov-2017" id="124"/>
              <LessonRow title="10-Nov-2017" id="124"/>
              <LessonRow title="10-Nov-2017" id="124"/>
              <LessonRow title="10-Nov-2017" id="124"/>
              <LessonRow title="10-Nov-2017" id="124"/>
              <LessonRow title="10-Nov-2017" id="124"/>
              <LessonRow title="10-Nov-2017" id="124"/>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LessonsPage);
