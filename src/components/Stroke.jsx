import React, { Component } from 'react'
import { connect } from 'react-redux';

export class Stroke extends Component {

    constructor(props) {
        super(props);

        this.state = {
            stroke : 10
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })

        this.props.strokeWidth(e.target.value);
    }

    render() {
        return (
            <div style={this.props.style}>
                <form>
                    <label>{this.state.stroke}</label>
                    <input 
                        type="range" 
                        name="stroke" 
                        min="10" 
                        max="200" 
                        onChange={this.onChange} 
                        value={this.state.stroke}/>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        strokeWidth : (payload) => dispatch({type : 'STROKE_UPDATE', payload : payload})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stroke)
