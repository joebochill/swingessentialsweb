import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../footer/Footer.js';
import Loader from '../loader/Loader.js';
import { unsubscribe } from '../../actions/UserDataActions.js';


const mapStateToProps = (state) => {
  return {
    unsubscribePending: state.userData.unsubscribePending,
    unsubscribeSuccess: state.userData.unsubscribeSuccess
  };
}
var mapDispatchToProps = function (dispatch) {
  return {
    unsubscribe: (uid, kid) => { dispatch(unsubscribe(uid, kid)) }
  }
};

class UnsubscribePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    window.scrollTo(0, 0);

    // Make the verification request to the database
    this.props.unsubscribe(this.props.match.params.uid, this.props.match.params.kid);
  }

  render() {
    return (
      <div>
        <section className="landing_image image5">
          <main className="page_title">
            <h1>Unsubscribe</h1>
            <h3>Stop Receiving Email Notifications</h3>
          </main>
        </section>
        <div>
          {this.props.unsubscribePending &&
            <section>
              <Loader />
            </section>
          }
          {!this.props.unsubscribePending && !this.props.unsubscribeSuccess &&
            <section>
              <h1>Oops,</h1>
              <p>Your unsubscribe link is invalid or you are already unsubscribed.</p>
            </section>
          }
          {!this.props.unsubscribePending && this.props.unsubscribeSuccess &&
            <section>
              <h1>Okay,</h1>
              <p>You have been successfully unsubscribed from these email notifications. To re-subscribe later, visit your Profile.</p>
            </section>
          }
          <Footer />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UnsubscribePage);
