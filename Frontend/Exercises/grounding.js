import React from 'react';
import { StyleSheet, Text, View, Animated, TextInput, Button, ListView, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { StackNavigator } from 'react-navigation';
import Swiper from 'react-native-swiper'



export default class GroundingScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      userid: "",
      name: ""
    };
  }

  componentDidMount(){
    let userInfo = this.props.navigation.getParam('userInfo');
    this.setState({
      userid: userInfo.userid,
      name: userInfo.name
    })
  }

  toreEvaluate(){
    console.log('userid in grounding -----' + this.state.userid)
    let userInfo = {
      userid: this.state.userid,
      name: this.state.name
    }
    this.props.navigation.navigate('Reevaluate', {userInfo: userInfo});
  }

  static navigationOptions = {
    title: 'Swiper'
  };

  render() {
    return (
      <Swiper>
        <Instructions/>
        <SayItOnce/>
        <Inputs/>
        <Done Reevaluate={this.toreEvaluate.bind(this)}/>
      </Swiper>
    );
  }
}



class Instructions extends React.Component{
  static navigationOptions = {
    title: 'Instructions'
  };

  render() {
    return (
      <View style={styles.container}>
        <Animatable.Text animation="fadeInDown" style={styles.instructions}>
          Grounding exercises are helpful when you need a distraction to calm down.
        </Animatable.Text>
        <Animatable.Text animation="fadeInDown" style={{fontSize: 20, fontStyle: 'italic'}}>
          Swipe left to get started!
        </Animatable.Text>
      </View>
    )
  }
}




//fade in each text input after the prior has been completed...show swipe option after
class SayItOnce extends React.Component {
  state = {
    intro: true,
    name: false,
    dob: false,
    address: false,
    done: false
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.intro ?
          <TouchableOpacity onPress={()=> this.setState({
            intro:false,
            name:true
          })}>
          <Animatable.Text animation="fadeIn" style={styles.instructions}>
            It might seem a little silly...but speakout aloud is a great way to engage in the present moment. Try these out - click the instructions when complete!
          </Animatable.Text>
        </TouchableOpacity> : null}
        {this.state.name ?
          <TouchableOpacity onPress={() => this.setState({
            name: false,
            dob: true
          })}>
          <Animatable.Text animation="fadeIn" style={styles.instructions}>
            Say your name out loud three times...
          </Animatable.Text>
        </TouchableOpacity> : null}
        {this.state.dob ?
          <TouchableOpacity onPress={() => this.setState({
            dob: false,
            address: true
          })}>
          <Animatable.Text animation="fadeIn" style={styles.instructions}>
            Say your date of birth out loud five times...
          </Animatable.Text>
        </TouchableOpacity> : null}
        {this.state.address ?
          <TouchableOpacity onPress={() => this.setState({
            address: false,
            done: true
          })}>
          <Animatable.Text animation="fadeIn" style={styles.instructions}>
                Say the name of the state or country you are in out loud five times...
          </Animatable.Text>
        </TouchableOpacity>: null}
        {this.state.done ?
          <Animatable.Text animation="slideInDown" style={styles.instructions}>
            Great - swipe left to continue!
          </Animatable.Text>
          : null}
        </View>
      )
    }
  }


    class Inputs extends React.Component{
      render() {
        return (
          <View style={styles.container}>
            <Text>
              Next let's look around your current environment...tell me:
            </Text>
            <Text>
              How many red things can you find or see?
            </Text>
            <TextInput placeholder="enter here"
              style={{height: 50, borderWidth: 2, borderColor: "grey", width: 300, fontSize: 25}}/>
              <Text>
                How many blue?
              </Text>
              <TextInput placeholder="enter here"
                style={{height: 50, borderWidth: 2, borderColor: "grey", width: 300, fontSize: 25}}/>
                <Text>
                  How many people are there?
                </Text>
                <TextInput placeholder="enter here"
                  style={{height: 50, borderWidth: 2, borderColor: "grey", width: 300, fontSize: 25}}/>
                  <Text>
                    What sounds do you hear?
                  </Text>
                  <TextInput placeholder="enter here"
                    style={{height: 50, borderWidth: 2, borderColor: "grey", width: 300, fontSize: 25}}/>
                    <Text>
                      Awesome - swipe left!
                    </Text>
                  </View>
                )
              }
            }

            class Done extends React.Component{
              static navigationOptions = {
                title: 'Done'
              };

              goBack() {
                this.props.navigation.navigate('Instructions')
              }

              render() {
                return (
                  <View style={styles.container}>
                    <Animatable.Text animation="fadeIn" style={styles.instructions}>
                      Good job - you have completed this exercise!
                    </Animatable.Text>
                    <Animatable.Text animation="fadeIn" style={styles.instructions}>
                      If you need more, swipe left!
                    </Animatable.Text>
                    <TouchableOpacity onPress={this.props.Reevaluate}>
                      <Animatable.Text animation="fadeIn" style={styles.instructions}>
                        Done
                      </Animatable.Text>
                    </TouchableOpacity>
                  </View>
                )
              }
            }



            const styles = StyleSheet.create({
              container: {
                flex: 1,
                backgroundColor: '#4dd6ba',
                alignItems: 'center',
                justifyContent: 'center',
              },
              instructions:{
                fontSize: 30,
                fontWeight: "bold",
                color: "grey",
              },
              doneButton: {
                marginTop: "50%",
                borderColor: 'white',
                width: 200,
                height: 100,
                borderRadius: 15,
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }
            });
