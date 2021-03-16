import React, { Component } from 'react';
import { View, ActivityIndicator, Image, FlatList } from 'react-native';
import _ from 'lodash';
import HeaderBar from './HeaderBar';
import { Text, FooterTab, Button, Container, Content, Item, Input, Body, Card, CardItem, Footer, Left, Right, Header, Title, Thumbnail} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state= {
      isLoading: true,
      dataSource: null,
      query: "",
      searchData: [],
    }
  }
  fetchPolls = async() => {
    var DEMO_TOKEN = await AsyncStorage.getItem('userToken');
    console.log(DEMO_TOKEN)
    return fetch('http://127.0.0.1:3000/api/v1/polls', {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + DEMO_TOKEN
      }
    })
      .then ( (response) => response.json())
      .then( (responseJson) => {
        console.log(responseJson.data.polls)
        this.setState({
          isLoading: false,
          dataSource: responseJson.data.polls,
          searchData: responseJson.data.polls,
        })
      })
    .catch((error) => {
      console.log(error)
    });
  }
  componentDidMount () {
    this.fetchPolls()
  }

  handleSearch = (text) => {
    const formatQuery = text.toLowerCase();
    const data = _.filter(this.state.searchData, pollData => {
        let pollNameNow = pollData.pollName.toLowerCase();
        if (pollNameNow.includes(formatQuery)) {
          return true;
        }
        return false;
      })
      this.setState({query: formatQuery, dataSource: data})
  }

  renderItem = ({ item }) => {
      return (
        <Card style={{flex:0, borderTopWidth:0}}>
          <CardItem>
              <Left>
                <Thumbnail source={{uri: item.pollImage}} />
                <Body>
                  <Text>{item.pollName}</Text>
                  <Text note>pollType</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri: item.pollImage}} style={{alignSelf: 'center', height: 200, width: 200, flex: 1}}/>
                <Text>
                  Poll Description
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Text>1,926 stars</Text>
                </Button>
              </Left>
            </CardItem>
        </Card>
      );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <Container>
          <ActivityIndicator />
        </Container>
      )
      } else {
      return (
        <Container>
          <HeaderBar nav={this.props.navigation}/>
          <Item style={{marginTop: 5, width: 300, alignSelf: 'center', backgroundColor:'#c7c9c8', borderRadius: 30}}>
              <Icon name="search" style={{position: 'absolute', marginLeft: 100}} />
              <Input placeholder= "Search" style={{textAlign: 'center'}} onChangeText={this.handleSearch}/>
          </Item>


            <FlatList
              data={this.state.dataSource}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
            />

            <Footer>
              <FooterTab>
                <Button full>
                  <Text>© Liveasily 2021</Text>
                </Button>
              </FooterTab>
            </Footer>
        </Container>
      );
    }
  }
}
