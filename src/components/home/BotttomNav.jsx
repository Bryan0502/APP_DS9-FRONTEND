import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import React, { useState } from 'react';
import { View } from 'react-native';
import Pedidos from '../../pages/Pedidos';
import Perfil from '../../pages/Perfil';


const Tab = createBottomTabNavigator();

function MyTabs({ handleLogout }) {
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Tab.Navigator

        screenOptions={({ route}) => ({
            tabBarStyle: { backgroundColor: 'black' }, // Establece el fondo del Tab.Navigator en negro
            tabBarActiveTintColor: '#FFD414', // Color de los íconos activos
            tabBarInactiveTintColor: 'white', // Color de los íconos inactivos

          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

           if (route.name === 'Pedidos') {
              iconName = focused ? 'shopping-basket' : 'shopping-basket';
            }
           else if (route.name == 'Perfil') {
              iconName = focused ? 'user' : 'user';
            }

            // Si no se encuentra ningún nombre de icono, se establece 'cog' como predeterminado
            if (!iconName) {
              iconName = 'cog';
            }

            // Retorna el componente de icono
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Pedidos" component={Pedidos } />
        <Tab.Screen name="Perfil" >
          {(props) => <Perfil {...props} handleLogout={handleLogout} />}
        </Tab.Screen>

      </Tab.Navigator>
    </View>
  );
}

const BottomNav = ({ handleLogout }) => {
    
    return (
        <NavigationContainer>
            <MyTabs handleLogout={handleLogout}/> 
        </NavigationContainer>
    );
  };



export default BottomNav;