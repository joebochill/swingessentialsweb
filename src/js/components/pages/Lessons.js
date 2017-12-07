import React, { Component } from 'react';
import {connect} from 'react-redux';
import LessonRow from '../lessons/LessonRow.js';
import {replace} from 'react-router-redux';
//import Loader from '../loader/Loader.js';
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
                {(!this.props.lessons.pending.length || loading) &&
                  <Placeholder message={loading?"Loading...":"No Lessons In Progress"} loading={loading}/>
                }
                {this.props.lessons.pending.length > 0 && this.props.lessons.pending.map((lesson)=>
                  <LessonRow key={lesson.request_id} title={lesson.request_date} id={lesson.request_id}/>
                )}
                {/* {//!loading && 
                  <svg className={"refresh_icon " + (loading?"loading":"")} viewBox="0 0 24 24" onClick={()=>this.props.getLessons(this.props.token)}>
                    <path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                  </svg>
                } */}
                {/* {loading && <Loader float top=".3rem" right="1rem" size="0.5rem"/>} */}
              </div>
              <div className="lesson_group">
                <h1>Completed</h1>
                {(!this.props.lessons.closed.length || loading) &&
                  <Placeholder message={loading?"Loading...":"No Completed Lessons"} loading={loading}/>
                }
                {this.props.lessons.closed.length > 0 && this.props.lessons.closed.map((lesson)=>
                  <LessonRow key={lesson.request_id} title={lesson.request_date} new={parseInt(lesson.viewed,10)===0} extra={parseInt(lesson.viewed,10)===0 ? "NEW!" : ""} id={lesson.request_id}/>
                )}
              </div>
            </div>
          </section>
          {(!loading && !this.props.lessons.closed.length && !this.props.lessons.pending.length) && 
            <section>
              <h1>You don't have any lessons!</h1>
              <p>Download our app today. Your first lesson is free!</p>
              <div className="multi_col">
                <div className="button apple_store"/>
                <div className="button google_store"/>
              </div>
            </section>
          }
          <Footer/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LessonsPage);
