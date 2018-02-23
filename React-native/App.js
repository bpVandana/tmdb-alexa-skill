import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container, Body, Header, Title, Tab, Tabs } from 'native-base';
import Home from './src/Components/Home';


export default class App extends Component {
  render() {
    return (
      <Container>
        <Home />
      </Container>

    );
  }
}
