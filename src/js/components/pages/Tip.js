import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replace, push } from 'connected-react-router';
import Footer from '../footer/Footer.js';
import Datestamp from '../datestamp/Datestamp.js';
import YoutubeVideo from '../youtube/YoutubeVideo.js';
//import {replace} from 'connected-react-router';
import { getTips, updateTip, addTip, removeTip } from '../../actions/actions.js';
import Loader from '../loader/Loader.js';
import { getToday, validatePageNumber, convertTextToP, convertLineToText, convertTextToLine } from '../../utils/utils.js';
import Paginator from '../paginator/Paginator.js';
import { openModal } from '../../actions/modalActions.js';


const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    admin: state.login.admin,
    tips: state.tips.tipList,
    loading: state.tips.loading
  };
}
var mapDispatchToProps = function (dispatch) {
  return {
    requestTips: (token) => { dispatch(getTips(token)); },
    goToTips: () => { dispatch(replace('/tip-of-the-month')); },
    goToTipsPage: (page) => { dispatch(push('/tip-of-the-month/' + page)); },
    updateTip: (token, tip) => { dispatch(updateTip(token, tip)) },
    addTip: (token, tip) => { dispatch(addTip(token, tip)) },
    removeTip: (token, tip) => { dispatch(removeTip(token, tip)) },
    openModal: (modal) => { dispatch(openModal(modal)) }
  }
};

class TipPage extends Component {
  constructor(props) {
    super(props);
    this.start = 0;
    this.perPage = 3;
    this.localtips = [];
    this.state = {
      editing: null,
      date: null,
      dateError: '',
      title: null,
      video: null,
      comments: null,
      newPost: false
    }
  }
  componentWillMount() {
    window.scrollTo(0, 0);

    // make a request for updated tips and use localstorage in the meantime if we have it
    if (!this.props.tips.length) {
      this.props.requestTips(this.props.token);
      let localtips = JSON.parse(localStorage.getItem('tips'));
      if (localtips) {
        this.localtips = localtips;
        this.start = validatePageNumber(localtips, this.perPage, this.props.match.params.page, this.props.goToTips);
        return;
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.tips.length) {
      this.start = validatePageNumber(nextProps.tips, this.perPage, nextProps.match.params.page, this.props.goToTips);
    }
    if (nextProps.match.params.page !== this.props.match.params.page) {
      const header = 3 * parseFloat(getComputedStyle(document.documentElement).fontSize);
      const landing = document.getElementsByClassName("landing_image")[0].offsetHeight || 0;
      window.scrollTo(0, landing - header);
    }
    if (this.props.loading && !nextProps.loading) {
      this.setState({ saving: null });
    }
  }

  _validateDate(date = this.state.date) {
    if (!date.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)) {
      this.setState({ dateError: 'Please use the format YYYY-MM-DD' });
      return false;
    }
    else if (isNaN(Date.parse(date))) {
      this.setState({ dateError: 'Invalid Date' });
      return false;
    }
    else {
      this.setState({ dateError: '' });
      return true;
    }
  }

  _changeEdit(newTip, save) {
    if (this.state.editing && save) { // clicked save button
      // push the changes
      if (!this._validateDate() || !this.state.title || !this.state.video || !this.state.comments) { return; }

      this.props.updateTip(this.props.token, {
        id: this.state.editing,
        date: this.state.date,
        title: this.state.title,
        video: this.state.video,
        comments: convertLineToText(this.state.comments)
      });
    }
    if (newTip) { // clicked edit
      this.setState({
        editing: newTip.id,
        newPost: false,
        date: newTip.date,
        dateError: '',
        title: newTip.title,
        video: newTip.video,
        comments: convertTextToLine(newTip.comments)
      });

      setTimeout(() => window.scrollTo(0, document.getElementById('section_' + newTip.id).offsetTop - (3 * parseFloat(getComputedStyle(document.documentElement).fontSize))), 100);
    }
    else { // clicked cancel or save
      this.setState({
        editing: null,
        newPost: false,
        date: null,
        dateError: '',
        title: null,
        video: null,
        comments: null,
        saving: save ? this.state.editing : null
      });
    }
  }

  _createNewPost() {
    this.setState({
      newPost: true,
      editing: -1,
      date: getToday(),
      dateError: '',
      title: '',
      video: '',
      comments: '',
      saving: null
    });
  }


  _addNewPost() {
    if (!this._validateDate() || !this.state.title || !this.state.video || !this.state.comments) { return; }

    this.props.addTip(this.props.token, {
      date: this.state.date,
      title: this.state.title,
      video: this.state.video,
      comments: convertLineToText(this.state.comments)
    });
    this.setState({
      editing: null,
      newPost: false,
      date: null,
      dateError: '',
      title: null,
      video: null,
      comments: null,
      saving: null
    });
  }

