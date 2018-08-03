import React from 'react';
import url from './url';
import {  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button,
  RefreshControl,
  AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo';

  export default class GridScreen extends React.Component {

    constructor(){
      super();
      this.state = {
        reasons: [],
        userid: '',
        value: '',
        emotions: []
      }
    }

    componentDidMount(){
      let userInfo = this.props.navigation.getParam('userInfo');
      this.setState({
        userid: userInfo.userid,
        value: userInfo.value,
        emotions: userInfo.emotions
      });
    }

    select(caption) {
      let arr = this.state.reasons.slice()
      arr.push(caption)
      this.setState({
        reasons: arr
      });
    }

    next(){
      let userInfo = {
        userid: this.state.userid,
        reasons: this.state.reasons,
        value: this.state.value,
        emotions: this.state.emotions
      }
      this.props.navigation.navigate('Journal', {userInfo: userInfo})
    }


    render(){
      return(
        <View>
          <LinearGradient colors={["#b3e0ff", "#00a3cc"]} >
            <View style={{justifyContent:"center",}}>
          <Text style={styles.titleText}>What affected you today?</Text>
        </View>
          <View style={{flexDirection: "row", justifyContent: "space-between", height: "18%"}}>
            <FullIcon iconName="md-bookmarks" caption="Education" select={this.select.bind(this)}/>
            <FullIcon iconName="ios-briefcase" caption="Work" select={this.select.bind(this)}/>
            <FullIcon iconName="ios-home" caption="Family" select={this.select.bind(this)}/>
          </View>
          <View style={{flexDirection: "row", justifyContent: "space-between", height: "18%"}}>
            <FullIcon iconName="md-heart" caption="Relationship" select={this.select.bind(this)}/>
            <FullIcon iconName="ios-restaurant" caption="Food" select={this.select.bind(this)}/>
            <FullIcon iconName="md-car" caption="Travel" select={this.select.bind(this)}/>
          </View>
          <View style={{flexDirection: "row", justifyContent: "space-between", height: "18%"}}>
            <FullIcon iconName="ios-contacts" caption="Friends" select={this.select.bind(this)}/>
            <FullIcon iconName="md-bicycle" caption="Exercise" select={this.select.bind(this)}/>
            <FullIcon iconName="ios-partly-sunny" caption="Weather" select={this.select.bind(this)}/>
          </View>

          <View style={{justifyContent: "center", alignItems: 'center',}}>
            <TouchableOpacity style={styles.nextButton} onPress={() => this.next()}>

              <Text style={styles.nextText}>
                Next
              </Text>

            </TouchableOpacity>
            </View>
        </LinearGradient>
        </View>
      )
    }


  }

  export class FullIcon extends React.Component {
    constructor(props){
      super(props);
    }

    render(){
      return(
        <TouchableOpacity onPress={() => this.props.select(this.props.caption)} style={styles.iconStyle}>
          <Icon color='white' type='ionicon' name={this.props.iconName} size="50" />
          <Text style={{fontSize: 15, color: 'white'}}>{this.props.caption}</Text>
        </TouchableOpacity>
      )
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#d6f2c6',
      alignItems: 'center',
    },
    iconStyle: {
      justifyContent: "center",
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'white',
      height: "100%",
      width: "33.33%"
    },
    nextButton: {
      alignItems: "center",
      justifyContent: 'center',
      height: "20%",
      width: "100%",

    },
    titleText:{
      height: "26%",
      textAlign:"center",
      justifyContent: 'center',
      fontSize: 30,
      color:"white",
      fontFamily:"Cochin"
    },
      nextText:{
        fontSize: 20,
        fontFamily: 'Cochin',
        textAlign:"center",
        justifyContent: 'center',
        fontSize: 25,
        color:"white",
        fontFamily:"Cochin"
      }
  })
