import React, { Component } from 'react'
import { srcImg } from './imgHelper'
import { connect } from 'react-redux'

class Image extends Component {

    handleClick = (e) => {

        const itemImg = new Image();
        itemImg.src = e.target.src;
        this.props.imageSelected(this.props.index);
        // e.target.style.backgroundColor = '#f99d1c';
        let type = this.props.item.toUpperCase();

        // itemImg.onload = () => {            
        //     this.props.select( type, itemImg);
        //     console.log(type);
        // }

        this.props.select( type, e.target.src );
        this.props.dragSelect(this.props.item);
    }

    render() {

        let extension = this.props.item === 'background' ? 'jpg' : 'png';
        let src = srcImg(`./${this.props.item}/${this.props.list}.${extension}`);
        let alt = this.props.list + `.${this.props.item === 'background' ? 'jpg' : 'png'}`
        
        return (
            <img 
                src={src} 
                alt={alt} 
                width="150" 
                height="150" 
                style={this.props.style}
                onClick={this.handleClick}/>
        )
    }
}

export class ImageList extends Component {   
    
    constructor(props) {
        super(props);
        this.state = {
            style : {
                backgroundColor : "transparent",
                padding : "10px"
            },
            activeIndex : null
        }
    }

    handleClick = () => {
        this.props.dragSelect(null);
        this.props.closeList();
    }

    handleRemove = () => {
        this.setState({
            activeIndex : null
        })
        this.props.remove(this.props.list.toUpperCase());
        this.props.closeList();
    }

    imageSelected = (index) => {
        this.setState({
            activeIndex : index
        })
    }

    // componentDidUpdate(prevState) {
    //     if(this.state.activeIndex !== prevState) {
    //         // console.log(this.state.activeIndex);
    //     }
    // }

    render() {

        let list = "";

        if(this.props.list) {
            list = this.props[this.props.list].list.map((value, index) => {
                
                let style= (this.state.activeIndex === index) ?
                            { ...this.state.style, backgroundColor : "#f99d1c"} :
                            { ...this.state.style, backgroundColor : "transparent"};
                // console.log(index, style);
                return (
                    <Image 
                        key={index} 
                        index={index}
                        list={value} 
                        select={this.props.select} 
                        item={this.props.list}
                        style={style}
                        imageSelected={this.imageSelected}
                        dragSelect={this.props.dragSelect}
                        />
                );
            })
        }

        let listStyle = !this.props.list ? null : {
            position : 'absolute',
            width : 350,
            height : 'auto',
            padding : 25,
            top : 50,
            right : 50,
            border : 'solid thin blue',
            backgroundColor : '#EEE7DF',
            zIndex : 10
        }

        let button = !this.props.list ? "" :
            <div>
                <button onClick={this.handleRemove}>REMOVE</button>
                <button onClick={this.handleClick}>SELECT</button>                
            </div>;

        return (
            <div style={listStyle}>
                {list}                
                {button}
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        [props.list] : state[props.list]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        select : (type, payload) => dispatch({ type : `${type}_SELECTED`, payload : payload }),
        remove : (type) => dispatch({ type : `${type}_REMOVED`, payload : ""}),
        dragSelect : (payload) => dispatch({ type : 'IMAGE_MOVE', payload : payload})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageList)
