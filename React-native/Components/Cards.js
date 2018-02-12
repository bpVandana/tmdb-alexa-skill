
import { View, Text, Image } from 'react-native'
import { Card, ListItem, Button } from 'react-native-elements'
import React, { Component } from 'react';
import Help from './help';

export default class Cards extends Component {
  sampleIntents() {
    return (<Help />);
  }
  render() {
    return (
      <Card
        title='The Movie Database'
        image={require('./logo.png')}>
        <Text style={{marginBottom: 10}}>
        Search for "TMDB, High Budget Films",
         "TMDB, Director Of Avatar", and more...
        </Text>
        <Button
          icon={{name: 'code'}}
          onPress={this.sampleIntents}
          backgroundColor='#03A9F4'
          fontFamily='Lato'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='Sample Intents' />
      </Card>
    );
  }
}
