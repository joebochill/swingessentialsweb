import React, { Component } from 'react';
import {connect} from 'react-redux';
import LessonRow from '../rows/LessonRow.js';
import {replace} from 'react-router-redux';
//import Loader from '../loader/Loader.js';
import Placeholder from '../rows/Placeholder.js';
import Footer from '../footer/Footer.js';
import {getLessons, setTargetRoute, redeemCredit} from '../../actions/actions.js';

import '../../../css/Cards.css';

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
    setTargetRoute: (route) => {dispatch(setTargetRoute(route))},
    redeemCredit: (type, data, token) => {dispatch(redeemCredit(type, data, token))}
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
          <section>
            <div className="structured_panel">
              <div className="card">
                <div className="card_header">
                  <span>IN PROGRESS</span>
                  <span onClick={() => this.props.getLessons(this.props.token)}>REFRESH</span>
                </div>
                <div className="card_body">
                  {(!this.props.lessons.pending.length || loading) &&
                    <Placeholder message={loading?"Loading...":"No Lessons In Progress"} loading={loading}/>
                  }
                  {this.props.lessons.pending.length > 0 && this.props.lessons.pending.map((lesson)=>
                    <LessonRow key={lesson.request_id} title={lesson.request_date} id={lesson.request_url}/>
                  )}
                </div>
              </div>
              <div className="card">
                <div className="card_header">
                  <span>COMPLETED</span>
                  <span onClick={() => this.props.getLessons(this.props.token)}>REFRESH</span>
                </div>
                <div className="card_body">
                  {(!this.props.lessons.closed.length || loading) &&
                    <Placeholder message={loading?"Loading...":"No Completed Lessons"} loading={loading}/>
                  }
                  {this.props.lessons.closed.length > 0 && this.props.lessons.closed.map((lesson)=>
                    <LessonRow key={lesson.request_id} title={lesson.request_date} new={parseInt(lesson.viewed,10)===0} extra={parseInt(lesson.viewed,10)===0 ? "NEW!" : ""} id={lesson.request_url}/>
                  )}
                </div>
              </div>
            </div>
          </section>
          <section>
          <div className="button se_button" 
                onClick={()=>this.props.redeemCredit('single', null, this.props.token)}
          >
            <span>REDEEM</span>
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
