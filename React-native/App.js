import SpeechAndroid from 'react-native-android-voice';
import React, { Component } from 'react';
import Cards from './Components/Cards';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
} from 'react-native';
import { Button, Header } from 'react-native-elements';

export default class App extends Component<{}> {
  async buttonClick(){
    try{
        //More Locales will be available upon release.
        var spokenText = await SpeechAndroid.startSpeech("Ask Movie Related queries", SpeechAndroid.US);
        ToastAndroid.show(spokenText , ToastAndroid.LONG);
        return (<Text>this.spokenText</Text>);
    }catch(error){
        switch(error){
            case SpeechAndroid.E_VOICE_CANCELLED:
                ToastAndroid.show("Voice Recognizer cancelled" , ToastAndroid.LONG);
                break;
            case SpeechAndroid.E_NO_MATCH:
                ToastAndroid.show("No match for what you said" , ToastAndroid.LONG);
                break;
            case SpeechAndroid.E_SERVER_ERROR:
                ToastAndroid.show("Google Server Error" , ToastAndroid.LONG);
                break;
            /*And more errors that will be documented on Docs upon release*/
        }
    }
}

  render() {
    const { buttonstyle, container } = styles;
    return (
      <View style={container}>
      <Header
      leftComponent={{ icon: 'menu', color: '#fff' }}
      centerComponent={{ text: 'TMDB ALEXA', style: { color: '#fff' } }}
      rightComponent={{ icon: 'home', color: '#fff' }}
      />
      <Cards />
        <Button
        style={buttonstyle}
        raised
        rounded
        onPress={this.buttonClick}
        iconRight={{ name: 'keyboard-voice' }}
        title="Ask Alexa"
        backgroundColor='#662b84'
        />

    </View>

    );
  }
}

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c2eeef',
  },

  buttonstyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    justifyContent: 'flex-end'
  }
});
