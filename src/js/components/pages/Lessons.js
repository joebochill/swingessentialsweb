import React, { Component } from 'react';
import {connect} from 'react-redux';
import LessonRow from '../rows/LessonRow.js';
import {replace} from 'react-router-redux';
//import Loader from '../loader/Loader.js';
import Placeholder from '../rows/Placeholder.js';
import CardRow from '../rows/CardRow.js';
import Footer from '../footer/Footer.js';
import {setTargetRoute} from '../../actions/NavigationActions.js';
import {getLessons} from '../../actions/LessonActions.js';
import {formatDate} from '../../utils/utils.js';

import '../../../css/Cards.css';

const mapStateToProps = (state)=>{
  return {
    token: state.login.token,
    lessons: state.lessons,
    credits: state.credits,
    admin: state.login.admin
  };
}
var mapDispatchToProps = function(dispatch){
  return {
    goToSignIn: () => {dispatch(replace('/signin'));},
    getLessons: (token) => {dispatch(getLessons(token))},
    // getCredits: (token) => {dispatch(getCredits(token))},
    setTargetRoute: (route) => {dispatch(setTargetRoute(route))},
    // redeemCredit: (type, data, token) => {dispatch(redeemCredit(type, data, token))}
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

      // if the credits list is empty, do a fetch for new credits
      // if(!this.props.credits.count && !this.props.credits.unlimited && !this.props.credits.unlimitedExpires){
      //   this.props.getCredits(this.props.token);
      // }
    }
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.token){
      //this.props.setTargetRoute('/lessons');
      this.props.goToSignIn();
    }
  }

  // _formatUnlimited(){
  //   let unlimitedRemaining = (this.props.credits.unlimitedExpires - (Date.now()/1000));
    
  //   if(unlimitedRemaining > 24*60*60){
  //     return Math.ceil(unlimitedRemaining/(24*60*60)) + " Days";
  //   }
  //   else if(unlimitedRemaining > 60*60){
  //     return Math.ceil(unlimitedRemaining/(60*60)) + " Hours";
  //   }
  //   else if(unlimitedRemaining > 0){
  //     return Math.ceil(unlimitedRemaining/60) + " Minutes";
  //   }
  //   else{
  //     return (this.props.credits.unlimited ? this.props.credits.unlimited : "0") + " Rounds";
  //   }
  // }


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
        {(!this.props.admin && !loading && !this.props.lessons.closed.length && !this.props.lessons.pending.length) && 
            <section>
              <h1>You haven't submitted any lessons!</h1>
              <p>Download our app today. Your first lesson is free!</p>
              <div className="multi_col">
                <div className="button apple_store" onClick={()=>alert('Coming Soon!')}/>
                <div className="button google_store" onClick={()=>alert('Coming Soon!')}/>
              </div>
            </section>
          }
          <section>
            <div className="structured_panel">
              <div className="card">
                <div className="card_header">
                  <span>In Progress</span>
                  <span onClick={() => this.props.getLessons(this.props.token)}>REFRESH</span>
                </div>
                <div className="card_body">
                  {(!this.props.lessons.pending.length || loading) &&
                    <Placeholder message={loading?"Loading...":"No Lessons In Progress"} loading={loading}/>
                  }
                  {this.props.lessons.pending.length > 0 && this.props.lessons.pending.map((lesson)=>
                    <LessonRow key={lesson.request_id} title={formatDate(lesson.request_date)} id={lesson.request_url} extra={this.props.admin ? lesson.username : null}/>
                  )}
                </div>
              </div>
              <div className="card">
                <div className="card_header">
                  <span>Completed</span>
                  <span onClick={() => this.props.getLessons(this.props.token)}>REFRESH</span>
                </div>
                <div className="card_body">
                  {(!this.props.lessons.closed.length || loading) &&
                    <Placeholder message={loading?"Loading...":"No Completed Lessons"} loading={loading}/>
                  }
                  {this.props.lessons.closed.length > 0 && this.props.lessons.closed.map((lesson)=>
                    <LessonRow key={lesson.request_id} title={formatDate(lesson.request_date)} new={parseInt(lesson.viewed,10)===0} extra={this.props.admin ? lesson.username : parseInt(lesson.viewed,10)===0 ? "NEW!" : ""} id={lesson.request_url}/>
                  )}
                </div>
              </div>
            </div>
          </section>
          {/* <section>
            <div className="structured_panel">
            <div className="card">
                <div className="card_header">
                  <span>Redeem a Lesson</span>
                  <span>REFRESH</span>
                </div>
                <div className="card_body">
                  <CardRow go 
                    title={'Individual Lesson'} 
                    extra={`${this.props.credits.count} Left`} 
                    disabled={!this.props.credits.count} 
                    className={"noflex"} 
                    action={()=>this.props.redeemCredit('single', null, this.props.token)}
                  />
                  <CardRow go 
                    title={'Unlimited Deal'} 
                    extra={`${this._formatUnlimited()} Left`} 
                    disabled={(this.props.credits.unlimitedExpires < (Date.now()/1000) && !this.props.credits.unlimited)}
                    className={"noflex"} 
                    action={()=>this.props.redeemCredit('unlimited', null, this.props.token)}
                  />
                </div>
              </div>
            </div>
          </section> */}
            {!this.props.admin && 
              <section>
                <div className="structured_panel">
                  <div className="card">
                    <div className="card_header">
                      <span>Unlimited Lessons</span>
                      <span>45 Days Left</span>
                    </div>
                    <div className="card_body">
                      <CardRow go 
                        title={'Submit a Swing'} 
                        className={"noflex"} 
                      />
                    </div>
                  </div>
                  <div className="card">
                    <div className="card_header">
                      <span>Redeem a Lesson</span>
                      <span></span>
                    </div>
                    <div className="card_body">
                      <CardRow go 
                        title={'Individual Lesson'} 
                        extra={'5 Left'}
                        className={"noflex"} 
                      />
                      <CardRow  
                        go
                        title={'Activate Unlimited'} 
                        extra={'2 Left'} 
                        className={"noflex"} 
                      />
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

export default connect(mapStateToProps,mapDispatchToProps)(LessonsPage);
