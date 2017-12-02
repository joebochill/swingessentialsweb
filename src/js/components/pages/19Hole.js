import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from '../header/Header.js';
import Footer from '../footer/Footer.js';
import {replace} from 'react-router-redux';
//import * as Actions from '../../actions/actions.js';


const mapStateToProps = (state)=>{
  return {
    username: state.userData.username
  };
}
var mapDispatchToProps = function(dispatch){
  return {
    goToLogin: () => {dispatch(replace('/signin'));},
  }
};

class NineteenPage extends Component {
  componentWillMount(){
    // if(!this.props.username){
    //   this.props.goToLogin();
    // }
  }
  render() {
    return (
      <div>
      <Header/>
      <section className="landing_image image2 center">
        <main className="page_title">
          <h1>The 19th Hole</h1>
          <h3>Golf Stories and Q&amp;A</h3>
        </main>
      </section>
      <Footer/>
    </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(NineteenPage);
