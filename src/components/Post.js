import React, { Component } from 'react'
import { Pressable, Text, View } from 'react-native'
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
      <View>
        <Text> {this.props.data.posteo} </Text>
        <Text> {this.props.data.owner} </Text>
        {
            this.state.liked === true 
            ?
            <Pressable onPress={() => this.Dislike(this.props.id)}>
                <Text>Dislike</Text>
            </Pressable>
            :
            <Pressable onPress={() => this.Like(this.props.id)}>
                <Text>Like</Text>
            </Pressable>
        }
        <Pressable onPress={() => this.props.navigation.navigate('CommentsAnidado')}>
            <Text>Comentar</Text>
        </Pressable>
        <Text>{this.props.data.likes.length}</Text>
      </View>
    )
  }
}
