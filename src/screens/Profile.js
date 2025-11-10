import { Text, View, Pressable, FlatList } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../firebase/Config'
import Post from '../components/Post'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usuario: '',
      postsRecuperados: '',
      loading: true
    }
  }

  componentDidMount() {
    db.collection('users')
      .where('owner', '==', auth.currentUser.email)
      .onSnapshot((docs) => {
        let usuarios = [];
        docs.forEach((doc) => {
          usuarios.push({
            id: doc.id,
            data: doc.data()
          })
          this.setState({
            usuario: usuarios
          })
        })
      })
    db.collection('posts')
      .where('owner', '==', auth.currentUser.email)
      .onSnapshot((docs) => {
        let posts = [];
        docs.forEach((doc) => {
          posts.push({
            id: doc.id,
            data: doc.data()
          })
          this.setState({
            postsRecuperados: posts,
            loading: false
          })
        })
      })
  }

  logout() {
    auth.signOut()
    this.props.navigation.navigate('Register')
  }

  render() {
    console.log(this.state);

    return (
      <View>
        {
          this.state.usuario.length > 0
            ?
            <Text> {this.state.usuario[0].data.username} </Text>
            :
            null
        }
        <Text> {auth.currentUser.email} </Text>
        <FlatList
          data={this.state.postsRecuperados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Post data={item.data} id={item.id} navigation={this.props.navigation}/>}
        />
        <Pressable onPress={() => this.logout()}>
          <Text>Log Out</Text>
        </Pressable>
      </View>
    )
  }
}