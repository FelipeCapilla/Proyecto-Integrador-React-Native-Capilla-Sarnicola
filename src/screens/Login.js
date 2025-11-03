import React, { Component } from 'react'
import { Text, View, Pressable, StyleSheet, TextInput } from 'react-native'
import { auth } from '../firebase/Config';

export default class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      password: '',
      email: '',
      mensaje_error: ''
    }
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
        <Text>Login</Text>
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