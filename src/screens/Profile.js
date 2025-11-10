import { Text, View, Pressable } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/Config'



export default class Profile extends Component {

  constructor(props){
    super(props)
}

  logout(){
    auth.signOut()
    this.props.navigation.navigate('Register')
  }

  render() {
    return (
      <View>
        <Pressable onPress={()=> this.logout()}>
          <Text>Log Out</Text>
        </Pressable>
      </View>
    )
  }
}