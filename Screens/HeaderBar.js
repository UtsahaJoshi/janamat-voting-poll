import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Image } from 'react-native';
import vote from '../images/vote.png';
import balen from '../images/balen.jpeg';

export default class HeaderBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <Header>
          <Left>
              <Button transparent>
              <Icon name="bars" onPress={() => this.props.nav.openDrawer()} size={24} color="#cc5500" />
              </Button>
          </Left>
          <Body>
              <Image source={vote} style={{justifyContent:'center', resizeMode: 'contain', height: 20}} />
          </Body>
          <Right>
 
              <Image source={balen} style={{
                width: 40,
                height: 40,
                borderRadius: 150 / 2,
                overflow: "hidden",
                borderWidth: 1,
                borderColor: 'grey'
                }} 
              />
          </Right>
        </Header>
    );
  }
}
