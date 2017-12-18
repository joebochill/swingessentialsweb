import React, { Component } from 'react';
import {connect} from 'react-redux';
import {replace, push} from 'react-router-redux';
// import Placeholder from '../rows/Placeholder.js';
// import CardRow from '../rows/CardRow.js';
import Footer from '../footer/Footer.js';
import {setTargetRoute} from '../../actions/NavigationActions.js';
import {setPackageSelection, purchaseLesson} from '../../actions/LessonActions.js';
import { getPackages } from '../../actions/actions.js';
import '../../../css/Purchase.css';


const mapStateToProps = (state)=>{
  return {
    token: state.login.token,
    loading: state.packages.loading,
    packages: state.packages.list,
    selectedPackage: state.packages.selectedPackage,
    purchaseInProgress: state.credits.inProgress,
    purchaseComplete: state.credits.complete
  };
}
var mapDispatchToProps = function(dispatch){
  return {
    goToSignIn: () => {dispatch(replace('/signin'));},
    goToLessons: () => {dispatch(push('/lessons'))},
    setTargetRoute: (route) => {dispatch(setTargetRoute(route))},
    requestPackages: (token) => {dispatch(getPackages(token))},
    setPackageSelection: (deal) => {dispatch(setPackageSelection(deal))},
    purchaseLesson: (deal, token) => {dispatch(purchaseLesson(deal, token))}
  }
};

class PurchasePage extends Component {
  constructor(props){
    super(props);
    this.state={
      deal: this.props.selectedPackage
    }
  }
  componentWillMount(){
    if(!this.props.token){
      this.props.setTargetRoute('/purchase');
      this.props.goToSignIn();
    }
    else{
      if(!this.props.packages.length){
        this.props.requestPackages();
      }
      else{
        if(this.props.selectedPackage){
          this.setState({deal: this.props.selectedPackage});
          this._getPackageDetails(this.props.selectedPackage, this.props.packages);
        }else{
          this._getPackageDetails(this.state.deal, this.props.packages);
        }
        
      }
      window.scrollTo(0,0);
    }
  }

  componentWillUnmount(){
    this.props.setPackageSelection(this.state.deal);
  }

  componentWillReceiveProps(nextProps){
    if(!nextProps.token){
      this.props.goToSignIn();
    }
    if(nextProps.purchaseComplete){
      this.props.goToLessons();
    }
    if(nextProps.packages){
      this._getPackageDetails(this.state.deal, nextProps.packages);
    }
    if(!this.state.deal && nextProps.selectedPackage){
      this.setState({deal: nextProps.selectedPackage});
    }
  }

  _getPackageDetails(code, list){
    for(let i = 0; i < list.length; i++){
      if(code === list[i].shortcode){
        this.deal = list[i];
        return;
      }
    }
    if(list.length){
      this.deal = list[0];
      this.setState({deal: list[0].shortcode});
    }
  }

  _updatePackageSelection(newPackage){
    this.setState({deal: newPackage});
    this._getPackageDetails(newPackage, this.props.packages);
  }

  render() {
    if(!this.deal){return null;}
    return (
      <div>
        <section className="landing_image image2">
          <main className="page_title">
            <h1>Purchase Lesson</h1>
            <h3>Use Now Or Save For Later</h3>
          </main>
        </section>
        <div>
          <section>
            <div className="structured_panel">
              <label>Package Type</label>
              <select value={this.state.deal} onChange={(evt)=>this._updatePackageSelection(evt.target.value)}>
                {this.props.packages.length && this.props.packages.map((deal, index)=>
                  <option key={'deal_'+index} value={deal.shortcode}>{deal.name + ', $' + deal.price}</option>
                )}
              </select>
              <label style={{marginTop:'2rem'}}>Order Details</label>
              <div className="callout">
                <h1>{this.deal.name}</h1>
                <h3>{this.deal.description}</h3>
                <span>{'$'+this.deal.price}</span>
              </div>
              <label style={{marginTop:'2rem'}}>Coupon Code</label>
              <div className="flexboxH">
                <input/>
                <div className="button se_button" 
                  onClick={()=>alert('apply coupon')}
                >
                  <span>Apply</span>
                </div>
              </div>
              <div style={{marginTop:'2rem'}}>
                <div className="orderRow">
                  <span>Sub-total</span>
                  <span>{'$'+this.deal.price}</span>
                </div>
                <div className="orderRow">
                  <span>Coupon <span style={{fontSize:'0.6rem', verticalAlign:'middle'}}>(10% off)</span></span>
                  <span style={{fontStyle:"italic"}}>{'-$'+(0.1*this.deal.price).toFixed(2)}</span>
                </div>
                <div className="orderRow">
                  <span>Total</span>
                  <span>{'$'+(this.deal.price-(0.1*this.deal.price)).toFixed(2)}</span>
                </div>
              </div>
              <div className="button se_button" 
                onClick={()=>this.props.purchaseLesson(this.state.deal, this.props.token)}
              >
                <span>Complete Order w/ Paypal</span>
              </div>
            </div>
          </section>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PurchasePage);
