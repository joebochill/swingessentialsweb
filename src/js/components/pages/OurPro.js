import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from '../header/Header.js';
import Footer from '../footer/Footer.js';
import {replace} from 'react-router-redux';

class OurProPage extends Component {
  render() {
    return (
      <div>
      <Header/>
      <section className="landing_image image2">
        <main className="page_title">
          <h1>Meet Our Pro</h1>
          <h3>Alan J. Nelson</h3>
        </main>
      </section>
      <section className="left">
        <div className="headshot" alt="Headshot"/>
        <h1>Alan J. Nelson</h1>
        <p>It’s a pleasure to meet you. My name is A.J. Nelson and I am a Class A Member of the PGA. My goal is to grow the game of golf, one player at a time.</p>
        <p>I have been working in the golf industry for fifteen years and have given over 800 lessons.  I currently hold a Masters Degree from the University of Maryland, College Park and have graduated from the PGA sponsored Professional Golf Management Program.</p>
        <p>My strengths lie in teaching, club fitting, and player development. I look forward to bringing you my expertise in golf and feel extremely privileged to have the opportunity to work with you.</p>
      </section>
      <Footer/>
    </div>
    );
  }
}

export default OurProPage;
