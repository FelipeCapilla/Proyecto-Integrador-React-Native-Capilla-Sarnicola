import { Text, View, FlatList, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import { db, auth } from '../firebase/Config'
import Post from '../components/Post'

export default class Home extends Component {
    constructor(props){
      super(props)
      this.state = {
        postsRecuperados: '',
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
          postsRecuperados: posts,
          loading: false
        })
        })
      })
    }
    
    render() {
      return (
        <View style={styles.contenedor}>
          <Text style={styles.titulo}>Home</Text>
          <View style={styles.formularioContainer}>
            <FlatList 
              data={this.state.postsRecuperados}
              keyExtractor={(item) => item.id.toString()}
              renderItem={( {item} ) => <Post data={item.data} id={item.id} navigation={this.props.navigation}/> }
            />
          </View>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  formularioContainer: {
    flex: 1,
  }
});