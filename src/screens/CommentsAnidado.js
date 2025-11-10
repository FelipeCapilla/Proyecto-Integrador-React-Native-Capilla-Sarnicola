import { Text, View, TextInput, Pressable } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/Config'

export default class CommentsAnidado extends Component {
  constructor(props){
    super(props)
    this.state = {
      comentario: ''
    }
  }

  crearComentario(descripcion) {
    if (descripcion !== '') {
      db.collection('posts').add({
        owner: auth.currentUser.email,
        createdAt: Date.now(),
        comentario: descripcion,
      })
        .then(() => this.props.navigation.navigate('TabNavigator'))
        .catch((err) => console.log('el error es: ', err))
    }
  }

  render() {
    return (
      <View>
        <View>
          <TextInput
            keyboardType='default'
            placeholder='Escribe algo'
            onChangeText={(text) => this.setState({ comentario: text })}
            value={this.state.comentario}
          />
          <Pressable onPress={() => this.crearComentario(this.state.comentario)}>
            <Text>Deja tu comentario</Text>
          </Pressable>
        </View>
      </View>
    )
  }
}