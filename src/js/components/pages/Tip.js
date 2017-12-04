import React, { Component } from 'react';
import {connect} from 'react-redux';
import {replace} from 'react-router-redux';


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
    window.scrollTo(0,0);
  }
  render() {
    return (
      <section className="landing_image image2">
        <main className="page_title">
          <h1>Tip of the Month</h1>
          <h3>Small Adjustments, Big Difference</h3>
        </main>
      </section>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TipPage);
