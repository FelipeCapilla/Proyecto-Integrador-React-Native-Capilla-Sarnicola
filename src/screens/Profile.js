import { Text, View, Pressable } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../firebase/Config'



export default class Profile extends Component {

  constructor(props){
    super(props)
}

  logout(){
    auth.signOut()
  }

  render() {
    return (
      <View>
        <Text>Soy el Usuario: {this.props.route.params.id}</Text>
        <Text>Email del Usuario: {this.props.email}</Text>
        
        <Pressable onPress={()=> this.logout()}>
          <Text>Log Out</Text>
        </Pressable>
      </View>
    )
  }
}