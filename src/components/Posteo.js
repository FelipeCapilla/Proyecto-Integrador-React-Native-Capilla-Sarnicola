import React, { Component } from 'react'
import { Text, View , TextInput, Pressable, StyleSheet} from 'react-native'
import { db, auth } from '../firebase/Config'

export default class Posteo extends Component {
    constructor(props){
        super(props)
        this.state = {
            post: ''
        }
    }

    crearPosteo(descripcion){
        if (descripcion !== '') {
            db.collection('posts').add({
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            likes: descripcion
        })
        .then((resp) => this.props.navigation.navigate('TabNavigator'))
        .catch((err) => console.log('el error es: ', err))
        }
    }

    render() {
        return (
        <View>
            <Text>Crea tu posteo con lo que estes pensando</Text>
            <View>
                <TextInput 
                    keyboardType='default'
                    placeholder='Escribe tu posteo'
                    onChangeText={(text) => this.setState({post: text})}
                    value={this.state.post}
                />
                <Pressable onPress={() => this.crearPosteo(this.state.post)}>
                    <Text>Crea tu posteo</Text>
                </Pressable>
            </View>
        </View>
        )
    }
}