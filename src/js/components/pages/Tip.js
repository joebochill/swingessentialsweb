import React, { Component } from 'react';
// import {connect} from 'react-redux';
import Datestamp from '../datestamp/Datestamp.js';
import YoutubeVideo from '../youtube/YoutubeVideo.js';
//import {replace} from 'react-router-redux';
//import * as Actions from '../../actions/actions.js';


// const mapStateToProps = (state)=>{
//   return {
//     //username: state.userData.username
//   };
// }
// var mapDispatchToProps = function(dispatch){
//   return {
//     //goToLogin: () => {dispatch(replace('/signin'));},
//   }
// };

class TipPage extends Component {
  componentWillMount(){
    window.scrollTo(0,0);
  }
  render() {
    return (
      <div>
        <section className="landing_image image2">
          <main className="page_title">
            <h1>Tip of the Month</h1>
            <h3>Small Adjustments, Big Difference</h3>
          </main>
        </section>
        <div>
          <section className="left">
            <Datestamp month="Dec" day="10" year="2017" monthstamp/>
            <div className="structured_panel">
              <h1>Correct Hip Movement</h1>
              <YoutubeVideo vid="PXsqucHINWY"/>
              <p>Here is a brief description of what this video is about. Don't let your hips move with you when you go back during your backswing. Make sure they rotate properly so you can whack the crap out of the ball.</p>
            </div>
          </section>
          <section className="left">
            <Datestamp month="Nov" day="10" year="2017" monthstamp/>
            <div className="structured_panel">
              <h1>The Golf Grip</h1>
              <YoutubeVideo vid="Luq7YRXTotQ"/>
              <p>Make sure that you always use two hands to grab the club. Grab it with one hand first and then the other. Don't let go while you are swinging.</p>
            </div>
          </section>
          <section className="left">
            <Datestamp month="Oct" day="10" year="2017" monthstamp/>
            <div className="structured_panel">
              <h1>Fix the Slice</h1>
              <YoutubeVideo vid="LEMfkErTccw"/>
              <p>Always remember to reward yourself for a great day of golf by going out for a slice of pizza. Mmmm, pepperoni and sausage - what could be better?</p>
            </div>
          </section>
          <section className="left">
            <Datestamp month="Sep" day="10" year="2017" monthstamp/>
            <div className="structured_panel">
              <h1>Chipping in from a Tough Lie</h1>
              <YoutubeVideo vid="ZOiXNwqj8uc"/>
              <p>Mulligan. If you can't take a mulligan, see if your friends will let you throw the ball by hand for a one-stroke penalty.</p>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default /*connect(mapStateToProps,mapDispatchToProps)*/(TipPage);