  _removeTip(id) {
    this.props.removeTip(this.props.token, { id: id });
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
                <Loader />
              </div>
            </section>
          }
          {this.props.admin &&
            <section className="left">
              {!this.state.newPost &&
                <div className="structured_panel">
                  <div className="button se_button" style={{ marginTop: '0rem' }} onClick={this._createNewPost.bind(this)}>
                    <span>New Tip</span>
                  </div>
                </div>
              }
              {this.state.newPost && <h1>New Tip</h1>}
              {this.state.newPost &&
                <div className="structured_panel">
                  <label style={{ marginTop: '2rem' }}>Date</label>
                  <input type="text"
                    value={this.state.date}
                    placeholder={'YYYY-MM-DD'}
                    onChange={(evt) => { this.setState({ date: evt.target.value }); this._validateDate(evt.target.value) }}
                  />
                  {this.state.dateError && (<span className="validation_error">{this.state.dateError}</span>)}
                  <label style={{ marginTop: '1rem' }}>Title</label>
                  <input type="text"
                    value={this.state.title}
                    onChange={(evt) => this.setState({ title: evt.target.value })}
                  />
                  <label style={{ marginTop: '1rem' }}>Youtube ID</label>
                  <input type="text"
                    value={this.state.video}
                    onChange={(evt) => this.setState({ video: evt.target.value })}
                  />
                  <label style={{ marginTop: '1rem' }}>Comments</label>
                  <textarea value={this.state.comments}
                    onChange={(evt) => this.setState({ comments: evt.target.value })}
                  />
                </div>
              }
              {this.state.newPost &&
                <span style={{ marginTop: '2rem' }}>
                  <span
                    className="button_link"
                    onClick={() => this._addNewPost()}
                    disabled={!this.state.title || !this.state.video || !this.state.comments || this.state.dateError || !this.state.date}
                  >ADD</span>
                  <span
                    className="button_link"
                    style={{ marginLeft: '1rem' }}
                    onClick={() => this.setState({ newPost: false })}
                  >CANCEL</span>
                </span>
              }
            </section>
          }


          {tips.length > 0 && tips.slice(this.start, this.start + this.perPage).map((tip) =>
            <section key={tip.id} id={'section_' + tip.id} className="left">
              <Datestamp datestamp={tip.date} monthstamp />
              {this.props.admin && this.state.editing !== tip.id &&
                <span style={{ marginBottom: '2rem' }}>
                  <span
                    className="button_link"
                    onClick={this._changeEdit.bind(this, tip, false)}
                  >EDIT</span>
                </span>
              }
              {this.state.editing === tip.id &&
                <div className="structured_panel">
                  <label>Date</label>
                  <input type="text"
                    value={this.state.date}
                    placeholder={'YYYY-MM-DD'}
                    onChange={(evt) => { this.setState({ date: evt.target.value }); this._validateDate(evt.target.value) }}
                  />
                  {this.state.dateError && (<span className="validation_error">{this.state.dateError}</span>)}
                  <label style={{ marginTop: '1rem' }}>Title</label>
                  <input type="text"
                    value={this.state.title}
                    onChange={(evt) => this.setState({ title: evt.target.value })}
                  />
                  <label style={{ marginTop: '1rem' }}>Youtube ID</label>
                  <input type="text"
                    value={this.state.video}
                    onChange={(evt) => this.setState({ video: evt.target.value })}
                  />
                  <label style={{ marginTop: '1rem' }}>Comments</label>
                  <textarea value={this.state.comments}
                    onChange={(evt) => this.setState({ comments: evt.target.value })}
                  />
                </div>
              }
              {this.props.admin && this.state.editing === tip.id &&
                <span style={{ marginTop: '2rem' }}>
                  <span
                    className="button_link"
                    onClick={this._changeEdit.bind(this, null, true)}
                    disabled={!this.state.title || !this.state.video || !this.state.comments || this.state.dateError || !this.state.date}
                  >SAVE</span>
                  <span
                    className="button_link"
                    style={{ marginLeft: '1rem' }}
                    onClick={() => this.props.openModal({
                      type: 'CONFIRM',
                      props: {
                        title: 'Remove Tip: ' + this.state.title,
                        body: ['Deleting this tip will permanently remove it from the database. This action cannot be undone.',
                          'Are you sure you want to delete this tip?'],
                        buttons: [
                          { name: 'DELETE', action: () => this._removeTip(tip.id) }
                        ]
                      }
                    })}
                  >DELETE</span>
                  <span
                    className="button_link"
                    style={{ marginLeft: '1rem' }}
                    onClick={this._changeEdit.bind(this, null, false)}
                  >CANCEL</span>

                </span>
              }
              {this.props.loading && this.state.saving === tip.id && <Loader />}
              {this.state.editing !== tip.id && this.state.saving !== tip.id &&
                <div className="structured_panel">
                  <h1>{tip.title}</h1>
                  <YoutubeVideo vid={tip.video} />
                  {convertTextToP(tip.comments)}
                </div>
              }
            </section>
          )}
          <section>
            <Paginator pages={Math.ceil(tips.length / this.perPage)} current={this.start / this.perPage + 1} navigate={this.props.goToTipsPage} />
          </section>
          <Footer />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TipPage);
