import React, { Component } from 'react';
import {connect} from 'react-redux';
import {replace, push} from 'react-router-redux';
import Placeholder from '../rows/Placeholder.js';
import CardRow from '../rows/CardRow.js';
import Footer from '../footer/Footer.js';
import {setTargetRoute} from '../../actions/NavigationActions.js';
import { getPackages } from '../../actions/actions.js';
import '../../../css/Cards.css';


const mapStateToProps = (state)=>{
  return {
    token: state.login.token,
    loading: state.packages.loading,
    packages: state.packages.list
  };
}
var mapDispatchToProps = function(dispatch){
  return {
    goToSignIn: () => {dispatch(replace('/signin'));},
    goToLessons: () => {dispatch(push('/lessons'))},
    setTargetRoute: (route) => {dispatch(setTargetRoute(route))},
    requestPackages: (token) => {dispatch(getPackages(token))}
  }
};

class PackagesPage extends Component {
  componentWillMount(){
    if(!this.props.token){
      this.props.setTargetRoute('/packages');
      this.props.goToSignIn();
    }
    else{
      window.scrollTo(0,0);
      
      // make a request for updated packages and use localstorage in the meantime if we have it
      if(!this.props.packages.length){
        this.props.requestPackages(this.props.token);
        let localpackages = JSON.parse(localStorage.getItem('packages'));
        if(localpackages){
          this.localpackages= localpackages;
          return;
        }
      }
    }
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.token){
      this.props.goToSignIn();
    }
  }

  render() {
    const packages = (!this.props.packages.length ? this.localpackages : this.props.packages);
    return (
      <div>
        <section className="landing_image image2">
          <main className="page_title">
            <h1>Lesson Deals</h1>
            <h3>Multiple Package Options</h3>
          </main>
        </section>
        <div>
          <section>
            <div className="structured_panel">
              <div className="card">
                <div className="card_header">
                  <span>Purchase Lessons</span>
                </div>
                <div className="card_body">
                  {this.props.loading &&
                    <Placeholder message={"Loading..."} loading={this.props.loading}/>
                  }
                  {packages && packages.map((deal,index) =>
                    <CardRow key={'package_'+index} go 
                      title={deal.name} 
                      subtitle={deal.description}
                      extra={'$'+deal.price}
                      className={"noflex"} 
                      action={()=>alert('order '+deal.shortcode)}
                    />
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

export default connect(mapStateToProps,mapDispatchToProps)(PackagesPage);
