import React from 'react'
import {
    View,
    Text,
    ActivityIndicator
} from 'react-native'
import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyClPivKMurKtdzdFOvNK0wBC2SR857Dm8Q",
    authDomain: "education-app-ce19d.firebaseapp.com",
    databaseURL: "https://education-app-ce19d.firebaseio.com",
    projectId: "education-app-ce19d",
    storageBucket: "education-app-ce19d.appspot.com",
    messagingSenderId: "720107802142",
    appId: "1:720107802142:web:4e3898be14af3229e9680f",
    measurementId: "G-2TZ5Q5BBWX"
  };

export default class LoadScreen extends React.Component{

    componentDidMount(){
        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig)
        
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user?"MainStack":"Loading")
            console.log(user); 
        })
        console.log(firebase.auth().currentUser);
        
    }

    render() {
      return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{
                marginBottom: 16
            }}>L o a d i n g...</Text>
            <ActivityIndicator size='large' color='#459786' />
        </View>
      )
    };
}