import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from '../header/Header.js';
import Footer from '../footer/Footer.js';
import {replace} from 'react-router-redux';
import {requestLogout} from '../../actions/actions.js';
import YoutubeVideo from '../youtube/YoutubeVideo.js';

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

class LessonResponsePage extends Component {
  componentWillMount(){
    if(!this.props.token){
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
    //console.log(this.props.match.params.lesson_id);
    return (
      <div>
      <Header/>
      <section className="landing_image image2">
        <main className="page_title">
          <h1>10-Nov-2017</h1>
          <h3>Swing Analysis</h3>
        </main>
      </section>
      <section className="left">
        <div className="structured_panel">
          <h1>Video Response</h1>
          <YoutubeVideo vid="PXsqucHINWY"/>
          <h1>Comments</h1>
          <p>You’re doing a great job with your backswing, but your front- and mid-swing need a little adjustment. Try holding the club tighter so it doesn’t fly out of your hands. Happy Swinging.</p>
          <p>-AJ</p>
        </div>
      </section>
      <section className="left">
        <div className="structured_panel">
          <h1>Your Swing Videos</h1>
          <div className="se_multi_video">
            <div className="se_video_flex">
              <YoutubeVideo vid="PXsqucHINWY"/>
            </div>
            <div className="se_video_flex">
              <YoutubeVideo vid="PXsqucHINWY"/>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LessonResponsePage);
