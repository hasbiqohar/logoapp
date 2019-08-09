import React, { Component } from 'react'
import { connect } from 'react-redux'

let lastBackgroundSrc = "";
let backgroundCanvas = new Image();

class BackgroundPreview extends Component {

    render() {

        let background = this.props.background;      

        if(background) {
            let mainBackground = this.refs.mainBackground;

            let ctxBackground = mainBackground.getContext('2d'); 

            backgroundCanvas.src = background ? background : "";

            if(backgroundCanvas.src !== lastBackgroundSrc) {
                backgroundCanvas.onload = () => {
                    function drawing() {
                        ctxBackground.clearRect(0,0, 780, 520);
                        ctxBackground.beginPath();
                        ctxBackground.drawImage(backgroundCanvas, 0, 0, 780, 520);

                        // requestAnimationFrame(drawing);
                    }
                    drawing();
                }
            }            

            lastBackgroundSrc = backgroundCanvas.src;
        } else if (this.refs.mainBackground) {
            let mainBackground = this.refs.mainBackground;

            let ctxBackground = mainBackground.getContext('2d');

            ctxBackground.clearRect(0,0, 780, 520);
            
        }

        let backgroundStyle = {
            position : 'absolute',
            top: 0,
            left: 0,
            zIndex : 1
        }
    
        return(
                <canvas ref="mainBackground" width="780" height="520" style={backgroundStyle}></canvas>
        );
    }
}

const backgroundPreviewProps = (state) => {
    return {
        background : state.background.selected
    }
}

export default connect(backgroundPreviewProps)(BackgroundPreview);