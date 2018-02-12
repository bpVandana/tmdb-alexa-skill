
import SpeechAndroid from 'react-native-android-voice';
import React, { Component } from 'react';

export default class Help extends Component{
  async buttonClick() {
      try {
          //More Locales will be available upon release.
          var spokenText = await SpeechAndroid.startSpeech("Speak yo", SpeechAndroid.GERMAN);
          ToastAndroid.show(spokenText , ToastAndroid.LONG);
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
}
