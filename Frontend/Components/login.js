import React from 'react';
import url from './url';
import {  StyleSheet,
View,
Text,
TouchableOpacity,
TextInput,
Image,
ListView,
Alert,
Button,
RefreshControl,
AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { LinearGradient } from 'expo';

export default class LoginScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      username: "",
      password: "",
      userid: ''
    }
  }
  login(){
    let queryUrl = url + '/login';
    return fetch(queryUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
    .then(response => response.json())
    .then(json => {
      if (json.userid){
        console.log('userInfo', json.userid);
        this.setState({
          userid: json.userid
        });
        this.props.navigation.navigate('HomePage', {userInfo: this.state});
      }
    })

  }
  //good
  register(){
    this.props.navigation.navigate('Register');
  }
  render() {
    return (
      <View >
        <LinearGradient style={{height: "100%"}} colors={["#b3e0ff", "#00a3cc"]} >
        <Text style={styles.textBig}>Head Smart</Text>

        <View style={{alignItems: 'center'}}>
        <Image style={{height:80, width: 80}} source={require('./bulb.png')}/>
      </View>


        <View style={{alignItems:"center", justifyContent:"center"}}>
          <TextInput
            style={{
              margin: 15,
              width: 200,
              height: 40,
              borderColor: "white",
              borderWidth: 2
            }}
            placeholder=" Username"
            onChangeText={text => {
              console.log('adding login ---------' + text)
              this.setState({ username: text })}
            }
          />
          <TextInput
            style={{
              margin: 15,
              width: 200,
              height: 40,
              borderColor: "white",
              borderWidth: 2
            }}
            placeholder=" Password"
            secureTextEntry={true}
            onChangeText={text => {
              console.log('adding password ---------' + text)
              this.setState({ password: text })}
            }
          />
        </View>
        <View style={{alignItems: "center", justifyContent:"center"}}>
          <TouchableOpacity
            onPress={() => {
              this.login();
            }}
            style={styles.button}
            >
              <Text style={styles.buttonLabel}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.register();
              }}
              >
                <Text style={styles.buttonLabel}>Register</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      paddingTop:100,
      flex: 1,
      backgroundColor: '#d6f2c6',
      alignItems: 'center',
    },
    textBig: {
      color:"white",
      fontSize: 50,
      textAlign: 'center',
      margin: 10,
      marginTop: 30,
      fontFamily: "Georgia"
    },
    button: {
      alignItems: 'center',
      padding: 10,
      margin: 10,
      borderColor: "white",
      borderRadius: 5,
      borderWidth: 1,
      width: 150
    },
    buttonLabel: {
      fontFamily:"Cochin",
      color:"white",
      textAlign: 'center',
      fontSize: 25
    },
  });