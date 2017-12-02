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

class TipPage extends Component {
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
          <h1>Tip of the Month</h1>
          <h3>Small Adjustments, Big Difference</h3>
        </main>
      </section>
      <Footer/>
    </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TipPage);
