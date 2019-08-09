import React, { Component } from 'react'
import { connect } from 'react-redux'

export class ImageText extends Component {

    onChange = (e) => {

        this.props.changeText(e.target.value);
        
    }

    render() {
        return (
            <div style={this.props.style}>
                <h2>logo name</h2>
                <form>
                    <input type="text" onChange={this.onChange}  />
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        imageText : state.imageText
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeText : (payload) => dispatch({ type : 'TEXT_UPDATE', payload : payload})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageText)
