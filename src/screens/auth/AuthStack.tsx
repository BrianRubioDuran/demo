import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Introduction from './Introduction';
import Login from './Login';
import Register from './Register';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Introduction"
        component={Introduction}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Register"
        component={Register}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
