import React, { Component } from 'react'
import { connect } from 'react-redux'
import { srcImg} from './imgHelper';

export class ImageSelected extends Component {

    constructor(props) {
        super(props);

        this.state = {
            render : ""
        }
    }

    getLink = (name, value) => {
        let link = window.location + srcImg(`./${name}/${value}.${name === 'background' ? 'jpg' : 'png'}`);
        return link.replace("//static", "/static");

    }   

    beforeImg = () => {

        this.props.list.map((value, index) => {

            let link = this.getLink(this.props.name, value);
            let type = this.props.name.toUpperCase()
            
            if (link === this.props.selected) {
                ;
                let before = this.props.list[index - 1] ? this.props.list[index - 1] : this.props.list[this.props.list.length-1];

                let payload = this.getLink(this.props.name, before);
                this.props.select(type, payload);                
            } else if (this.props.selected === null) {
                let before = this.props.list[0];
                let payload = this.getLink(this.props.name, before);
                this.props.select(type, payload);
            }
            return true;
        })        
    }

    afterImg = () => {
        this.props.list.map((value, index) => {

            let link = this.getLink(this.props.name, value);
            let type = this.props.name.toUpperCase()
            
            if (link === this.props.selected) {
                ;
                let after = this.props.list[index + 1] ? this.props.list[index + 1] : this.props.list[0];

                let payload = this.getLink(this.props.name, after);
                this.props.select(type, payload);
            } else if (this.props.selected === null) {
                let after = this.props.list[0];
                let payload = this.getLink(this.props.name, after);
                this.props.select(type, payload);
            }
            return true;
        })
    }

    handleClick = (e) => {
        this.setState({
            render : this.props.openList(this.props.name)
        })
    }

    render() {

        let imageSelected = {
            ...this.props.style,
            display : 'flex',
            alignItems : 'center',
            width : '100%',
            height : '100vh',
            maxWidth : 150,
            maxHeight : 150,
            border : 'solid thin black'
        }

        let beforeStyle = {
            display : 'block',
            left : '-40px',
            position : 'absolute',
            width : 0,
            height : 0,
            borderStyle : 'solid',
            borderWidth : '15px 26px 15px 0',
            borderColor : 'transparent black transparent transparent',
            cursor : 'pointer'
        }

        let beforeStyle2 = {
            ...beforeStyle,
            zIndex : 1,
            left: '-25px',
            borderWidth : '5px 11px 5px 0',
            borderColor : 'transparent white transparent transparent'
        }

        let afterStyle = {
            display : 'block',
            right : '-40px',
            position : 'absolute',
            width : 0,
            height : 0,
            borderStyle : 'solid',
            borderWidth : '15px 0 15px 26px',
            borderColor : 'transparent transparent transparent black',
            cursor : 'pointer'
        }

        let afterStyle2 = {
            ...afterStyle,
            zIndex : 1,
            right: '-25px',
            borderWidth : '5px 0 5px 11px',
            borderColor : 'transparent transparent transparent white'
        }

        let imgStyle = {
            display : 'block',
            width : '100%',
            height : '100%',
            cursor : 'pointer'
        }

        let src = this.props.selected ? this.props.selected : srcImg(`./firstLook/${this.props.name}.jpg`);

        return (
            <div style={imageSelected}>
                <div style={beforeStyle} onClick={this.beforeImg}>                    
                </div>
                <div style={beforeStyle2} onClick={this.beforeImg}></div>
                <img style={imgStyle} src={src} alt={this.props.name + `.${this.props.name === 'background' ? 'jpg' : 'png'}`} onClick={this.handleClick}/>
                <div style={afterStyle} onClick={this.afterImg}>                    
                </div>
                <div style={afterStyle2} onClick={this.afterImg}></div>
                {this.state.render}
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        selected : state[props.name].selected,
        list : state[props.name].list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        select : (type, payload) => dispatch({ type : `${type}_SELECTED`, payload : payload })        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageSelected)
