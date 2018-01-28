import React, { Component } from 'react';
import {connect} from 'react-redux';
import LessonRow from '../rows/LessonRow.js';
import {replace, push} from 'react-router-redux';
//import Loader from '../loader/Loader.js';
import Placeholder from '../rows/Placeholder.js';
import CardRow from '../rows/CardRow.js';
import Footer from '../footer/Footer.js';
import {setTargetRoute} from '../../actions/NavigationActions.js';
import {getLessons, getCredits} from '../../actions/LessonActions.js';
import {formatDate} from '../../utils/utils.js';
import {openModal} from '../../actions/modalActions.js';

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
    goToSignIn: () => {dispatch(replace('/signin'))},
    getLessons: (token) => {dispatch(getLessons(token))},
    getCredits: (token) => {dispatch(getCredits(token))},
    setTargetRoute: (route) => {dispatch(setTargetRoute(route))},
    goToOrder: () => {dispatch(push('/purchase'))},
    goToRedeem: () => {dispatch(push('/redeem'))},
    openModal: (modal) => {dispatch(openModal(modal))}
    // redeemCredit: (type, data, token) => {dispatch(redeemCredit(type, data, token))}
  }
};

class LessonsPage extends Component {
  constructor(props){
    super(props);
    this.state={
      timer:''
    }
  }
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
      if(!this.props.credits.count && !this.props.credits.unlimited && !this.props.credits.unlimitedExpires){
        this.props.getCredits(this.props.token);
      }

      // if unlimited is activated, start the timer
      if(this.props.credits.unlimitedExpires > 0){
        this._setupTimer();
      }
    }
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.token){
      //this.props.setTargetRoute('/lessons');
      this.props.goToSignIn();
    }

    if(nextProps.credits.unlimitedExpires > 0 && nextProps.credits.unlimitedExpires > Date.now()/1000){
      this._setupTimer();
    }
  }

  _setupTimer(){
    if(this.expireTimer){clearInterval(this.expireTimer);}
    
    this._formatUnlimited();
    
    let remaining = this.props.credits.unlimitedExpires - Date.now()/1000;
    if(remaining > 60*60*24){
      // No timer for over 1 day
    }
    else if(remaining > 60*60*1){
      this.expireTimer = setInterval(this._formatUnlimited.bind(this), 1000*60*60); //every hour
    }
    else if(remaining > 0){
      this.expireTimer = setInterval(this._formatUnlimited.bind(this), 1000*60); //every minute
    }
  }

  /* Format the time remaining string for unlimited lesson */
  _formatUnlimited(){
    let unlimitedRemaining = (this.props.credits.unlimitedExpires - (Date.now()/1000));
    let countdown;

    if(unlimitedRemaining > 24*60*60){
      countdown = Math.ceil(unlimitedRemaining/(24*60*60)) + " Days Left";
    }
    else if(unlimitedRemaining > 60*60){
      countdown =  Math.ceil(unlimitedRemaining/(60*60)) + " Hours Left";
    }
    else if(unlimitedRemaining > 0){
      const min = Math.ceil(unlimitedRemaining/60);
      countdown =  min + (min > 1 ? " Minutes Left" : " Minute Left");
    }
    else{ 
      countdown = '';
      if(this.expireTimer){clearInterval(this.expireTimer);}
      this.props.getCredits(this.props.token);
    }

    this.setState({timer: countdown});
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
          {/* {(!this.props.admin && !loading && !this.props.lessons.closed.length && !this.props.lessons.pending.length) && 
            <section>
              <h1>You haven't submitted any lessons!</h1>
              <p>Download our app today. Your first lesson is free!</p>
              <div className="multi_col">
                <div className="button apple_store" onClick={()=>alert('Coming Soon!')}/>
                <div className="button google_store" onClick={()=>alert('Coming Soon!')}/>
              </div>
            </section>
          } */}
          <section>
            <div className="structured_panel">
              {!this.props.admin && this.props.credits.unlimitedExpires > Date.now()/1000 &&
                <div className="card">
                  <div className="card_header infinity">
                    <span>Unlimited Lessons</span>
                    <span style={{cursor:'default'}}>{this.state.timer}</span>
                  </div>
                  <div className="card_body">
                    <CardRow go 
                      title={'Submit a Swing'} 
                      className={"noflex"} 
                      action={(this.props.lessons.pending && this.props.lessons.pending.length > 0 ? 
                        () => this.props.openModal({type: 'PENDING_SWING'})
                        :
                        ()=>this.props.goToRedeem()
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
                      action={()=>this.props.goToOrder()}
                    />
                  </div>
                </div>
              }
              {!this.props.admin && this.props.credits.unlimitedExpires <= Date.now()/1000 &&
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
                      action={()=>this.props.goToRedeem()}
                    />
                    <CardRow  
                      go
                      title={'Activate Unlimited'} 
                      extra={`${this.props.credits.unlimited > 0 ? this.props.credits.unlimited : '0'} Left`}
                      disabled={this.props.credits.unlimited < 1}
                      className={"noflex"} 
                      action={()=>this.props.openModal({type:'ACTIVATE_UNLIMITED'})}
                    />
                    <CardRow  
                      go
                      title={'Order More'} 
                      className={"noflex"} 
                      action={()=>this.props.goToOrder()}
                    />
                  </div>
                </div>
              }
              <div className="card">
                <div className="card_header">
                  <span>In Progress</span>
                </div>
                <div className="card_body">
                  {(this.props.lessons.pending.length === 0 || loading) &&
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
                </div>
                <div className="card_body">
                  {(this.props.lessons.closed.length === 0 || loading) &&
                    <Placeholder message={loading?"Loading...":"No Completed Lessons"} loading={loading}/>
                  }
                  {this.props.lessons.closed.length > 0 && this.props.lessons.closed.map((lesson)=>
                    <LessonRow key={lesson.request_id} title={formatDate(lesson.request_date)} new={parseInt(lesson.viewed,10)===0} extra={this.props.admin ? lesson.username : parseInt(lesson.viewed,10)===0 ? "NEW!" : ""} id={lesson.request_url}/>
                  )}
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

export default connect(mapStateToProps,mapDispatchToProps)(LessonsPage);
