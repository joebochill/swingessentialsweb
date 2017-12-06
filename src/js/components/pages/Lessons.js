import React, { Component } from 'react';
import {connect} from 'react-redux';
import LessonRow from '../lessons/LessonRow.js';
import {replace} from 'react-router-redux';
import Loader from '../loader/Loader.js';
import Placeholder from '../lessons/Placeholder.js';
import Footer from '../footer/Footer.js';
import {getLessons, setTargetRoute} from '../../actions/actions.js';

import '../../../css/Lessons.css';

const mapStateToProps = (state)=>{
  return {
    token: state.login.token,
    lessons: state.lessons
  };
}
var mapDispatchToProps = function(dispatch){
  return {
    goToSignIn: () => {dispatch(replace('/signin'));},
    getLessons: (token) => {dispatch(getLessons(token))},
    setTargetRoute: (route) => {dispatch(setTargetRoute(route))}
  }
};

class LessonsPage extends Component {
  componentWillMount(){
    if(!this.props.token){
      this.props.setTargetRoute('/lessons');
      this.props.goToSignIn();
    }
    else{
      window.scrollTo(0,0);
      
      // if both lesson arrays are empty, do a fetch for new lessons
      if(!this.props.lessons.closed.length && !this.props.lessons.pending.length){
        this.props.getLessons(this.props.token);
      }
    }
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.token){
      //this.props.setTargetRoute('/lessons');
      this.props.goToSignIn();
    }
  }
  render() {
    const loading = this.props.lessons.loading;
    return (
      <div>
        <section className="landing_image image2">
          <main className="page_title">
            <h1>Your Lessons</h1>
            <h3>See How Far You've Come</h3>
          </main>
        </section>
        <div>
          {(!loading && !this.props.lessons.closed.length && !this.props.lessons.pending.length) && 
            <section>
              <h1>You Don't Have Any Lessons!</h1>
              <div className="structured_panel">
                <p>Shake off the cobwebs - sign up for a lesson now:</p>
                <div className="button se_button"><span>ORDER A LESSON</span></div>
                <div className="button se_button"><span>REDEEM A LESSON</span></div>
              </div>
            </section>
          }
          <section className="left">
            {/* {loading && 
              <div>
                  <p>{(!this.props.lessons.closed.length && !this.props.lessons.pending.length) ? "Loading Lessons" : "Refreshing Lessons"}</p>
                  <Loader/>
              </div>
            } */}
            <div className="structured_panel">
              {false && <div className="lesson_group">
                <h1>Redeem A Lesson</h1>
                <LessonRow title="Individual" extra="2 Left" id="123" disabled/>
                <LessonRow title="Unlimited" extra="12 Days Left" id="124"/>
              </div>
              }
              <div className="lesson_group">
                <h1>In Progress</h1>
                {this.props.lessons.pending.length > 0 && this.props.lessons.pending.map((lesson)=>
                  <LessonRow key={lesson.request_id} title={lesson.request_date} id={lesson.request_id}/>
                )}
                {!this.props.lessons.pending.length &&
                  <Placeholder message={loading?"Loading...":"No Lessons In Progress"} loading={loading}/>
                }
                {!loading && 
                  <svg className="refresh_icon" viewBox="0 0 24 24" onClick={()=>this.props.getLessons(this.props.token)}>
                    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                  </svg>
                }
                {loading && <Loader float top=".3rem" right="1rem" size="0.5rem"/>}
              </div>
              <div className="lesson_group">
                <h1>Completed</h1>
                {this.props.lessons.closed.length > 0 && this.props.lessons.closed.map((lesson)=>
                  <LessonRow key={lesson.request_id} title={lesson.request_date} new={parseInt(lesson.viewed,10)===0} extra={parseInt(lesson.viewed,10)===0 ? "NEW!" : ""} id={lesson.request_id}/>
                )}
                {!this.props.lessons.closed.length &&
                  <Placeholder message={loading?"Loading...":"No Completed Lessons"} loading={loading}/>
                }
              </div>
            </div>
          </section>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LessonsPage);
