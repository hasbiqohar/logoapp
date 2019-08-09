import React, { Component } from 'react';

import MainLogo from './components/MainLogo';
import ImageSelected from './components/ImageSelected';
import ImageList from './components/ImageList';
import DownloadImage from './components/DownloadImage';
import ImageText from './components/ImageText';
import Stroke from './components/Stroke';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list : ""
    }
  }

  openList = (nameValue) => {
      this.setState({
        list : nameValue
      })
  }

  closeList = () => {
    this.setState({
      list : ""
    })
  }

  render() {

    let mascotStyle = {
      position : 'absolute',
      top : 60,
      right : 150
    }

    let shieldStyle = {
      position : 'absolute',
      top : 230,
      right : 150
    }

    let bgStyle = {
      position : 'absolute',
      top : 400,
      right : 150
    }

    let textStyle = {
      position : 'absolute',
      top : 570,
      right : 150
    }

    let strokeStyle = {
      position : 'absolute',
      top : 670,
      right  : 150
    }

    return(
      <div>
        <ImageList list={this.state.list} closeList={this.closeList}/>
        <ImageSelected openList={this.openList} name="mascot" item={this.props.mascot} style={mascotStyle} />
        <ImageSelected openList={this.openList} name="shield" item={this.props.mascot} style={shieldStyle} />
        <ImageSelected openList={this.openList} name="background" item={this.props.mascot} style={bgStyle} /> 
        <ImageText style={textStyle}/> 
        <Stroke style={strokeStyle} />
        <DownloadImage />
      </div>
    );
  }
}

export default App;
