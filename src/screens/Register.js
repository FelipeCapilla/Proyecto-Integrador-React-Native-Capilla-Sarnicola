import React, { Component } from 'react'
import { Text, View, Pressable, StyleSheet, TextInput } from 'react-native'
import { auth, db } from '../firebase/Config'

export default class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            email: '',
            mensaje_error: ''
        }
    }

    submit(username, email, password){
        console.log('Creando usuario con los valores: ', {
            username, email, password
        });

        if(
            username.length > 3 &&
            email.includes('@') &&
            password.length > 5
        ) {
            auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                db.collection('users').add({
                owner: auth.currentUser.email,
                createdAt: Date.now(),
                username: username })
            })
            .then(() => this.props.navigation.navigate('Login'))
            .catch((err) => {console.log('error en creacion del usuario', err)
                this.setState({err: 'Fallo en el registro'})
            })   
        }
    }

    render() {
        return (
        <View>
            <Text style={styles.titulo}> Register </Text>
            <View style={styles.contenedor}>
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='username'
                    onChangeText={(text) => this.setState({ username: text })}
                    value={this.state.username}
                />
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='email'
                    onChangeText={(text) => this.setState({ email: text })}
                    value={this.state.email}
                />
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
                />
                <Pressable
                    style={styles.boton}
                    onPress={() =>
                        this.submit(
                            this.state.username,
                            this.state.email,
                            this.state.password
                        )}>
                    <Text style={styles.texto_boton}>Enviar registro</Text>
                </Pressable>
            </View>
            <Pressable onPress={() => this.props.navigation.navigate('Login')}>
                <Text>Ya tengo cuenta</Text>
            </Pressable>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    titulo: {
        fontSize: 80,
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10
    },
    contenedor: {
        paddingHorizontal: 10,
        marginTop: 20
    },
    boton: {
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    texto_boton: {
        color: '#fff'
    }
})