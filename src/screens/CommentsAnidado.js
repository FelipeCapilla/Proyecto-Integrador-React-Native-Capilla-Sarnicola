import { Text, View, TextInput, Pressable, FlatList, StyleSheet } from 'react-native'
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
      <View style={styles.contenedor}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input}
            keyboardType='default'
            placeholder='Escribe algo'
            onChangeText={(text) => this.setState({ comentario: text })}
            value={this.state.comentario}
          />
          <Pressable style={styles.button} onPress={() => this.crearComentario(this.state.comentario)}>
            <Text style={styles.buttonText}>Deja tu comentario</Text>
          </Pressable>
          <FlatList contentContainerStyle={styles.comentariosContainer}
            data={this.state.postsRecuperados.comentarios}
            keyExtractor={(item) => item.createdAt.toString()}
            renderItem={({ item }) => 
            <View style={styles.comentarioCard}>
            <Text style={styles.comentarioTexto}>{item.comentario}</Text>
            <Text style={styles.comentarioOwner}> {item.owner}</Text>
            </View>}
          />

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#F4F4F5',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    color: '#111827',
    backgroundColor: '#F9FAFB',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#111827',
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },

  comentariosContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  comentarioCard: {
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E7EB',
  },
  comentarioTexto: {
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 20,
  },
  comentarioOwner: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
});

