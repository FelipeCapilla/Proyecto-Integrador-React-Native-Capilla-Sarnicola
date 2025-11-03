import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/Config'

export default class Home extends Component {
    constructor(props){
      super(props)
    }

  render() {
    return (
      <View>
        <Text>Home</Text>
      </View>
    )
  }
}