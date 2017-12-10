import React, { Component } from 'react';
import {connect} from 'react-redux';
import {replace, push} from 'react-router-redux';
import Footer from '../footer/Footer.js';
import Datestamp from '../datestamp/Datestamp.js';
import YoutubeVideo from '../youtube/YoutubeVideo.js';
//import {replace} from 'react-router-redux';
import {getTips} from '../../actions/actions.js';
import Loader from '../loader/Loader.js';
import {validatePageNumber, convertTextToP} from '../../utils/utils.js';
import Paginator from '../paginator/Paginator.js';


const mapStateToProps = (state)=>{
  return {
    //username: state.userData.username
    tips: state.tips.tipList,
    loading: state.tips.loading
  };
}
var mapDispatchToProps = function(dispatch){
  return {
    requestTips: () => {dispatch(getTips());},
    goToTips: () => {dispatch(replace('/tip-of-the-month'));},
    goToTipsPage: (page) => {dispatch(push('/tip-of-the-month/'+page));}
  }
};

class TipPage extends Component {
  constructor(props){
    super(props);
    this.start = 0;
    this.perPage = 3;
    this.localtips = [];
  }
  componentWillMount(){
    window.scrollTo(0,0);

    // make a request for updated tips and use localstorage in the meantime if we have it
    if(!this.props.tips.length){
      this.props.requestTips();
      let localtips = JSON.parse(localStorage.getItem('tips'));
      if(localtips){
        this.localtips = localtips;
        this.start = validatePageNumber(localtips, this.perPage, this.props.match.params.page, this.props.goToTips);
        return;
      }
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.tips.length){
      this.start = validatePageNumber(nextProps.tips, this.perPage, nextProps.match.params.page, this.props.goToTips);
    }
    if(nextProps.match.params.page !== this.props.match.params.page){
      const top = 17*parseFloat(getComputedStyle(document.documentElement).fontSize);
      window.scrollTo(0,top-48);
    }
  }

  render() {
    // determine which dataset to render from
    const tips = (!this.props.tips.length ? this.localtips : this.props.tips);
    return (
      <div>
        <section className="landing_image image4">
          <main className="page_title">
            <h1>Tip of the Month</h1>
            <h3>Small Adjustments, Big Difference</h3>
          </main>
        </section>
        <div>
          {this.props.loading &&
            <section className="left">
              <div>
                  <p>Loading Tips...</p>
                  <Loader/>
              </div>
            </section>
          }
          {tips.length > 0 && tips.slice(this.start,this.start+this.perPage).map((tip)=>
            <section key={tip.id} className="left">
              <Datestamp datestamp={tip.date} monthstamp/>
              <div className="structured_panel">
                <h1>{tip.title}</h1>
                <YoutubeVideo vid={tip.video}/>
                {convertTextToP(tip.comments)}
              </div>
            </section>
          )}
          <section>
            <Paginator pages={Math.ceil(tips.length/this.perPage)} current={this.start/this.perPage+1} navigate={this.props.goToTipsPage}/>
          </section>
          <Footer/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TipPage);
