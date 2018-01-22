import React, { Component } from 'react';
import {connect} from 'react-redux';
import {replace} from 'react-router-redux';
import YoutubeVideo from '../youtube/YoutubeVideo.js';
import Footer from '../footer/Footer.js';
import Loader from '../loader/Loader.js';
import {formatDate} from '../../utils/utils.js';

import { setTargetRoute } from '../../actions/NavigationActions.js';
import { getLessons, putLessonResponse, markLessonViewed } from '../../actions/LessonActions.js';

const mapStateToProps = (state)=>{
  return {
    username: state.userData.username,
    token: state.login.token,
    lessons: state.lessons,
    admin: state.login.admin
  };
}
var mapDispatchToProps = function(dispatch){
  return {
    goToSignIn: () => {dispatch(replace('/signin'));},
    setTargetRoute: (route) => {dispatch(setTargetRoute(route))},
    getLessons: (token) => {dispatch(getLessons(token))},
    goToLessons: () => {dispatch(replace('/lessons'))},
    putLessonResponse: (data,token) => {dispatch(putLessonResponse(data,token))},
    markViewed: (id, token) => {dispatch(markLessonViewed(id, token))}
  }
};

class LessonResponsePage extends Component {
  constructor(props){
    super(props);
    this.state={
      editingResponse: false,
      responseURL: '',
      responseNotes: '',
      responseStatus: ''
    };
  }

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
      //this.props.getVideoLinks(this.props.token,this.props.match.params.lesson_id);
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
    //this.props.clearVideoLinks();
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
    else{
      // If the user is viewing the lesson, mark it viewed
      if(this.lesson.viewed === "0" && !this.props.admin){
        this.props.markViewed({id:this.lesson.request_id}, this.props.token);
      }
      
      this.setState({
        responseURL: (this.state.responseURL) ? this.state.responseURL : (this.lesson.response_video || ''),
        responseNotes: (this.state.responseNotes) ? this.state.responseNotes : (this.lesson.response_notes || ''),
        responseStatus: (this.state.responseStatus) ? this.state.responseStatus : (this.lesson.response_status || 'good')
      })
    }
  }

  _sendUpdate(){
    if(!this.lesson){return;}
    
    const data = {
      lesson_id: this.lesson['request_id'],
      username: this.lesson['username'],
      response_video: this.state.responseURL,
      response_notes: this.state.responseNotes,
      response_status: this.state.responseStatus
    };

    this.props.putLessonResponse(data, this.props.token);
    this.setState({editingResponse: false});
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
          {this.lesson && this.lesson.response_status && this.lesson.response_status==="rejected" &&
            <section className="left">
              <div className="structured_panel">
                <h1>Comments</h1>
                {this._convertTextToP(this.lesson.response_notes)}
              </div>
            </section>
          }
          <section className="left">
            <div className="structured_panel">
              <h1>{this.props.admin ? "Swing Videos" : "Your Swing Videos"}</h1>
              <div className="se_multi_video">
                <div className="se_video_flex">
                  {/* {(!this.props.linking && this.props.linked) ? */}
                    <video width="100%" controls src={'http://www.josephpboyle.com/video_links/'+this.lesson.request_url+'/'+this.lesson.fo_swing}>
                      Your browser does not support the video tag.
                    </video>
                    {/* : ((this.props.linking) ? */}
                    {/* <Loader/> */}
                    {/* : <span>Failed to load video. Try refreshing your browser.</span> */}
                  {/* )} */}
                </div>
                <div className="se_video_flex">
                {/* {(!this.props.linking && this.props.linked) ? */}
                  <video width="100%" controls src={'http://www.josephpboyle.com/video_links/'+this.lesson.request_url+'/'+this.lesson.dtl_swing}>
                    Your browser does not support the video tag.
                  </video>
                  {/* : (this.props.linking) ? */}
                  {/* <Loader/> */}
                  {/* : <span>Failed to load video. Try refreshing your browser.</span> */}
                  {/* } */}
                </div>
              </div>
            </div>
          </section>
          {this.props.admin && !this.state.editingResponse &&
            <section>
              <div className="structured_panel">
                <div className="button se_button" 
                      onClick={()=>this.setState({editingResponse: true})}
                >
                  <span>{this.lesson.response_status ? "EDIT RESPONSE" : "CREATE RESPONSE"}</span>
                </div>
              </div>
            </section>
          }
          {this.props.admin && this.state.editingResponse &&
            <section>
              <div className="structured_panel">
                <label>Response Video ID</label>
                <input 
                  placeholder="Youtube ID"
                  value={this.state.responseURL} 
                  onChange={(evt)=>this.setState({responseURL:evt.target.value})} 
                />
                <label style={{marginTop: '1rem'}}>Response Notes</label>
                <textarea 
                  placeholder="Add any comments here..."
                  value={this.state.responseNotes} 
                  onChange={(evt)=>this.setState({responseNotes:evt.target.value})} 
                />
                <label style={{marginTop: '1rem'}}>Response Status</label>
                <select value={this.state.responseStatus} onChange={(evt)=>this.setState({responseStatus: evt.target.value})}>
                  <option value='good'>Accepted</option>
                  <option value='rejected'>Rejected</option>
                </select>
                <div className="button se_button"  style={{marginTop: '2rem'}}
                  onClick={()=>this.setState({responseURL:'', response_status:'good', responseNotes:'', editingResponse: false})}
                >
                  <span>CANCEL</span>
                </div>
                <div className="button se_button"  style={{marginTop: '1rem'}}
                  onClick={()=>this._sendUpdate()}
                  disabled={!this.state.responseURL}
                >
                  <span>SUBMIT</span>
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
