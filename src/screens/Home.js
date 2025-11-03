import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/Config'
import Posteo from '../components/Posteo'

export default class Home extends Component {
    constructor(props){
        super(props)
        
    }

  render() {
    return (
      <View>
        <Text>Home</Text>
        <Posteo/>
      </View>
    )
  }
}