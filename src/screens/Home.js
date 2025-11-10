import { Text, View, FlatList} from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/Config'
import Post from '../components/Post'

export default class Home extends Component {

    constructor(props){
      super(props)
      this.state = {
        postsRecuperados: '',
        posteos: '',
        loading: true
      }
    }

    componentDidMount(){
    db.collection('posts')
    .orderBy('createdAt', 'desc')
    .onSnapshot((docs) => {
        let posts = [];
        docs.forEach ((doc) => {
          posts.push({
            id: doc.id,
            data: doc.data()
          })
        this.setState({
          posteos: posts,
          loading: false
        })
        })
      })
    }
    

  render() {
    return (
      <View>
        <Text>Home</Text>
        <FlatList 
          data={this.state.postsRecuperados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={( {item} ) => <Post data={item.data} id={item.id}/> }
        />

      </View>
    )
  }
}