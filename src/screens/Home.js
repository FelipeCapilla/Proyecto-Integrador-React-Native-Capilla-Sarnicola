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
          <View style={styles.header}>
            <Text style={styles.titulo}>Home</Text>
          </View>
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
    backgroundColor: '#F4F4F5',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 14,
    paddingHorizontal: 18,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.4,
    borderBottomColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  formularioContainer: {
    flex: 1,
  }
});