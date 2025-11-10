import { Text, View, Pressable, FlatList, StyleSheet } from 'react-native'
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
      <View style={styles.screen}>
        <View style={styles.username}>
          {
            this.state.usuario.length > 0
              ?
              <Text> {this.state.usuario[0].data.username} </Text>
              :
              null
          }
        </View>
        <Text style={styles.email}> {auth.currentUser.email} </Text>
        <FlatList
          data={this.state.postsRecuperados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Post data={item.data} id={item.id} navigation={this.props.navigation}/>}
        />
        <Pressable style={styles.logoutButton} onPress={() => this.logout()}>
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F4F4F5',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  userInfo: {
    flexDirection: 'column',
  },
  username: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  email: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 1,
  },
  subInfo: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 3,
  },
  logoutButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#EF4444',
    marginBottom: 10,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 6,
  },
  listContent: {
    paddingBottom: 20,
  },
});