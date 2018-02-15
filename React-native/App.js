import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container, Header, Tab, Tabs } from 'native-base';
import Request from './src/Components/request';

export default class Home extends Component {
  render() {
    return (
      <Container>
    <Header hasTabs />
    <Tabs initialPage={1}>
      <Tab heading="TMDB Alexa logs">
        <Request />
      </Tab>
    </Tabs>
  </Container>
    );
  }
}
