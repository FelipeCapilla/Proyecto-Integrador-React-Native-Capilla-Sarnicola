import React, { Component } from 'react'
import { Text, View, TextInput, Pressable, StyleSheet } from 'react-native'
import { db, auth } from '../firebase/Config'

export default class CrearPosteo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: ''
        }
    }

    crearPosteo(descripcion) {
        if (descripcion !== '') {
            db.collection('posts').add({
                owner: auth.currentUser.email,
                createdAt: Date.now(),
                posteo: descripcion,
                likes: [],
                comentarios: []
            })
                .then(() => this.props.navigation.navigate('StackAnidada'))
                .catch((err) => console.log('el error es: ', err))
        }
    }

    render() {
        return (
            <View style={styles.screen}>
                <View style={styles.header}>
                    <Text>Crea tu posteo con lo que estes pensando</Text>
                </View>
                <View style={styles.card}>
                    <TextInput style={styles.input}
                        keyboardType='default'
                        placeholder='Escribe tu posteo'
                        onChangeText={(text) => this.setState({ post: text })}
                        value={this.state.post}
                    />
                    <Pressable style={[
                        styles.button,
                        this.state.post.trim() === '' && styles.buttonDisabled,
                    ]}
                        disabled={this.state.post.trim() === ''} onPress={() => this.crearPosteo(this.state.post)}>
                        <Text style={styles.buttonText}>Crea tu posteo</Text>
                    </Pressable>
                </View>
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
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111827',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        paddingVertical: 14,
        paddingHorizontal: 12,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 1,
    },
    label: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 6,
    },
    input: {
        minHeight: 90,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 14,
        color: '#111827',
        textAlignVertical: 'top',
        marginBottom: 10,
        backgroundColor: '#F9FAFB',
    },
    button: {
        marginTop: 4,
        backgroundColor: '#111827',
        paddingVertical: 10,
        borderRadius: 999,
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#9CA3AF',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
});