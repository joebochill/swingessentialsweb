import React, { Component } from 'react';
import {connect} from 'react-redux';
import {replace} from 'react-router-redux';
import YoutubeVideo from '../youtube/YoutubeVideo.js';
import Footer from '../footer/Footer.js';
import Loader from '../loader/Loader.js';
import {formatDate} from '../../utils/utils.js';
//import YouTube from 'react-youtube';

import { setTargetRoute, getLessons, getVideoLinks, clearVideoLinks } from '../../actions/actions';

const mapStateToProps = (state)=>{
  return {
    username: state.userData.username,
    token: state.login.token,
    lessons: state.lessons,
    admin: state.login.admin,
    linking: state.lessons.linking,
    linked: state.lessons.linked
  };
}
var mapDispatchToProps = function(dispatch){
  return {
    goToSignIn: () => {dispatch(replace('/signin'));},
    setTargetRoute: (route) => {dispatch(setTargetRoute(route))},
    getLessons: (token) => {dispatch(getLessons(token))},
    goToLessons: () => {dispatch(replace('/lessons'))},
    getVideoLinks: (token, id) => {dispatch(getVideoLinks(token, id))},
    clearVideoLinks: () => {dispatch(clearVideoLinks())}
  }
};

class LessonResponsePage extends Component {
  componentWillMount(){
    if(!this.props.token){
      // user is not logged in. store the request and send to signin screen
      this.props.setTargetRoute('/lessons/'+this.props.match.params.lesson_id);
      this.props.goToSignIn();
    }
    else{
      // user is logged in, verify the requested lesson against their list
      window.scrollTo(0,0);
      this._verifyLesson();
      this.props.getVideoLinks(this.props.token,this.props.match.params.lesson_id);
    }
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.token){
      // if user has logged out, send them to signin
      this.props.goToSignIn();
    }
    else{
      if(!nextProps.lessons.loading){
        // if we've received props and have finished loading, verify the lesson request
        // if we haven't finished loading, we will get another receiveProps when we have
        this._verifyLesson(nextProps.lessons);
      }
    }
  }

  componentWillUnmount(){
    this.props.clearVideoLinks();
  }

  // converts a DB stored string into paragraphs (we do not store html in the database, just text)
  _convertTextToP(string){
    let array = string.split(":::");
    return array.map((val, index)=><p key={index}>{val}</p>);
  }

  // checks if the requested lessons is in the user's list
  _verifyLesson(less=null){
    const lid = this.props.match.params.lesson_id;
    let lessons;

    // list of lessons is being passed in (from a nextProps object)
    if(less){
      lessons = less.closed.concat(less.pending);
    }
    // check if there are lessons in localstorage
    else if(!this.props.lessons.closed.length && !this.props.lessons.pending.length){
      const ls = JSON.parse(localStorage.getItem('lessons'));
      if(ls === null){
       // nothing in localstorage or current props, wait for another cycle
       return;
      }
      else{
        // lessons are available from localstorage
        lessons = (ls) ? ls.closed.concat(ls.pending) : [];
      }
    }
    else{
      // lessons are available in current props
      lessons = this.props.lessons.closed.concat(this.props.lessons.pending);
    }

    // loop through the lessons and look for the current request (lid)
    for(let i = 0; i < lessons.length; i++){
      if(lessons[i].request_url === lid){
        this.lesson=lessons[i];
        break;
      }
    }

    // if the user is not permitted to see this lesson (or it is not a valid lesson), send them to lessons page
    if(!this.lesson){
      this.props.goToLessons();
      return;
    }  
  }

  render() {
    if(!this.lesson){
      return (
        <section className="left">
          <div style={{marginTop:'3rem'}}>
              <p>Loading Lessons...</p>
              <Loader/>
          </div>
        </section>
      )
    }
    return (
      <div>
        <section className="landing_image image2">
          <main className="page_title">
            <h1>{formatDate(this.lesson.request_date)}</h1>
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
          {!this.props.admin &&
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
          }
          {this.props.admin && !this.props.linking && this.props.linked &&
            <section className="left">
              <div className="structured_panel">
                <h1>Your Swing Videos</h1>
                <div className="se_multi_video">
                  <div className="se_video_flex">
                    <video width="100%" controls src={'http://www.josephpboyle.com/securevideos/'+this.lesson.request_url+'/'+this.lesson.fo_swing}>
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="se_video_flex">
                    <video width="100%" controls src={'http://www.josephpboyle.com/securevideos/'+this.lesson.request_url+'/'+this.lesson.dtl_swing}>
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            </section>
          }
          {this.props.admin && this.props.linking &&
            <section className="left">
              <div className="structured_panel">
                <h1>Your Swing Videos</h1>
                <div className="se_multi_video">
                  <div className="se_video_flex">
                    <Loader/>
                  </div>
                  <div className="se_video_flex">
                    <Loader/>
                  </div>
                </div>
              </div>
            </section>
          }
          <Footer/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LessonResponsePage);
