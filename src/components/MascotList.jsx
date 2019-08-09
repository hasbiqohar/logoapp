import React, { Component } from 'react'
import { srcImg } from './imgHelper'
import { connect } from 'react-redux';

class MascotImage extends Component {

    handleClick = (e) => {

        const mascotImg = new Image();
        mascotImg.src = e.target.src;

        mascotImg.onload = () => {
            this.props.select(mascotImg);
        }

    }

    render() {
        
        return (
            <img 
                src={srcImg(`./mascot/${this.props.list}.png`)} 
                alt={this.props.list + '.png'} 
                width="150" 
                height="150" 
                onClick={this.handleClick} />
        )
    }
}

export class MascotList extends Component {
    render() {

        let list = "";

        if(this.props.list) {
            list = this.props.list.map((value, index) => {
                return (
                    <MascotImage key={index} list={value} select={this.props.select} />
                );
            })
        }

        return (
            <div>
                {list}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        list : state.mascot.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        select : (payload) => dispatch({ type : 'MASCOT_SELECTED', payload : payload })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MascotList)
