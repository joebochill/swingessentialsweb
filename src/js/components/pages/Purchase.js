import React, { Component } from 'react';
import {connect} from 'react-redux';
import {replace, push} from 'react-router-redux';
// import Placeholder from '../rows/Placeholder.js';
// import CardRow from '../rows/CardRow.js';
import PayPalButton from '../paypal/PayPalButton.js';
import Footer from '../footer/Footer.js';
import {setTargetRoute} from '../../actions/NavigationActions.js';
import {setPackageSelection, purchaseLesson, checkCoupon} from '../../actions/LessonActions.js';
import { getPackages } from '../../actions/actions.js';
import '../../../css/Lessons.css';

const mapStateToProps = (state)=>{
  return {
    token: state.login.token,
    loading: state.packages.loading,
    packages: state.packages.list,
    selectedPackage: state.packages.selectedPackage,
    purchaseInProgress: state.credits.inProgress,
    purchaseComplete: state.credits.complete,
    coupon: state.lessons.coupon
  };
}
var mapDispatchToProps = function(dispatch){
  return {
    goToSignIn: () => {dispatch(replace('/signin'));},
    goToLessons: () => {dispatch(push('/lessons'))},
    setTargetRoute: (route) => {dispatch(setTargetRoute(route))},
    requestPackages: (token) => {dispatch(getPackages(token))},
    setPackageSelection: (deal) => {dispatch(setPackageSelection(deal))},
    purchaseLesson: (deal, token) => {dispatch(purchaseLesson(deal, token))},
    checkCoupon: (code) => {dispatch(checkCoupon(code))}
  }
};

class PurchasePage extends Component {
  constructor(props){
    super(props);
    this.state={
      deal: this.props.selectedPackage,
      code: ''
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

  _getTotal(){
    // TODO: coupon codes
    if(this.props.coupon.value <= 0){
      return this.deal.price;
    }
    else if(this.props.coupon.type === 'amount'){
      return (this.deal.price-this.props.coupon.amount).toFixed(2);
    }
    else if(this.props.coupon.type === 'percent'){
      return (this.deal.price-(this.props.coupon.value/100)*this.deal.price).toFixed(2);
    }
    else{
      return this.deal.price;
    }
  }

  _checkCoupon(){
    if(!this.couponcode || !this.couponcode.value){return;}
    this.props.checkCoupon(this.couponcode.value);
    this.setState({code: ''});
  }

  _keyPress(evt){
    if(evt.key === "Enter" && this.state.code){
      this._checkCoupon();
    }
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
              <h1>Package Type</h1>
              <select value={this.state.deal} onChange={(evt)=>this._updatePackageSelection(evt.target.value)}>
                {this.props.packages.length && this.props.packages.map((deal, index)=>
                  <option key={'deal_'+index} value={deal.shortcode}>{deal.name + ', $' + deal.price}</option>
                )}
              </select>
              <h1 style={{marginTop:'2rem'}}>Order Details</h1>
              <div className="callout">
                <h1>{this.deal.name}</h1>
                <h3>{this.deal.description}</h3>
                <span>{'$'+this.deal.price}</span>
              </div>
              <h1 style={{marginTop:'2rem'}}>Coupon Code</h1>
              <div className="flexboxH">
                <input 
                  ref={(ref) => this.couponcode = ref}
                  value={this.state.code}
                  onChange={(evt) => this.setState({code:evt.target.value})}
                  onKeyPress={this._keyPress.bind(this)}
                />
                <div className="button se_button" 
                  onClick={()=>this._checkCoupon()}
                  disabled={!this.state.code}
                >
                  <span>Apply</span>
                </div>
              </div>
              {this.props.coupon.error && <span className="validation_error">{this.props.coupon.error}</span>}
              <div style={{marginTop:'2rem'}}>
                <div className="orderRow">
                  <span>Sub-total</span>
                  <span>{'$'+this.deal.price}</span>
                </div>
                {this.props.coupon.value > 0 && (
                  <div className="orderRow">
                    <span>Coupon <span style={{fontSize:'0.6rem', verticalAlign:'middle'}}>
                      {(this.props.coupon.type === 'amount' ? '($' : '(') + this.props.coupon.value +
                        (this.props.coupon.type === 'percent' ? '% off)' : ' off)')}
                    </span></span>
                    <span style={{fontStyle:"italic"}}>{'-$'+(this.deal.price - this._getTotal())}</span>
                  </div>
                )}
                <div className="orderRow">
                  <span>Tax</span>
                  <span>{'$0.00'}</span>
                </div>
                <div className="orderRow">
                  <span>Total</span>
                  <span>{'$'+this._getTotal()}</span>
                </div>
              </div>
              {this._getTotal() > 0 ?
                <PayPalButton 
                  deal={this.deal}
                  total={this._getTotal()} 
                  authorized={(data,actions) => actions.payment.execute()
                    .then(() => this.props.purchaseLesson(this.deal.shortcode, this.props.token))
                    //.then(() => this.props.goToLessons())
                    .catch((error) => console.error(error))
                  }  
                  //canceled={()=>alert('canceled')}
                />
                :
                <div className="button se_button" style={{marginTop: '2rem'}}
                  onClick={() => this.props.purchaseLesson(this.deal.shortcode, this.props.token)}
                >
                  <span>Complete Purchase</span>
                </div>
              }
            </div>
          </section>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PurchasePage);
