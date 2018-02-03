import React, { Component } from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import Footer from '../footer/Footer.js';
import {openModal} from '../../actions/modalActions.js';


const mapStateToProps = (state)=>{
  return {
    token: state.login.token
  };
}

const mapDispatchToProps = (dispatch)=>{
  return {
    goToSignin: () => {dispatch(push('/signin'))},
    goTo: (path) => {dispatch(push(path))},
    openModal: (modal) => {dispatch(openModal(modal))}    
  }
}

class HomePage extends Component {
  componentWillMount(){
    window.scrollTo(0,0);
  }

  _showComingSoon(){
    this.props.openModal({
      type: 'CONFIRM',
      props:{
        title: 'Coming Soon!',
        body: ['Keep an eye out for our app in the app store.'],
        cancel: 'OK'
      }
    });
  }

  render() {
    return (
      <div>
        <section className="landing_image large image1">
          <div className="pga_overlay"/>
          <main className="page_title">
            <h1>Swing<span className="hidden_space"> </span><br className="hidden_break"/>Essentials</h1>
            <h3>a PGA Pro in your pocket - on and off the course</h3>
          </main>
          <div>
            <div className="button apple_store" onClick={()=>this._showComingSoon()}/>
            <div className="button google_store" onClick={()=>this._showComingSoon()}/>
          </div>
        </section>
        <div>
          <section>
            <h1>Lessons On Your Schedule</h1>
            <p>Swing Essentials provides you with affordable, individualized one-on-one lessons from a PGA-certified golf pro from the comfort and convenience of your home.</p>
          </section>
          <section>
            <h1>How It Works</h1>
            <div className="multi_col">
              <div>
                <div className="number_icon">1</div>
                <p>Pull out your smart phone and snap a short video of your swing using your camera.</p>
              </div>
              <div>
                <div className="number_icon">2</div>
                <p>Preview your swing and when you’re ready, submit your videos for professional analysis.</p>
              </div>
              <div>
                <div className="number_icon">3</div>
                <p>Within 48 hours, you will receive a personalized video highlighting what you’re doing well plus areas of your swing that could be improved.</p>
              </div>
            </div>
          </section>
          <section>
            <h1>Why Swing Essentials?</h1>
            <p>Swing Essentials offers a true one-on-one experience. Our PGA-certified professional puts a personal touch on each and every lesson, giving you the confidence to know that your lesson is just for you. But don’t take our word for it - hear what our customers have to say.</p>
          </section>
          <section>
            <h1>Testimonials</h1>
            <div className="multi_col">
              <div>
                <h3>David A.</h3>
                <p>"Thanks for the great work this last year. After working with you, I've lowered my handicap by three and a half."</p>
              </div>
              <div>
                <h3>DEAN L.</h3>
                <p>"I sent my swing in to Swing Essentials and I'm playing so much better - it's easily taken four to five shots off my game. I strongly recommend it!"</p>
              </div>
              <div>
                <h3>Will M.</h3>
                <p>"Thanks to you, I have been playing my best golf. It's all finally clicking now!"</p>
              </div>
            </div>
          </section>
          <section>
            <h1>Try It Today</h1>
            <p>Still not convinced? Sign up and give it a try. Your first lesson is on us.</p>
            {/* <div className="multi_col">
              <div className="button apple_store" onClick={()=>this._showComingSoon()}/>
              <div className="button google_store" onClick={()=>this._showComingSoon()}/>
            </div> */}
            {!this.props.token && <div className="button small se_button" onClick={()=>this.props.goToSignin()}><span>Sign In</span></div>}
            {!this.props.token && <div className="button small se_button" onClick={()=>this.props.goTo('/register')}><span>Sign Up</span></div>}
            {this.props.token && <div className="button small se_button" onClick={()=>this.props.goTo('/lessons')}><span>Lessons</span></div>}
          </section>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomePage);
