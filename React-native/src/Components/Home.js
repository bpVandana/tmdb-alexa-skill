import React, { Component } from 'react';
import { Text, Title, View } from 'react-native';
import { Container, Body, Header, Tab, Tabs } from 'native-base';
import Request from './request';
import Response from './response';

export default class Home extends Component {
  render() {
    return (
      <Container>
    <Header hasTabs />
    <Tabs heading="TMDB ">
      <Tab heading="Request">
      <Request />
      </Tab>
      <Tab heading="Response">
      <Response />
      </Tab>
    </Tabs>
  </Container>
    );
  }
}
