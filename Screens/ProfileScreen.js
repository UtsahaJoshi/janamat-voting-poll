import React, { Component } from 'react';
import HeaderBar from './HeaderBar';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <HeaderBar nav={this.props.navigation}/>
    );
  }
}