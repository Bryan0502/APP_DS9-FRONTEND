/* eslint-disable prettier/prettier */
// Login.js
import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import UserSession from '../models/UserSession'; // Importa la clase
import Logo from '../images/logo.png';
import BackgroundImage from '../images/background.jpg'; 

const Login = ({ onLogin }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        console.log(email)
        console.log(password)
        try {
            const response = await fetch('https://app-ds-9-backend.vercel.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                // Manejar la respuesta del backend según sea necesario
                console.log(data);

                if (data && data.data && data.data._id) {

                    UserSession.setUserId(data.data._id); // Guardar el ID del usuario
                    UserSession.setUserData(data.data); // Guardar los datos del usuario
                }

                const idUser = UserSession.getUserId();

                console.log(idUser);

                onLogin(); // Llamar a la función onLogin si el login es exitoso
            } else {
                // Manejar errores de autenticación
                const errorData = await response.json();
                console.error(errorData);
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };

    return (
        <ImageBackground source={BackgroundImage} style={styles.background}>
            <View style={styles.overlay} /> 
            {/* Contenedor principal*/}
            <View style={styles.container}>
                <Image source={Logo} style={styles.logo} />
                <Text style={styles.title}>Welcome Riders!</Text>
                {/* Contenedor para el formulario*/}
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Login To Continue</Text>

                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor="white"
                        value={email}
                        onChangeText={setEmail}
                    />
                    
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Password"
                            placeholderTextColor="white"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    {/* Recuperar contraseña, se usará?*/}
                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.25)', //opacidad/semitransparencia
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        width: 150,
        height: 150,
    },
    formContainer: {
        backgroundColor: '#0a0a0a',
        padding: 30,
        borderRadius: 25,
        borderWidth: 1,
        elevation: 10,            
        shadowColor: 'grey',
        shadowRadius: 10,   
        width: '100%',
        maxWidth: 400,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#d4af37',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#d4af37',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#d4af37',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        color: 'white',
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#d4af37',
      borderRadius: 5,
      marginBottom: 15,
      paddingRight: 10,
    },
    passwordInput: {
      flex: 1,
      padding: 10,
      color: 'white',
    },
    button: {
        backgroundColor: '#d4af37',
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    forgotPassword: {
        textAlign: 'center',
        color: '#FFD414',
        marginBottom: 15,
    },
});

export default Login;