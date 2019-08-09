import React, { Component } from 'react'
import { connect } from 'react-redux'

let mascotCanvas = new Image();

class MascotPreview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timer : 0,
            lastMascotSrc : ""
        }
    }

    onMouseDown = (e) => {
        if (this.props.mascot) {
            const buff = e.target.getBoundingClientRect();
            let currentX = (e.clientX - buff.left) / buff.width;
            let currentY = (e.clientY - buff.top) / buff.height;

            let x = (780/2)-150;
            let y = (520/2)-150;

            if(this.props.dragData) {
                if(this.props.dragData.drag) {
                    x = this.props.dragData.drag.x;
                    y = this.props.dragData.drag.y;
                }
            }

            let posX = currentX * 780;
            let offsetX = x - posX;
            let posY = currentY * 520;
            let offsetY = y - posY;
            
            let dragData = {
                offsetX : offsetX,
                offsetY : offsetY,
                down : true
            }
            this.props.mouseClick(dragData);
        }
        
    }

    onMouseMove = (e) => {
        if(this.props.dragData) {
            if(this.props.dragData.offset.down) {
                const buff = e.target.getBoundingClientRect();
                let currentX = (e.clientX - buff.left) / buff.width;
                let currentY = (e.clientY - buff.top) / buff.height;

                let posX = currentX * 780;
                let posY = currentY * 520;

                let x = posX + this.props.dragData.offset.offsetX;
                let y = posY + this.props.dragData.offset.offsetY;

                let moveData = {
                    x : x,
                    y : y
                }

                this.props.mouseMove(moveData);

            }
            
        }
    }

    onMouseUp = (e) => {
        if(this.props.dragData) {
            let dragData = {
                offsetX : 0,
                offsetY : 0,
                down : false
            }
            this.props.mouseClick(dragData);
        }
    }

    componentDidUpdate() {

        // if(this.props.dragData) {
        //     if(this.props.dragData.image) {
        //         let x = this.props.dragData.image.x;
        //         x--;
        //         // if(Math.round(x) > 0) {
        //         //     this.props.imageMove({ x : Math.round(x)});
        //         // }
        //         console.log(x)
        //     }
        // }
    }

    render() {

        let mascot = this.props.mascot;    

        if(mascot) {
            let mainMascot = this.refs.mainMascot;

            let ctxMascot = mainMascot.getContext('2d');

            mascotCanvas.src = mascot ? mascot : "";

            let own = this;

            if(mascotCanvas.src !== this.state.lastMascotSrc) {
                console.log(mascotCanvas.src);
                
                mascotCanvas.onload = () => {
                    
                    drawing();
                    console.log("eek");
                }
            } else {
                drawing();
                console.log("uuk");
            }     
            
            function drawing() {
                let x = (780/2)-150;
                let y = (520/2)-150;                        
                let xNow = x;
                // let yNow = y;

                if(own.props.dragData) {
                    if(own.props.dragData.drag) {

                        xNow = own.props.dragData.drag.x;
                        x = own.props.dragData.image ?
                                    Math.round(own.props.dragData.image.x) : xNow;

                        // if(own.props.dragData.image) {
                        //     x = own.props.dragData.image.x;
                        // }

                        // console.log(own.props.dragData.image);

                        if(x<xNow) {
                            x+=1;
                            own.props.imageMove({ x : x});
                            console.log(x);
                        }else if(x>xNow) {
                            x-=1;
                            own.props.imageMove({ x : x});
                        }
                        // else if(own.props.dragData.offset.down && !own.props.dragData.image) {
                        //     if(own.props.dragData.offset) {
                        //         own.props.imageMove({ x : x});
                        //     }

                        //     // console.log(own.props.dragData.offset.down);
                        // }

                        
                        // own.props.imageMove({ x : x});
                        // x = xMove;
                        y = own.props.dragData.drag.y;
                    }
                }

                

                // let timer = setInterval(draw, 1000/30);

                function draw() {
                    ctxMascot.clearRect(0,0, 780, 520);
                    ctxMascot.beginPath();
                    ctxMascot.drawImage(mascotCanvas, x, y, 300, 300);
                }

                draw();

                // requestAnimationFrame(drawing);
            }

            // this.setState({
            //     lastMascotSrc : mascotCanvas.src
            // })
        } else if (this.refs.mainMascot) {
            let mainMascot = this.refs.mainMascot;

            let ctxMascot = mainMascot.getContext('2d');

            ctxMascot.clearRect(0,0, 780, 520);

        }

        let mascotStyle = {
            position : 'absolute',
            top: 0,
            left: 0,
            zIndex : 3
        }
    
        return(
                <canvas 
                    ref="mainMascot" 
                    width="780" 
                    height="520" 
                    style={mascotStyle}
                    onMouseDown={this.onMouseDown}
                    onMouseMove={this.onMouseMove}
                    onMouseUp={this.onMouseUp}
                    ></canvas>
        );
    }
}

const mascotPreviewProps = (state) => {
    return {
        mascot : state.mascot.selected,
        dragData : state.dragData
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        mouseClick : (payload) => dispatch({ type : 'MOUSE_CLICK', payload : payload}),
        mouseMove : (payload) => dispatch({ type : 'MOUSE_MOVE', payload : payload}),
        imageMove : (payload) => dispatch({ type : 'IMAGE_MOVE', payload : payload})
    }
}

export default connect(mascotPreviewProps, mapDispatchToProps)(MascotPreview);