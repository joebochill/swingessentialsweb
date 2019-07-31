import React, { Component } from 'react';
import '../../../css/Youtube.css';
import YouTube from 'react-youtube';

class YoutubeVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //active: false
        }
    }

    render() {
        return (
            <div className={"se_video_wrapper " + (this.state.active ? "" : "placeholder")}
                onClick={!this.state.active ? () => this.setState({ active: true }) : null}>
                <YouTube
                    videoId={this.props.vid}
                    id={"se_response_video"}
                    className={"se_video_player"}
                    opts={{
                        playerVars: {
                            "showinfo": 0,
                            "origin": "www.swingessentials.com",
                            "playsinline": 1,
                            "rel": 0
                        }
                    }}
                />
            </div>
        );
    }
}

export default /*connect(mapStateToProps,mapDispatchToProps)*/(YoutubeVideo);
