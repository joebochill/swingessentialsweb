import React, { Component } from 'react';
import '../../../css/Youtube.css';
import YouTube from 'react-youtube';

class YoutubeVideo extends Component {
    constructor(props){
        super(props);
        this.state={
            //active: false
        }
    }

    render() {
        return (
            <div className={"se_video_wrapper "+(this.state.active?"":"placeholder")} 
                onClick={!this.state.active ? ()=>this.setState({active:true}) : null}> 
                {false && (
                    <img 
                        /*src={`https://i.ytimg.com/vi/${this.props.vid}/maxresdefault.jpg`} */
                        src={`https://i.ytimg.com/vi/${this.props.vid}/hqdefault.jpg`}
                        className="placeholder_img" 
                        alt="Your Swing Analysis Video"/>
                )}
                {false && (
                    <div 
                        className="se_video_start_button">
                        <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
                            <path className="ytp-large-play-button-bg" d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#212121" fillOpacity="0.8"></path>
                            <path d="M 45,24 27,14 27,34" fill="#fff"></path>
                        </svg>
                    </div>
                )}
                {false && (
                    <iframe title="Your Swing Analysis" className="se_video_player"
                        src={`https://www.youtube-nocookie.com/embed/${this.props.vid}?rel=0&amp;showinfo=0;autoplay=1`}
                        frameBorder="0" 
                        allowFullScreen>
                    </iframe> 
                )}
                <YouTube
                    videoId={this.props.vid}
                    id={"se_response_video"}
                    className={"se_video_player"}
                    opts={{
                    //     height: 'auto',
                    //     width: '100%',
                    //     playerVars: {autoplay: 0}  
                        playerVars:{
                            "showinfo":0,
                            "origin":"www.swingessentials.com",
                            "playsinline":1,
                            "rel":0
                        }
                    }}
                    //onReady={null}
                    //onPlay={null}
                    //onPause={null}
                    //onEnd={null}
                    //onError={null}
                    //onStateChange={null}
                    //onPlaybackRateChange={null}
                    //onPlaybackQualityChange={null}
                />
            </div>
        );
    }
}

export default /*connect(mapStateToProps,mapDispatchToProps)*/(YoutubeVideo);
