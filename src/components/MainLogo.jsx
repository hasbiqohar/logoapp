import React, { Component } from 'react'

import MascotPreview from './MascotPreview';
import ShieldPreview from './ShieldPreview';
import BackgroundPreview from './BackgroundPreview';

export class MainLogo extends Component {

    render() {

        let mainStyle = {
            position : 'absolute',
            height : 'calc(100vh - 150px)',
            width : '100%',
            maxWidth : 780,
            maxHeight : 520,
            top : 90,
            left : 30,
            border : 'solid thin black'
        }

        return (
            <div style={mainStyle}>
                <MascotPreview />
                <ShieldPreview />
                <BackgroundPreview />
            </div>
        )
    }
}

// const mapStateToProps = (state) => {
//     return {
//         mascot : state.mascot.selected,
//         shield : state.shield.selected,
//         background : state.background.selected
//     }
// }

export default MainLogo;
