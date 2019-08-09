import React, { Component } from 'react'
import { connect } from 'react-redux'   

import Contour from '../helpers/Contour';
import * as Action from '../store/actions';

export class DownloadImage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mascotData : ""
        }
    }

    handleClick = () => {
        let canvas = this.refs.canvas;
        let download = document.createElement('a');

        canvas.toBlob((blob) => {
        let url = URL.createObjectURL(blob);

        download.download = "logo.png";
        download.href = url;
        download.click();
        }, 'image/png');
    }

    onMouseClick = (e) => {

        const buff = e.target.getBoundingClientRect();
        let currentX = (e.clientX - buff.left) / buff.width;
        let currentY = (e.clientY - buff.top) / buff.height;

        let dragData = this.props.dragData;

        if(dragData) {
            if(dragData.image) {
                let offset = {
                    x : currentX,
                    y : currentY
                }
                this.props.startDrag(offset);
            }
        }

        let url = this.props.mascot.length > 0 ? this.props.mascot : "";   

        if(url.length > 0) {
            if(this.props.imageData.length > 0) {
                if(this.props.imageData.mascot == this.state.mascotData) {                    
                    return;
                } else {
                    this.props.drawImage('mascot', url);
                    console.log(this.props.imageData);
                }
                this.setState({
                    mascotData : this.props.imageData.mascot
                })
            } else {
                this.props.drawImage('mascot', url);
                console.log(this.props.imageData);
            }
        }
        
    }

    onMouseMove = (e) => {
        const buff = e.target.getBoundingClientRect();
        let currentX = (e.clientX - buff.left) / buff.width;
        let currentY = (e.clientY - buff.top) / buff.height;

        let dragData = this.props.dragData;

        if(dragData) {
            if(dragData.start) {
                console.log(currentX, currentY);
            }
        }
    }

    onMouseUp = (e) => {
        const buff = e.target.getBoundingClientRect();
        let currentX = (e.clientX - buff.left) / buff.width;
        let currentY = (e.clientY - buff.top) / buff.height;

        let dragData = this.props.dragData;

        if(dragData) {
            if(dragData.start) {
                this.props.stopDrag(false);
            }
        }
    }

    dragImage = (e) => {
        console.log(e.target);
    }

    render() {        

        if(this.refs.canvas) {
            let canvas = this.refs.canvas;    
            let ctx = canvas.getContext('2d');                    

            let mascotImg = new Image();
            let shieldImg = new Image();
            let backgroundImg = new Image();

            let mainWidth = canvas.width/3;
            let mainHeight = mainWidth;

            let x = (canvas.width/2) - (mainWidth/2);
            let y = (canvas.height/2) - (mainHeight/2);            

            mascotImg.crossOrigin = shieldImg.crossOrigin = backgroundImg.crossOrigin = 'anonymous';

            mascotImg.src = this.props.mascot.length > 0 ? this.props.mascot : "";
            shieldImg.src = this.props.shield.length > 0 ? this.props.shield : "";
            backgroundImg.src = this.props.background.length > 0 ? this.props.background : "";
            let textImg = this.props.imageText.length > 0 ? this.props.imageText : "";  
            let strokeWidth = this.props.stroke;                    

            mascotImg.onload = () => {
                shieldImg.onload = () => {
                    backgroundImg.onload = () => {

                        let outlineShield = [];
                        let outlineMascot = [];    

                        if(this.props.shield.length > 0) {
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            ctx.drawImage(shieldImg, x, y, mainWidth, mainHeight);
                            outlineShield = Contour.marchingSquare(canvas, canvas.width/2, canvas.height/2);
                        }

                        if(this.props.mascot.length > 0) {
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            ctx.drawImage(mascotImg, x, y, mainWidth, mainHeight);
                            outlineMascot = Contour.marchingSquare(canvas, canvas.width/2, canvas.height/2);
                        }
                                                
                        ctx.clearRect(0, 0, canvas.width, canvas.height);    
                        
                        if(this.props.background.length > 0) {
                            ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
                        }

                        if((this.props.mascot.length + this.props.shield.length) > 0) {                           
                                                        
                            if(outlineMascot.length > 0) {
                                drawStroke(ctx, '#f99d1c', "blue", outlineMascot);
                            }
                            if(outlineShield.length > 0) {
                                drawStroke(ctx, '#f99d1c', "blue", outlineShield);
                            }
                            ctx.drawImage(shieldImg, x, y, mainWidth, mainHeight);
                            ctx.drawImage(mascotImg, x-900, y, mainWidth, mainHeight);
                            
                        }     

                        if(textImg.length > 0) {

                            ctx.font = "900 300px  sans-serif";
                            ctx.fillStyle = "white";
                            ctx.strokeStyle = "blue";
                            ctx.lineWidth = strokeWidth;
                            ctx.miterLimit = 2;
                            let textWidthPlot = canvas.width/2 - ctx.measureText(textImg).width/2;
                            ctx.strokeText(textImg, textWidthPlot, mainHeight);
                            ctx.fillText(textImg, textWidthPlot, mainHeight);
                            ctx.globalCompositeOperation = "source-over";
                            ctx.fillText(textImg, textWidthPlot, mainHeight);                    
                        }
                        
                        function drawStroke(ctx, fillStyle, strokeStyle, contour) {
                            ctx.beginPath();

                            ctx.fillStyle = fillStyle;
                            ctx.strokeStyle = strokeStyle;
                            ctx.lineWidth = strokeWidth;
                            ctx.moveTo(contour[0], contour[1]);                                                      
                                                     
                            for(let i = 0; i < contour.length; i++) {
                                ctx.lineTo(contour[i][0], contour[i][1]);
                            }

                            ctx.closePath();

                            ctx.fill();
                            ctx.stroke();
                        }

                    }
                    setTimeout(backgroundImg.onload);
                }
                setTimeout(shieldImg.onload);
            }
            setTimeout(mascotImg.onload);
        }

        const canvasStyle = {
            maxWidth : 900,
            maxHeight : 600,
            borderStyle : 'solid',
            borderColor : '#000',
            borderSize : 'thin'
        }

        return (
            <div>
                <button onClick={this.handleClick}>download</button>
                <canvas 
                    ref="canvas" 
                    width="900" 
                    height="600" 
                    style={canvasStyle} 
                    onMouseDown={this.onMouseClick} 
                    onMouseMove={this.onMouseMove}
                    onMouseUp={this.onMouseUp}></canvas>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        mascot : state.mascot.selected,
        shield : state.shield.selected,
        background : state.background.selected,
        imageText : state.imageText,
        dragData : state.dragData,
        stroke : parseInt(state.stroke),
        imageData : state.imageData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startDrag : (payload) => dispatch({type : 'MOUSE_CLICK', payload : payload}),
        stopDrag : (payload) => dispatch({type : 'MOUSE_UP', payload : payload}),
        drawImage : (name, image) => dispatch(Action.drawImage(name, image))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadImage)
