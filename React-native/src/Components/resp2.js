import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Container, Text, Button, Card, CardItem, Icon, Header, Left, Body, Title, Content, Spinner} from 'native-base';
import { getLogs } from '../hasuraApi';

export default class Resp2 extends React.Component {
  constructor(props){
    super(props);
    this.state={
      // articleId: props.articleId,
      articleObj: null,
      fontsAreLoaded: false,
    }
  }

  async componentDidMount(){
        let articleObj = await getLogs();
        if(articleObj.status === 200){
          articleObjJson = await articleObj.json();
        this.setState({
            articleObj: articleObjJson[1]
        });
      }

     else {
      if (articleObj.status === 504) { //change from articleList
        Alert.alert('Network error', 'Check your internet connection');
      } else {
        Alert.alert('Something went wrong', 'Please check table permissions and your internet connection')
      }
    }

    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('native-base/Fonts/Ionicons.ttf')
    });
    this.setState({...this.state, fontsAreLoaded: true});
  }

  render() {
    if(this.state.articleObj !== null && this.state.fontsAreLoaded){
      return (
        <Content>
          <Header>
            <Body>
              <Title>Response Json</Title>
            </Body>
          </Header>
              <Text style={styles.red}>Serial:</Text>
              <Text>    {this.state.articleObj.serial}</Text>
              <Text style={styles.red}>Response: </Text>
              <Text>    {this.state.articleObj.rjson}</Text>
              <Text style={styles.red}>Time: </Text>
              <Text>    {this.state.articleObj.time}</Text>

          </Content>
      )

    }
    return (
      <Container>
        <Header />
        <Content>
          <Spinner color='black' />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});
