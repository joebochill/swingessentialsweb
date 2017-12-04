import React, { Component } from 'react';
import '../../../css/Lessons.css';
//import {push} from 'react-router-redux';
//import {connect} from 'react-redux';
import '../../../css/Youtube.css';

// const mapStateToProps = (state)=>{
//     return {

//     };
// }

// const mapDispatchToProps = (dispatch)=>{
//   return {
//     push: (val) => {dispatch(push(val))}
//   }
// }

class LessonRow extends Component {
    constructor(props){
        super(props);
        this.state={
            active: false
        }
    }

    render() {
        return (
            <div className={"se_video_wrapper "+(this.state.active?"":"placeholder")} 
                onClick={!this.state.active ? ()=>this.setState({active:true}) : null}> 
                {!this.state.active && (
                    <img 
                        src={`https://i.ytimg.com/vi/${this.props.vid}/maxresdefault.jpg`} 
                        className="placeholder_img" 
                        alt="Your Swing Analysis Video"/>
                )}
                {!this.state.active && (
                    <div 
                        className="se_video_start_button">
                        <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
                            <path className="ytp-large-play-button-bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#212121" fillOpacity="0.8"></path>
                            <path d="M 45,24 27,14 27,34" fill="#fff"></path>
                        </svg>
                    </div>
                )}
                {this.state.active && (
                    <iframe title="Your Swing Analysis" className="se_video_player"
                        src={`https://www.youtube-nocookie.com/embed/${this.props.vid}?rel=0&amp;showinfo=0;autoplay=1`}
                        frameBorder="0" 
                        allowFullScreen>
                    </iframe> 
                )}
            </div>
        );
    }
}

export default /*connect(mapStateToProps,mapDispatchToProps)*/(LessonRow);
