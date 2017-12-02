import React, { Component } from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';

class HomePage extends Component {
  componentWillMount(){
    window.scrollTo(0,0);
  }
  render() {
    return (
      <div>
        <Header/>
        <section className="landing_image large image1">
          <div className="pga_overlay"/>
          <main className="page_title">
            <h1>Swing<span className="hidden_space"> </span><br className="hidden_break"/>Essentials</h1>
            <h3>a PGA Pro in your pocket at home and on the links</h3>
          </main>
          <div style={{marginTop:"3rem"}}>
            <div className="button apple_store"/>
            <div className="button google_store"/>
          </div>
        </section>
        <section>
          <h1>Lessons On Your Schedule</h1>
          <p>Swing Essentials provides you with affordable, individualized one-on-one lessons from a PGA-certified golf pro from the comfort and convenience of your home.</p>
        </section>
        <section>
          <h1>How It Works</h1>
          <div className="multi_col">
            <div>
              <div className="number_icon">1</div>
              <p>Pull out your smart phone and snap a short video of your swing using our <a>iPhone</a> or <a>Android</a> app.</p>
            </div>
            <div>
              <div className="number_icon">2</div>
              <p>Preview your swing and when you’re ready, submit your videos for professional analysis.</p>
            </div>
            <div>
              <div className="number_icon">3</div>
              <p>Within 48 hours, you will receive a personalized video highlighting what you’re doing well plus areas of your swing that could be improved.</p>
            </div>
          </div>
        </section>
        <section>
          <h1>Why Swing Essentials?</h1>
          <p>Swing Essenials offers a true one-on-one experience. Our PGA-certified professional puts a personal touch on each and every lesson, giving you the confidence to know that your lesson is just for you. But don’t take our word for it - hear what our customers have to say.</p>
        </section>
        <section>
          <h1>Testimonials</h1>
          <div className="multi_col">
            <div>
              <h3>DAVE L.</h3>
              <p>“Swing Essentials is the greatest thing ever. I went from shooting 120+ to 80 in just three lessons.”</p>
            </div>
            <div>
              <h3>ANGELA P.</h3>
              <p>“AJ is the greatest. He took me under his wing and turned me into a total golf badass. My husand hates that I’m better than him now. Time to sign him up for a lesson.”</p>
            </div>
            <div>
              <h3>REGGIE A.</h3>
              <p>“I was skeptical at first, but now I’m a firm believer in Swing Essentials. I couldn’t believe how much my game has improved in such a short period of time.”</p>
            </div>
          </div>
        </section>
        <section>
          <h1>Try It Today</h1>
          <p>Still not convinced? Download our app and give it a try. Your first lesson is on us.</p>
          <div className="multi_col">
            <div className="button apple_store"/>
            <div className="button google_store"/>
          </div>
          <div className="button small se_button"><span>Sign In</span></div>
        </section>
        <Footer/>
      </div>
    );
  }
}

export default HomePage;
