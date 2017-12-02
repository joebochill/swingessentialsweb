import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from '../header/Header.js';
import Footer from '../footer/Footer.js';
import Datestamp from '../datestamp/Datestamp.js';
import {replace} from 'react-router-redux';
//import * as Actions from '../../actions/actions.js';


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

class NineteenPage extends Component {
  componentWillMount(){
    // if(!this.props.username){
    //   this.props.goToLogin();
    // }
  }
  render() {
    return (
      <div>
      <Header/>
      <section className="landing_image image2">
        <main className="page_title">
          <h1>The 19th Hole</h1>
          <h3>Golf Stories and Q&amp;A</h3>
        </main>
      </section>
      <section className="left">
        <Datestamp month="APR" day="10"/>
        <h1>What kind of clubs should I buy?</h1>
        <p>Talk about growth in the game! Across the nation, we are getting members emailing in
        with questions. Scott from Wisconsin asks,</p>
        <p>“So I’m just getting into golf and have no idea what clubs I need to buy. Do you have any recommendations?”</p>
        <p>Great Question Scott! Golf can be intimidating. However, buying golf clubs shouldn’t be. 
        If you’re just getting into golf, drop by your local sporting goods store and
        pick up a starter set. Many now even come with a bag.</p>
        <p>Keep in mind that these clubs won’t last for long. You should play with a starter set for
        about one to two seasons or until you feel a bit of consistency in your scores. Once you
        get hooked and really start playing, you’ll have to start thinking about length, shaft
        flex, and grip.</p>
        <p>Therefore, here’s a quick rundown of what you’ll need to know once you “graduate”
        from your starter set:</p>
        <p>
          <ol><li>Get the right shaft flex. The right shaft won’t be too heavy. It may be steel or graphite, but
        you certainly don’t want to swing something
        that’s too heavy or too light. Common flexes
        are Light, Senior, Regular, Stiff, and Extra
        Stiff. A lot of tour players play Extra Stiff
        shafts, and my 85-year aunt plays Light
        shafts. You are probably in the middle.</li>
        <li>Get the right length. Length is important, but
        it doesn’t depend on height. It has to do with
        how far the ball away is from you at the set
        up position. A rule of thumb is when you set
        up naturally to hit a shot, are you hitting it
        on the toe, or off of the heel of the club? If
        the heel, you need a shorter club. If on the
        toe, you need a little length.</li>
        <li>Grip is important. People have different size
        hands, so why should everyone have the
        same size grip? There is an easy test to see
        what type of grip you need. Simply hold the
        grip in your left hand (for right handed
        players). Does your ring finger touch the pad
        of your hand? If so, you’ve got the right grip!
        If it digs into the pad in your hand, it’s too
        small. If it doesn’t touch at all, you need a
        smaller grip.</li></ol></p>
        <p>Now doesn’t that seem easy? If you have any
        questions, please visit our website, or your
        local PGA member!</p>
        <p>Thanks and keep it in the short grass.</p>
      </section>

      <section className="left">
        <Datestamp month="FEB" day="18"/>
        <h1>Great Turnout at the Dulles Golf Show</h1>
        <p>Wow, that was unexpected!</p>
        <p>Swing Essentials headed out to the Dulles Golf Show last weekend, and to say that we were busy, well, that’s an understatement! We had the pleasure of meeting and working (well, we don’t really think of it as work per se)  with over 100 people!</p>
        <p>We had a blast helping people swing a club for the first time, getting tips on breaking 100, or simply knocking a few strokes off their game.</p>
        <p>And boy, we had everybody! We spent the weekend working with everyone and really having a great time.</p>
        <p>We hope you had a great time, and learned something in the process.</p>
        <p>We can’t wait until next time but until then, we’ll see you online, and in the future!</p>
      </section>

      <section className="left">
        <Datestamp month="DEC" day="01"/>
        <h1>Golf on People</h1>
        <p>Last month my wife quickly left town so the boys could fly in for our annual weekend golf and poker event.  What a weekend…the weather was perfect and golfing in the fall is my favorite time of year.  Our two foursomes  consisted of the “Young Guns” who keep us old guys competitive and the Grey Goats with our memories of better days.  Hugo tells the same old story that gets longer every year.  By the time he finished this year I was on my sixth beer.  He’d probably give it up if he could hear the comments but he’s needed hearing aids for years.</p>
        <p>The Goat’s foursome was one man short this year.  Mortie’s so called new friend he invited last year was voted off the island for being an asshole.  Regardless of a man down, we posted our best score in years with 13 birdies and no bogies.   The wedge was working.  We always play best ball because that way we don’t have to look for Mortie’s orange balls when he slices out of bounds.  We were up before noon both days. Bets were made, the youths hurried off to the driving range, us old guys walked to the putting green.  We don’t waste our good shots. This year’s winnings kept us in poker money and paid for the Keg and moonshine. Next year we’re upping the bet and will be upgrading to a premium brew.</p>
        <p>Regrettably, I haven’t golfed  much this year and since my golf scores haven’t improved I’ve decided to give it a break until January.  I’m hoping Mrs. Claus and the Elf son will surprise me with a new driver or putter this Christmas.   I’ve finally given up on the new clubs. My wife told me I should be happy with the two new sleeves of Pro V’s that fell out of my golf bag.  No shirts, no shoes, no Pings.</p>
        <p>Golf on people and Happy Holidays.</p>
        <p>The Big Toe (TBT)</p>
      </section>

      <section className="left">
        <Datestamp month="OCT" day="01"/>
        <h1>Advocating for Junior Golf</h1>
        <p>The key to junior golf is to get parents involved early and often. Leverage your generational experience.</p>
        <p>Parents determine not only how much fun the junior golfers have, but according to many psychologists and recent studies, dictate how successful kids can be in golf.</p>
        <p>Also, all indications are that junior golf is on the rise. According to Jake Turtel at Fortune 500 magazine, PGA Junior League Golf has expanded from 1,500 youth participants in 2012 to 8,900 in 2013. This indicates a 490% increase. In 2014, participation doubled (18,000 kids). With this trend, more juniors will be growing up and playing at your local golf courses.</p>
        <p>But how does the golf industry keep these juniors interested and around the game of golf? The answer is parental involvement. Parents, who are defined as being a part of Generation X, have a background that is conducive to advocating for junior golf. According to Jennifer McCallum, author of “Who is Generation X?” these parents have grown up in a world without social media, and yet have adapted to it – even invented it – exquisitely.</p>
        <p>Generation X, and their use of technology is the key to making sure this junior golf trend continues. New golf applications on a cell phone or tablet keeps kids not only involved, but also interested in the game. Golf is very unique in that it has “toys”. If children play baseball, parents will often buy new shoes, bats, or gloves. But the golf industry allows so much more variety. From new hardware, like balls and clubs, to free golf apps on their cell phone to record scores and show trends, golf offers so much more. Also, kids love to see their swing on a screen next to Jordan Speith or Tiger Woods.</p>
        <p>Parents have to make sure that the environment for golf is inviting. The way to do this is through technology. The message is clear, to keep juniors in the game, simply have fun, be supportive, and incorporate all the new technological gadgets. Who knows, you may have more fun too.</p>
        <p>You can also find this article published in the PGA Mid Atlantic Section magazine for November by clicking <a href="https://issuu.com/mapga/docs/issue_2_spread">here</a>. </p>
      </section>

      <section className="left">
        <Datestamp month="SEP" day="09"/>
        <h1>Red Tees at Savannah Harbor Golf Club</h1>
        <p>It’s late August and I already surpassed last years golf outings. Hey, I’m a Senior and need to pace myself. I just returned from a 3-day golf vacation down south to the state of Georgia. Sounded nice although Savannah in August was a tad bit warm, like take your breath away warm and not a dry heat. What was I thinking, but who cares when you have tee times at Savannah Harbor Golf Club. Our threesome consisted of a Pro, my wife, and me, an old hacker. While I was watching the Pro and my wife waste their best shots on the golf range I loaded up the cart with ice water and out of the blue decided to join my wife and play from the red tees. It had nothing to do with slow play, it’s just that I had never played from the red tees before. I thought I’d give it a try like the Arnie TV commercial, while we’re still young.</p>
        <p>Wow, what a difference in play! I didn’t realize how fun golf could be. I don’t really need those Pings now. What an excellent golfer I have become, no more hacker comments from me. I consistently hit the fairway and was on in regulation the majority of the time; hand me my putter! I did hit a few bunkers because of the long drives but only lost one ball install of the usual ten. My attitude towards golf has been renewed. Now, if I can convince Mortie and Hugo to give it a try. If they see me drive the green it won’t be hard. One final note before you give it a try, your score will likely stay the same. Note to self: Work on that putting game. You still need to get the ball in the hole. Happy Golfing.</p>
        <p>The Big Toe (TBT)</p>
      </section>
      <Footer/>
    </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(NineteenPage);
