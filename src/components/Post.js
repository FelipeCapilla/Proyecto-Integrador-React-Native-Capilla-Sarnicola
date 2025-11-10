import React, { Component } from 'react'
import { Pressable, Text, View, StyleSheet} from 'react-native'
import firebase from 'firebase'
import { db, auth } from '../firebase/Config'

export default class Post extends Component {

  constructor(props){
    super(props)
    this.state = {
        likes: 0,
        liked: false
    }
  }

  componentDidMount(){
    if (this.props.data.likes.includes(auth.currentUser.email)) {
        this.setState({liked: true})
    }
  }

  Like(id){
    db.collection('posts')
    .doc(id)
    .update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    })
    .then(() => this.setState({liked: true}))
  }

  Dislike(id){
    db.collection('posts')
    .doc(id)
    .update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    })
    .then(() => this.setState({liked: false}))
  }

  render() {
    return (
      <View style={styles.card}>
          <Text style={styles.content}> {this.props.data.posteo} </Text>
          <Text style={styles.username}> {this.props.data.owner} </Text>
          <View style={styles.actionsRow}>
            {
                this.state.liked === true 
                ?
                <Pressable style={styles.actionButton} onPress={() => this.Dislike(this.props.id)}>
                    <Text>Dislike</Text>
                </Pressable>
                :
                <Pressable style={styles.actionButton} onPress={() => this.Like(this.props.id)}>
                    <Text>🤍</Text>
                </Pressable>
            }
            <Pressable style={styles.actionButton} onPress={() => this.props.navigation.navigate('CommentsAnidado', {id: this.props.id})}>
                <Text> 💬 Comentar</Text>
            </Pressable>
          </View>
          <Text>{this.props.data.likes.length}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 1,
  },
  content: {
    fontSize: 14,
    color: '#1F2937',
    lineHeight: 20,
    marginTop: 2,
    marginBottom: 8,
  },
  username: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  actionButton: {
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  contenedor: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    paddingHorizontal: 16,
    paddingTop: 20,
  }
})
