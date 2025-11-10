import { Text, View, TextInput, Pressable, FlatList } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/Config'
import firebase from 'firebase'

export default class CommentsAnidado extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comentario: '',
      postsRecuperados:{
        comentarios:[]
      }
    }
  }

  componentDidMount() {
    const id = this.props.route.params.id
    db.collection('posts')
      .doc(id)
      .onSnapshot((docs) => {
        console.log('posts en profile',docs.data());

        this.setState({
          postsRecuperados: docs.data(),
          loading: false
        })
      })
  }

  crearComentario(descripcion) {
    const id = this.props.route.params.id
    if (descripcion !== '') {
      db.collection('posts').doc(id).update({
        comentarios: firebase.firestore.FieldValue.arrayUnion({
          owner: auth.currentUser.email,
          createdAt: Date.now(),
          comentario: descripcion
        })
      })
        .then(() => this.setState({ comentario: '' }))
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
          <FlatList
            data={this.state.postsRecuperados.comentarios}
            keyExtractor={(item) => item.createdAt.toString()}
            renderItem={({ item }) => <View><Text>{item.comentario}</Text></View>}
          />

        </View>
      </View>
    )
  }
}

