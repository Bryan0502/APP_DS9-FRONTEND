/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useState } from 'react';

import BottomNav from './src/components/home/BotttomNav';
import Login from './src/pages/Login';
import { View } from 'react-native';


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Función para cambiar el estado de inicio de sesión
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };


  return (
    <View style={{ flex: 1 }}>
      {/* Renderizado condicional del Login o BottomNav */}
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <BottomNav handleLogout={handleLogout}/>
      )}
    </View>

  );
}
