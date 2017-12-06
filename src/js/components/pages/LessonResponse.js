import React, { Component } from 'react';
import {connect} from 'react-redux';
import {replace} from 'react-router-redux';
import YoutubeVideo from '../youtube/YoutubeVideo.js';
import Footer from '../footer/Footer.js';
//import YouTube from 'react-youtube';

import '../../../css/Lessons.css';
import { setTargetRoute, getLessons } from '../../actions/actions';

const mapStateToProps = (state)=>{
  return {
    username: state.userData.username,
    token: state.login.token,
    lessons: state.lessons
  };
}
var mapDispatchToProps = function(dispatch){
  return {
    goToSignIn: () => {dispatch(replace('/signin'));},
    setTargetRoute: (route) => {dispatch(setTargetRoute(route))},
    getLessons: (token) => {dispatch(getLessons(token))},
    goToLessons: () => {dispatch(replace('/lessons'))}
  }
};

class LessonResponsePage extends Component {
  componentWillMount(){
    if(!this.props.token){
      this.props.setTargetRoute('/lessons/'+this.props.match.params.lesson_id);
      this.props.goToSignIn();
    }
    else{
      window.scrollTo(0,0);
      this._verifyLesson();
    }
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.token){
      //this.props.setTargetRoute('/lessons/'+this.props.match.params.lesson_id);
      this.props.goToSignIn();
    }
    else{
      this._verifyLesson(nextProps.lessons);
    }
  }

  _convertTextToP(string){
    let array = string.split(":::");
    return array.map((val, index)=><p key={index}>{val}</p>);
  }
  _verifyLesson(less=null){
    const lid = this.props.match.params.lesson_id;
    let lessons;
    if(less){lessons = less;}
    else if(!this.props.lessons.closed.length && !this.props.lessons.pending.length){
      const ls = JSON.parse(localStorage.getItem('lessons'));
      lessons = (ls) ? ls.closed.concat(ls.pending) : [];
    }
    else{
      lessons = this.props.lessons.closed.concat(this.props.lessons.pending);
    }

    for(let i = 0; i < lessons.length; i++){
      if(lessons[i].request_id === lid){
        this.lesson=lessons[i];
        break;
      }
    }
    if(!this.lesson){
      this.props.goToLessons();
    }  
  }

  render() {
    if(!this.lesson){return null;}
    return (
      <div>
        <section className="landing_image image2">
          <main className="page_title">
            <h1>{this.lesson.request_date}</h1>
            <h3>Swing Analysis</h3>
          </main>
        </section>
        <div>
          {this.lesson && this.lesson.response_status && this.lesson.response_status==="good" &&
            <section className="left">
              <div className="structured_panel">
                <h1>Video Response</h1>
                <YoutubeVideo vid={this.lesson.response_video}/>
                <h1>Comments</h1>
                {this._convertTextToP(this.lesson.response_notes)}
              </div>
            </section>
          }
          <section className="left">
            <div className="structured_panel">
              <h1>Your Swing Videos</h1>
              <div className="se_multi_video">
                <div className="se_video_flex">
                  <YoutubeVideo vid={this.lesson.dtl_swing}/>
                </div>
                <div className="se_video_flex">
                  <YoutubeVideo vid={this.lesson.fo_swing}/>
                </div>
              </div>
            </div>
          </section>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LessonResponsePage);
