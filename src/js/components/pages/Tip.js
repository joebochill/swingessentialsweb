import React, { Component } from 'react';
import {connect} from 'react-redux';
import {replace} from 'react-router-redux';
import Footer from '../footer/Footer.js';
import Datestamp from '../datestamp/Datestamp.js';
import YoutubeVideo from '../youtube/YoutubeVideo.js';
//import {replace} from 'react-router-redux';
import {getTips} from '../../actions/actions.js';
import Loader from '../loader/Loader.js';


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
    goToTips: () => {dispatch(replace('/tip-of-the-month'));}
  }
};

class TipPage extends Component {
  constructor(props){
    super(props);
    this.localtips = [];
    this.start = 0;
    this.perPage = 1;
    this.localtips = [];
  }
  componentWillMount(){
    window.scrollTo(0,0);

    // make a request for updated tips and use localstorage in the meantime if we have it
    if(!this.props.tips || !this.props.tips.length){
      this.props.requestTips();
      let localtips = JSON.parse(localStorage.getItem('tips'));
      if(localtips){
        this.localtips = localtips;
        this._checkPageRange(localtips, this.props.match.params.page);
        return;
      }
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.tips.length){
      this._checkPageRange(nextProps.tips, nextProps.match.params.page);
    }
  }

  // converts a DB stored string into paragraphs (we do not store html in the database, just text)
  _convertTextToP(string){
    if(!string.length){return null;}
    
    let array = string.split(":::");
    return array.map((val, index)=><p key={index}>{val}</p>);
  }

  _getDatePieces(datestamp){
    let parts = datestamp.split('-');
    const months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
    return {month:months[parseInt(parts[1],10)-1], day:parts[2], year:parts[0]};
  }

  // checks if the page number we have requested is valid based on the
  // number of tips available and the tips per page setting above
  _checkPageRange(list, pagenum){
    const page = parseInt(pagenum,10);
    
    // check if the page we are requesting is valid
    if(pagenum !== undefined){
      if(!page || page < 1 || ((page-1)*this.perPage >= list.length)){
        this.props.goToTips();;
      }
      else{
        this.start = (page-1)*this.perPage;
      }
    }
  }

  render() {
    // determine which dataset to render from
    const tips = (!this.props.tips.length ? this.localtips : this.props.tips);
    return (
      <div>
        <section className="landing_image image2">
          <main className="page_title">
            <h1>Tip of the Month</h1>
            <h3>Small Adjustments, Big Difference</h3>
          </main>
        </section>
        <div>
          {this.props.loading &&
            <section className="left">
              <div style={{marginTop:'48px'}}>
                  <p>Loading Tips...</p>
                  <Loader/>
              </div>
            </section>
          }
          {tips.length > 0 && this.props.tips.slice(this.start,this.start+this.perPage).map((tip)=>
            <section key={tip.id} className="left">
              <Datestamp month={this._getDatePieces(tip.date).month} day={this._getDatePieces(tip.date).day} year={this._getDatePieces(tip.date).year} monthstamp/>
              <div className="structured_panel">
                <h1>{tip.title}</h1>
                <YoutubeVideo vid={tip.video}/>
                {this._convertTextToP(tip.comments)}
              </div>
            </section>
          )}
          <Footer/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TipPage);
