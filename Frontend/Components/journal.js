import React from 'react';
import url from './url';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button,
  RefreshControl,
  AsyncStorage
} from "react-native"
import { LinearGradient } from "expo";

export default class Journal extends React.Component{
  constructor(props){
    super(props);

    this.state= {
      journal: "",
      userid: '',
      value: '',
      emotions: [],
      reasons: [],
      wantJournal: false,
      suggestions: {}
    }

  }
  componentDidMount(){
    let userInfo = this.props.navigation.getParam('userInfo');
    this.setState({
      userid: userInfo.userid,
      value: userInfo.value,
      reasons: userInfo.reasons,
      emotions: userInfo.emotions
    });
  }

  skipSection(){

    const queryUrl = url + '/' + this.state.userid + '/newLog';
    return fetch(queryUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userid: this.state.userid,
        value: this.state.value,
        emotions: this.state.emotions,
        reasons: this.state.reasons,
        journalBody: this.state.journal
      })
    })
    .then(result => result.json())
    .then(jsonResult => {
      if(jsonResult){
        this.setState({
          suggestions: jsonResult
        })
        Alert.alert(
          'Journal skipped',
          "Let's get to suggestions!",
          [
            { text: 'OK', onPress: () =>  this.props.navigation.navigate('Suggestions', {userInfo: userInfo})}
          ]
        )
        let userInfo = {
          userid: this.state.userid,
          suggestions: this.state.suggestions
        }
        this.props.navigation.navigate('Suggestions', {userInfo: userInfo});
      }
    })
  }

  yesJournal(){
    this.setState({
      wantJournal: true
    })
  }

  postJournal(){
    const queryUrl = url + '/' + this.state.userid + '/newLog';
    return fetch(queryUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userid: this.state.userid,
        value: this.state.value,
        emotions: this.state.emotions,
        reasons: this.state.reasons,
        journalBody: this.state.journal
      })
    })
    .then(result => result.json())
    .then(textResult => {
      if(textResult){
        this.setState({
          suggestions: textResult
        })
        let userInfo = {
          userid: this.state.userid,
          suggestions: this.state.suggestions
        }
        Alert.alert(
          'Journal saved',
          "Let's get to suggestions!",
          [
            { text: 'OK', onPress: () =>  this.props.navigation.navigate('Suggestions', {userInfo: userInfo})}
          ]
        )
      }
    })
    .catch(err => console.log('error saving post' + err))
  }


  render(){
    return (

      <LinearGradient style={{height:"100%"}} colors={["#b3e0ff", "#00a3cc"]} >

        {this.state.wantJournal ?

          <View>
            <View>
              <Text style={{textAlign: 'center', color:"white", fontFamily: "Cochin", fontSize: 40}}>Daily Journal</Text>
            </View>

            <TouchableOpacity>
              <Button
                onPress={()=> this.postJournal()}
                title="Save"
              />
            </TouchableOpacity>

            <View style={{alignItems:"center", justifyContent:"center"}}>
              <TextInput
                style={{
                  margin: 15,
                  width: '80%',
                  height: '80%',
                  borderColor: "white",
                  borderWidth: 2
                }}
                multiline = {true}
                placeholder="Write your journal here"
                onChangeText={text => {
                  this.setState({ journal: text })}
                }
              />
            </View>

          </View>

          :

          <View style={{display: 'flex', flex: 1, justifyContent: 'center'}}>

            <Text style={{textAlign: 'center', color:"white", fontFamily: "Cochin", fontSize: 40, paddingTop: "5%"}}>Do you want to make a journal entry?</Text>
            <View style={{alignItems: 'center', paddingTop: "10%"}}>

              <View style={{marginBottom: "5%"}}>
              <TouchableOpacity style={styles.buttonStyle} onPress={() => this.skipSection()}>
                <Text style={{fontSize: 30, textAlign: 'center', color:"white", fontFamily:"Cochin"}}>Skip</Text>
              </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.buttonStyle} onPress={() => this.yesJournal()}>
                <Text style={{fontSize: 30, textAlign: 'center', color:"white", fontFamily:"Cochin"}}>Journal</Text>
              </TouchableOpacity>
            </View>

          </View>
        }

      </LinearGradient>

    );
  }
}



const styles = StyleSheet.create({
  buttonStyle: {
    borderColor: 'white',
    width: 120,
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
