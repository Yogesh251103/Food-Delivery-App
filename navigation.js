import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/homeScreen';
import RestaurantScreen from './screens/restaurantScreen';
import {Provider} from 'react-redux';
import {store} from './store'
import BasketScreen from './screens/basketScreen';
import OrderLoad from './screens/OrderLoad';
import Success from './screens/success';

const Stack = createNativeStackNavigator();


export default function Navigation() {
    return (
        <NavigationContainer>
          <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
          <Stack.Screen name="Basket" component={BasketScreen} options={{headerShown:false,presentation:"modal"}}/>
        <Stack.Screen name="Orderload" component={OrderLoad} options={{presentation:"modal",headerShown:false}}/>
        <Stack.Screen name="Success" component={Success} options={{headerShown:false}} />
        </Stack.Navigator>
        </Provider>
      </NavigationContainer>
    )
  
}  

const styles = StyleSheet.create({})
