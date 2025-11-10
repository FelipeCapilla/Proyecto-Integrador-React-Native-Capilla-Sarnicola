import React, { Component } from 'react'
import { Text, View, Pressable, StyleSheet, TextInput } from 'react-native'
import { auth, db } from '../firebase/Config';

export default class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      password: '',
      email: '',
      mensaje_error: ''
    }
  }

  componentDidMount(){
    auth.onAuthStateChanged( user => {
	    console.log(user)
      if(user !== null){
        this.props.navigation.navigate('TabNavigator')
      }
    })
  }

  submit(email, password) {
    console.log('Creando usuario con los valores: ', {
      email, password
    });
    if (
      email.includes('@') &&
      password.length > 6
    ) {
      auth.signInWithEmailAndPassword(email, password)
        .then(() => {
          this.props.navigation.navigate('TabNavigator', { screen: 'Usuarios' })
        })
        .catch((err) => {
          console.log('error en login del usuario', err)
          this.setState({ err: 'Credenciales incorrectas' })
        })
    }
  }

  render() {
    return (
      <View>
        <Text style={styles.titulo}>Login</Text>
        <View style={styles.contenedor}>
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
                this.state.email,
                this.state.password
              )}>
            <Text style={styles.texto_boton}>Login</Text>
          </Pressable>
          <Pressable onPress={() => this.props.navigation.navigate('Register')}>
            <Text>No tengo cuenta</Text>
          </Pressable>
        </View>
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
    borderStyleL: 'solid',
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