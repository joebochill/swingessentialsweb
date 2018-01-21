import React, { Component } from 'react';
import {connect} from 'react-redux';
import {replace, push} from 'react-router-redux';
// import Placeholder from '../rows/Placeholder.js';
import PayPalButton from '../paypal/PayPalButton.js';
import CardRow from '../rows/CardRow.js';
import Footer from '../footer/Footer.js';
import {setTargetRoute} from '../../actions/NavigationActions.js';
import {purchaseLesson, checkCoupon, executePayment} from '../../actions/LessonActions.js';
import { getPackages } from '../../actions/PackageActions.js';
import {roundNumber} from '../../utils/utils.js';
import Loader from '../loader/Loader.js';

import '../../../css/Lessons.css';
import '../../../css/Cards.css';

const mapStateToProps = (state)=>{
  return {
    token: state.login.token,
    loading: state.packages.loading,
    packages: state.packages.list,
    purchaseInProgress: state.credits.inProgress,
    purchaseSuccess: state.credits.success,
    purchaseFail: state.credits.fail,
    coupon: state.lessons.coupon
  };
}
var mapDispatchToProps = function(dispatch){
  return {
    goToSignIn: () => {dispatch(replace('/signin'));},
    goToLessons: () => {dispatch(push('/lessons'))},
    goToRedeem: () => {dispatch(push('/redeem'))},
    setTargetRoute: (route) => {dispatch(setTargetRoute(route))},
    requestPackages: (token) => {dispatch(getPackages(token))},
    purchaseLesson: (deal, token) => {dispatch(purchaseLesson(deal, token))},
    checkCoupon: (code) => {dispatch(checkCoupon(code))},
    executePayment: (data, token) => {dispatch(executePayment(data, token))}
  }
};

class PurchasePage extends Component {
  constructor(props){
    super(props);
    this.state={
      deal: null,
      code: '',
      role: 'pending',
      error: ''
    }
  }
  componentWillMount(){
    if(!this.props.token){
      this.props.setTargetRoute('/purchase');
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
      else{
        this.setState({deal: this.props.packages[0]});
      }

      // check if the user is allowed to purchase
      const role = JSON.parse(window.atob(this.props.token.split('.')[1])).role;
      if(role === 'pending'){
        this.setState({role: 'pending', error: 'You must validate your email address before you can purchase lessons'});
      }
      else{
        this.setState({role: role, error:''});
      }
    }
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.token){
      this.props.goToSignIn();
    }
    if(nextProps.packages){
      if(!this.state.deal){
        this.setState({deal: nextProps.packages[0]});
      }
    }

