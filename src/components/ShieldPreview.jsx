import React, { Component } from 'react'
import { connect } from 'react-redux';

let lastShieldSrc = "";

let shieldCanvas = new Image();

class ShieldPreview extends Component {

    render() {

        let shield = this.props.shield;    

        if(shield) {
            let mainShield = this.refs.mainShield;

            
            let ctxShield = mainShield.getContext('2d'); 


            shieldCanvas.src = shield ? shield : "";            

            if(shieldCanvas.src !== lastShieldSrc) {
                shieldCanvas.onload = () => {
                    function drawing() {
                        ctxShield.clearRect(0,0, 780, 520);
                        ctxShield.beginPath();
                        ctxShield.drawImage(shieldCanvas, (780/2)-150, (520/2)-150, 300, 300);

                        // requestAnimationFrame(drawing);
                    }
                    drawing();
                }
            }               

            lastShieldSrc = shieldCanvas.src;
        } else if (this.refs.mainShield) {
            let mainShield = this.refs.mainShield;

            let ctxShield = mainShield.getContext('2d');

            ctxShield.clearRect(0,0, 780, 520);
            
        }

        let shieldStyle = {
            position : 'absolute',
            top: 0,
            left: 0,
            zIndex : 2
        }

        return(
                <canvas ref="mainShield" width="780" height="520" style={shieldStyle}></canvas>
        );
    }
}



const shieldPreviewProps = (state) => {
    return {
        shield : state.shield.selected
    }
}



export default connect(shieldPreviewProps)(ShieldPreview);
