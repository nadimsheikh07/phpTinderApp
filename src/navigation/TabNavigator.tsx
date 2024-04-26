import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from '../screen/Home';
import {About} from '../screen/About';
import {AuthContext} from '../context/AuthContext';
import Dashboard from '../screen/account/Dashboard';
import SignIn from '../screen/auth/SignIn';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const {authState} = useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={({}) => ({
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="About" component={About} />
      <Tab.Screen
        name={authState?.authenticated ? 'Dashboard' : 'Sign In'}
        component={authState?.authenticated ? Dashboard : SignIn}
      />
    </Tab.Navigator>
  );
};