    // check if the user is allowed to purchase
    const role = JSON.parse(window.atob(this.props.token.split('.')[1])).role;
    if(role === 'pending'){
      this.setState({role: 'pending', error: 'You must validate your email address before you can purchase lessons'});
    }
    else{
      this.setState({role: role, error:''});
    }
  }

  _getTotal(){
    // TODO: coupon codes
    if(this.props.coupon.value <= 0){
      return this.state.deal.price;
    }
    else if(this.props.coupon.type === 'amount'){
      return roundNumber(Math.max(this.state.deal.price-this.props.coupon.value, 0), 2).toFixed(2);
    }
    else if(this.props.coupon.type === 'percent'){
      return roundNumber(Math.max(this.state.deal.price-(this.props.coupon.value/100)*this.state.deal.price, 0), 2).toFixed(2);
    }
    else{
      return this.state.deal.price;
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

  _purchaseLesson(data){
    if(this.state.role === 'pending'){
      return;
    }
    if(!data){ return;}

    this.props.executePayment(data,this.props.token);
  }

  render() {
    if(!this.state.deal){return null;}
    const packages = (!this.props.packages.length ? this.localpackages : this.props.packages);

    return (
      <div>
        <section className="landing_image image2">
          <main className="page_title">
            <h1>Purchase Lesson</h1>
            <h3>Multiple Package Options</h3>
          </main>
        </section>
        <div>
          <section>
            {!this.props.purchaseSuccess && !this.props.purchaseFail &&
              <div className="structured_panel">
                <div className="card">
                  <div className="card_header">
                    <span>Select a Package</span>
                  </div>
                  <div className="card_body">
                    {packages && packages.map((deal,index) =>
                      <CardRow key={'package_'+index} 
                        title={deal.name} 
                        subtitle={deal.description}
                        extra={'$'+deal.price}
                        className={"noflex " + (this.state.deal.shortcode === deal.shortcode ? 'selected' : '')} 
                        action={this.props.purchaseInProgress ? null : () => {this.setState({deal: deal})}}
                      />
                    )}
                  </div>
                </div>
                <div className="card">
                  <div className="card_header">
                    <span>Discount Code</span>
                  </div>
                  <div className="flexboxH" style={{marginTop:'1rem'}}>
                    <input 
                      ref={(ref) => this.couponcode = ref}
                      value={this.state.code}
                      disabled={this.props.purchaseInProgress}
                      onChange={(evt) => this.setState({code:evt.target.value})}
                      onKeyPress={this._keyPress.bind(this)}
                    />
                    <div className="button se_button" 
                      onClick={()=>this._checkCoupon()}
                      disabled={!this.state.code || this.props.purchaseInProgress}
                    >
                      <span>Apply</span>
                    </div>
                  </div>
                </div>
                {this.props.coupon.error && <span className="validation_error">{this.props.coupon.error}</span>}
                <div className="card">
                  <div className="card_header">
                    <span>Order Details</span>
                  </div>
                  <div className="card_body">
                    <CardRow title={"Sub-total"} extra={'$'+this.state.deal.price} className={"noflex nohover"} />
                    {this.props.coupon.value > 0 &&
                      <CardRow title={"Discount"} 
                        subtitle={(this.props.coupon.type === 'amount' ? '$' : '') + this.props.coupon.value +
                            (this.props.coupon.type === 'percent' ? '% off' : ' off')} 
                        extra={'-$'+roundNumber(this.state.deal.price - this._getTotal(), 2).toFixed(2)} className={"noflex nohover extraitalic"} />
                    }
                    <CardRow title={"Tax"} extra={'$0.00'} className={"noflex nohover"} />

                    <CardRow title={"Total"} extra={'$'+this._getTotal()} className={"noflex nohover"} />
                  </div>
                </div>
                {this.state.error && <span className="validation_error">{this.state.error}</span>}
                {this.props.purchaseInProgress && 
                  <Loader/>
                }
                {this.props.purchaseInProgress && 
                  <span>Processing Purchase...</span>
                }
                {!this.props.purchaseInProgress  &&
                  (this._getTotal() > 0 ?
                    <PayPalButton 
                      disabled={this.state.role === 'pending'}
                      deal={this.state.deal}
                      total={this._getTotal()} 
                      authorized={(data,actions) => {
                        this._purchaseLesson({
                            id: data.paymentID,
                            payer: data.payerID,
                            package: this.state.deal.shortcode,
                            coupon: this.props.coupon.code,
                            total: this._getTotal()
                          });
                        }
                      }  
                      canceled={(data, actions)=>{/*Do Nothing*/}}
                      error={(err)=>{this.setState({error: 'There was an unexpected error processing your request. Please try again later.'})}}
                    />
                    :
                    <div className="button se_button" style={{marginTop: '2rem'}}
                      // onClick={() => this.props.purchaseLesson(this.state.deal.shortcode, this.props.token)}
                      disabled={this.state.role === 'pending'}
                      onClick={() => this._purchaseLesson({
                        id: 'N/A',
                        payer: 'N/A',
                        package: this.state.deal.shortcode,
                        coupon: this.props.coupon.code,
                        total: this._getTotal()
                      })}
                    >
                      <span>Complete Purchase</span>
                    </div>
                  )
                }
              </div>
            }
            {this.props.purchaseSuccess &&
              <div className="structured_panel">
                <h2>Thank you for your purchase!</h2>
                <div className="button se_button" onClick={() => this.props.goToRedeem()}>
                  <span>Redeem Now</span>
                </div>
                <div className="button se_button" onClick={() => this.props.goToLessons()}>
                  <span>Back to Lessons</span>
                </div>
              </div>
            }
            {this.props.purchaseFail &&
              <div className="structured_panel">
                <p>There was an error processing your purchase. Please <a href="http://www.google.com">Contact Us</a> for more information.</p>
              </div>
            }
          </section>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PurchasePage);
